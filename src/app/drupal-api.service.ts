import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from './../environments/environment';
import { Element } from './interfaces';
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
    elements$: Subject<Element[]> = new Subject<Element[]>();
    element$: Subject<Element> = new Subject<Element>();
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
                this.getElements(term);
            });
    }

    getHasErrorSubject(): BehaviorSubject<boolean> {
        return this.hasError$;
    }

    getIsLoadingSubject(): BehaviorSubject<boolean> {
        return this.isLoading$;
    }

    getElementsSubject(): Subject<Element[]> {
        return this.elements$;
    }

    getElementSubject(): Subject<Element> {
        return this.element$;
    }

    setSearchTerm(term: string): void {
        this.searchTerm$.next(term);
    }

    decrementPage(): void {
        if (this.page > 0) {
            this.page--;
            this.isLastPageLoaded = false;
            this.getElements();
        }
    }

    incrementPage(): void {
        if (!this.isLastPageLoaded) {
            this.page++;
            this.getElements();
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

    getElements(searchTerm?: string): void {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        let apiPath = this.config.get('apiListPath');
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
            .map(elements => {
                let preparedElements = [];

                let apiDataPath = this.config.get('apiDataPath');
                let elementData = this.mapData(elements, apiDataPath);

                if (elementData && elementData.length > 0) {
                    elementData.forEach(element => {
                        if (element == undefined) {
                            return;
                        }

                        let finalImagePath = '';
                        let imagePath = this.getElementDataByMapping(element, 'image');
                        let apiImagePath = this.config.get('apiImagePath');
                        if (imagePath && apiImagePath && apiImagePath.length > 0) {
                            let elementImage = this.mapData(elements, apiImagePath);

                            elementImage.forEach(image => {
                                let apiImageIdPath = this.config.get('apiImageIdPath');
                                let imageId = this.mapData(image, apiImageIdPath);
                                if (imageId == imagePath) {
                                    let apiImageUrlPath = this.config.get('apiImageUrlPath');
                                    finalImagePath = this.mapData(image, apiImageUrlPath);
                                    return;
                                }
                            });
                        }

                        preparedElements.push(this.prepareElement(element, finalImagePath));
                    });
                }

                if (elementData.length < this.limit) {
                    this.isLastPageLoaded = true;
                }

                return preparedElements;
            }).subscribe(
                elements => {
                    this.isLoading$.next(false);
                    this.elements$.next(elements);
                },
                error => {
                    this.isLoading$.next(false);
                    this.hasError$.next(true);
                }
            );
    }

    getElementById(id: number): void {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        let apiPath = environment.apiUrl + this.config.get('apiDetailPath');
        apiPath += '?' + this.config.get('apiDetailIdParameter') + '=' + id;
        apiPath += '&' + this.config.get('apiDetailParameters').join('&');

        this.http.get(apiPath)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .map(element => {
                let preparedElement: Element;

                let apiDataPath = this.config.get('apiDataPath');
                let elementData = this.mapData(element, apiDataPath);

                if (elementData && elementData.length > 0) {
                    let element = elementData[0];

                    if (element == undefined) {
                        return;
                    }

                    let finalImagePath = '';
                    let imagePath = this.getElementDataByMapping(element, 'image');
                    let apiImagePath = this.config.get('apiImagePath');
                    if (imagePath && apiImagePath) {
                        let elementImage = this.mapData(element, apiImagePath);

                        elementImage.forEach(image => {
                            let apiImageIdPath = this.config.get('apiImageIdPath');
                            let imageId = this.mapData(image, apiImageIdPath);
                            if (imageId == imagePath) {
                                let apiImageUrlPath = this.config.get('apiImageUrlPath');
                                finalImagePath = this.mapData(image, apiImageUrlPath);
                                return;
                            }
                        });
                    }

                    preparedElement = this.prepareElement(element, finalImagePath);
                }

                return preparedElement;
            }).subscribe(
                element => {
                    this.isLoading$.next(false);
                    this.element$.next(element);
                },
                error => {
                    this.isLoading$.next(false);
                    this.hasError$.next(true);
                }
            );;
    }

    private prepareElement(element: any, imagePath: string): Element {
        return {
            id: this.getElementDataByMapping(element, 'id'),
            title: this.getElementDataByMapping(element, 'title'),
            internal_link: this.getElementDataByMapping(element, 'internal_link'),
            external_link: this.getElementDataByMapping(element, 'external_link'),
            image: environment.apiUrl + imagePath,
            source: this.getElementDataByMapping(element, 'source'),
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

    private getElementDataByMapping(element, field) {
        let fieldMapping = this.config.get('elementFieldMapping');

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
