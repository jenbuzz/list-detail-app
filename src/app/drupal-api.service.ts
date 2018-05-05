import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from './../environments/environment';
import { Article } from './interfaces';
import { ConfigService } from './config.service';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class DrupalApiService {

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    hasError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
    articles$: Subject<Article[]> = new Subject<Article[]>();
    article$: Subject<Article> = new Subject<Article>();
    isLastPageLoaded: boolean = false;
    limit: number = 10;
    page: number = 0;

    constructor(private http: HttpClient, private config: ConfigService) {
    }

    initSearch() {
        this.searchTerm$
            .skip(1)
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(term => {
                this.getArticles(term);
            });
    }

    getHasErrorSubject(): BehaviorSubject<boolean> {
        return this.hasError$;
    }

    getIsLoadingSubject(): BehaviorSubject<boolean> {
        return this.isLoading$;
    }

    getArticlesSubject(): Subject<Article[]> {
        return this.articles$;
    }

    getArticleSubject(): Subject<Article> {
        return this.article$;
    }

    setSearchTerm(term: string): void {
        this.searchTerm$.next(term);
    }

    decrementPage(): void {
        if (this.page > 0) {
            this.page--;
            this.isLastPageLoaded = false;
            this.getArticles();
        }
    }

    incrementPage(): void {
        if (!this.isLastPageLoaded) {
            this.page++;
            this.getArticles();
        }
    }

    hasPrevPage(): boolean {
        return this.page > 0;
    }

    hasNextPage(): boolean {
        return !this.isLastPageLoaded;
    }

    resetPage(): void {
        this.page = 0;
        this.isLastPageLoaded = false;
    }

    getArticles(searchTerm?: string): void {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        let apiPath = this.config.get('apiPath');
        apiPath += '?' + this.config.get('apiListParameters').join('&');
        apiPath += '&' + this.config.get('apiListPaginationOffsetName') + '=' + (this.page * this.limit);
        apiPath += '&' + this.config.get('apiListPaginationLimitName') + '=' + this.limit;

        if (searchTerm) {
            apiPath += '&' + this.config.get('apiListSearchFieldName') + '=' + searchTerm;
        }

        this.http.get(environment.apiUrl + apiPath)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .map(articles => {
                let preparedArticles = [];

                let apiDataPath = this.config.get('apiDataPath');
                let articleData = this.mapData(articles, apiDataPath);

                if (articleData && articleData.length > 0) {
                    articleData.forEach(element => {
                        if (element == undefined) {
                            return;
                        }

                        let finalImagePath = '';
                        let imagePath = this.getArticleDataByMapping(element, 'image');
                        let apiImagePath = this.config.get('apiImagePath');
                        if (imagePath && apiImagePath && apiImagePath.length > 0) {
                            let articleImage = this.mapData(articles, apiImagePath);

                            articleImage.forEach(image => {
                                let apiImageIdPath = this.config.get('apiImageIdPath');
                                let imageId = this.mapData(image, apiImageIdPath);
                                if (imageId == imagePath) {
                                    let apiImageUrlPath = this.config.get('apiImageUrlPath');
                                    finalImagePath = this.mapData(image, apiImageUrlPath);
                                    return;
                                }
                            });
                        }

                        let article = this.prepareArticle(element, finalImagePath);

                        preparedArticles.push(article);
                    });
                }

                if (articleData.length < this.limit) {
                    this.isLastPageLoaded = true;
                }

                return preparedArticles;
            }).subscribe(
                articles => {
                    this.isLoading$.next(false);
                    this.articles$.next(articles);
                },
                error => {
                    this.isLoading$.next(false);
                    this.hasError$.next(true);
                }
            );
    }

    getArticleById(id: number): void {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        let apiPath = environment.apiUrl + this.config.get('apiPath');
        apiPath += '?' + this.config.get('apiDetailIdParameter') + '=' + id;
        apiPath += '&' + this.config.get('apiDetailParameters').join('&');

        this.http.get(apiPath)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .map(article => {
                let preparedArticle: Article;

                let apiDataPath = this.config.get('apiDataPath');
                let articleData = this.mapData(article, apiDataPath);

                if (articleData && articleData.length > 0) {
                    let element = articleData[0];

                    if (element == undefined) {
                        return;
                    }

                    let finalImagePath = '';
                    let imagePath = this.getArticleDataByMapping(element, 'image');
                    let apiImagePath = this.config.get('apiImagePath');
                    if (imagePath && apiImagePath) {
                        let articleImage = this.mapData(article, apiImagePath);

                        articleImage.forEach(image => {
                            let apiImageIdPath = this.config.get('apiImageIdPath');
                            let imageId = this.mapData(image, apiImageIdPath);
                            if (imageId == imagePath) {
                                let apiImageUrlPath = this.config.get('apiImageUrlPath');
                                finalImagePath = this.mapData(image, apiImageUrlPath);
                                return;
                            }
                        });
                    }

                    preparedArticle = this.prepareArticle(element, finalImagePath);
                }

                return preparedArticle;
            }).subscribe(
                article => {
                    this.isLoading$.next(false);
                    this.article$.next(article);
                },
                error => {
                    this.isLoading$.next(false);
                    this.hasError$.next(true);
                }
            );;
    }

    private prepareArticle(element: any, imagePath: string): Article {
        return {
            id: this.getArticleDataByMapping(element, 'id'),
            title: this.getArticleDataByMapping(element, 'title'),
            internal_link: this.getArticleDataByMapping(element, 'internal_link'),
            external_link: this.getArticleDataByMapping(element, 'external_link'),
            image: environment.apiUrl + imagePath,
            source: this.getArticleDataByMapping(element, 'source'),
        };
    }

    private mapData(element, fields) {
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (element.hasOwnProperty(field)) {                
                let newFields = fields.slice(1);

                if (newFields.length >= 1) {
                    return this.mapData(element[field], newFields);
                } else {
                    return element[field];
                }
            }
        };

        return null;
    }

    private getArticleDataByMapping(element, field) {
        let fieldMapping = this.config.get('articleFieldMapping');

        if (field in fieldMapping) {
            let fields = fieldMapping[field];
            let val = this.mapData(element, fields);
            return val;
        }
    }

    private handleError(error: HttpErrorResponse): ErrorObservable {
        return new ErrorObservable('Something went wrong; please try again later.');
    }
}
