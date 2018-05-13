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
export class ApiService {

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

        let apiPath = this.config.get('api', 'list', 'path');
        apiPath += '?' + this.config.get('api', 'list', 'parameters').join('&');
        apiPath += '&' + this.config.get('api', 'list', 'paginationOffsetName') + '=' + (this.page * this.limit);
        apiPath += '&' + this.config.get('api', 'list', 'paginationLimitName') + '=' + this.limit;

        if (searchTerm) {
            apiPath += '&' + this.config.get('api', 'list', 'searchFieldName') + '=' + searchTerm;
        }

        this.http.get(environment.apiUrl + apiPath)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .map(elements => {
                let preparedElements = [];

                const apiDataPath = this.config.get('api', 'dataPath');
                const elementData = this.mapData(elements, apiDataPath);

                if (elementData && elementData.length > 0) {
                    elementData.forEach(element => {
                        if (element == undefined) {
                            return;
                        }

                        preparedElements.push(this.prepareElement(element, elements));
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

        let apiPath = environment.apiUrl + this.config.get('api', 'detail', 'path');
        apiPath += this.config.get('api', 'detail', 'idPath') ?
            '/' + id + '?' :
            '?' + this.config.get('api', 'detail', 'idParameter') + '=' + id;
        apiPath += '&' + this.config.get('api', 'detail', 'parameters').join('&');

        this.http.get(apiPath)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .map(element => {
                let apiDataPath = this.config.get('api', 'dataPath');
                let elementData = this.mapData(element, apiDataPath);

                if (elementData && elementData.length > 0) {
                    if (elementData[0] == undefined) {
                        return;
                    }

                    return this.prepareElement(elementData[0], element);
                }

                return;
            }).subscribe(
                element => {
                    this.isLoading$.next(false);
                    this.element$.next(element);
                },
                error => {
                    this.isLoading$.next(false);
                    this.hasError$.next(true);
                }
            );
    }

    private prepareElement(element: any, fullElement?: any): Element {
        let imagePath = this.getElementDataByMapping(element, 'image');
        const apiImagePath = this.config.get('api', 'image', 'path');
        if (imagePath && apiImagePath && apiImagePath.length > 0) {
            let elementImage = this.mapData(fullElement, apiImagePath);

            elementImage.forEach(image => {
                const apiImageIdPath = this.config.get('api', 'image', 'idPath');
                const imageId = this.mapData(image, apiImageIdPath);
                if (imageId == imagePath) {
                    let apiImageUrlPath = this.config.get('api', 'image', 'urlPath');
                    imagePath = this.mapData(image, apiImageUrlPath);
                    return;
                }
            });
        }

        return {
            id: this.getElementDataByMapping(element, 'id'),
            title: this.getElementDataByMapping(element, 'title'),
            description: this.getElementDataByMapping(element, 'description'),
            internal_link: this.getElementDataByMapping(element, 'internal_link'),
            external_link: this.getElementDataByMapping(element, 'external_link'),
            image: environment.apiUrl + imagePath,
            source: this.getElementDataByMapping(element, 'source'),
        };
    }

    private mapData(element, fields) {
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (element.hasOwnProperty(field)) {
                const newFields = fields.slice(1);

                if (newFields.length >= 1) {
                    return this.mapData(element[field], newFields);
                } else {
                    return element[field];
                }
            }
        }

        return null;
    }

    private getElementDataByMapping(element, field) {
        const fieldMapping = this.config.get('elementFieldMapping');

        if (field in fieldMapping) {
            return this.mapData(element, fieldMapping[field]);
        }
    }

    private handleError(error: HttpErrorResponse): ErrorObservable {
        return new ErrorObservable('Something went wrong; please try again later.');
    }
}
