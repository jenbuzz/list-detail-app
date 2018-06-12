import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Element, Link } from './interfaces';
import { ConfigService } from './config.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

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

    initSearch(): void {
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
        this.resetPage();
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

    getToken(): Observable<any> {
        const enableAuthentication = this.config.get('api', 'authToken', 'enableAuthentication');

        if (enableAuthentication) {
            const apiUrl = this.config.getEnvironmentApiUrl();
            const apiPath = this.config.get('api', 'authToken', 'path');
            const credentials = this.config.get('api', 'authToken', 'credentials');

            return this.http.post(apiUrl + apiPath, credentials);
        }

        return Observable.of(null);
    }

    getElements(searchTerm?: string): void {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        const params = this.config.get('api', 'list', 'parameters').concat([
            this.config.get('api', 'list', 'paginationOffsetName') + '=' + (this.page * this.limit),
            this.config.get('api', 'list', 'paginationLimitName') + '=' + this.limit
        ]);

        if (searchTerm) {
            params.push(this.config.get('api', 'list', 'searchFieldName') + '=' + searchTerm);
        }

        const apiUrl = this.buildApiUrl('list', params);

        this.getToken().subscribe(token => {
            const requestOptions = token ? {params: new HttpParams().set('token', token.token) } : {};

            this.http.get(apiUrl, requestOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .map(elements => {
                const preparedElements: Element[] = [];

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
        });
    }

    getElementById(id: number): void {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        const params = this.config.get('api', 'detail', 'parameters');
        if (this.config.get('api', 'detail', 'idParameter') !== undefined) {
            params.unshift(this.config.get('api', 'detail', 'idParameter') + '=' + id);
        }

        const apiUrl = this.buildApiUrl('detail', params, this.config.get('api', 'detail', 'idPath') ? '/' + id : '');

        this.getToken().subscribe(token => {
            const requestOptions = token ? {params: new HttpParams().set('token', token.token) } : {};

            this.http.get(apiUrl, requestOptions)
                .pipe(
                    retry(1),
                    catchError(this.handleError)
                )
                .map(element => {
                    const apiDataPath = this.config.get('api', 'dataPath');
                    const elementData = this.mapData(element, apiDataPath);

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
        });
    }

    private prepareElement(element: any, fullElement?: any): Element {
        let imagePath = this.getElementDataByMapping(element, 'image');
        const apiImagePath = this.config.get('api', 'image', 'path');
        if (imagePath && apiImagePath && apiImagePath.length > 0) {
            const elementImage = this.mapData(fullElement, apiImagePath);

            elementImage.forEach(image => {
                const apiImageIdPath = this.config.get('api', 'image', 'idPath');
                const imageId = this.mapData(image, apiImageIdPath);
                if (imageId == imagePath) {
                    const apiImageUrlPath = this.config.get('api', 'image', 'urlPath');
                    imagePath = this.mapData(image, apiImageUrlPath);
                    return;
                }
            });
        }

        const preparedElement: Element = {
            id: this.getElementDataByMapping(element, 'id'),
            title: this.getElementDataByMapping(element, 'title'),
            description: this.getElementDataByMapping(element, 'description'),
            internal_link: this.getElementDataByMapping(element, 'internal_link'),
            external_link: this.getElementDataByMapping(element, 'external_link'),
            image: this.config.getEnvironmentApiUrl() + imagePath,
            source: this.getElementDataByMapping(element, 'source'),
            icons: this.getElementDataByMapping(element, 'icons'),
        };

        const links: Link[] = [];
        if (Array.isArray(preparedElement.external_link)) {
            preparedElement.external_link.forEach(link => {
                const icon = this.getElementDataByMapping(link, 'external_link_icon');

                links.push({
                    url: link['uri'],
                    icon: icon,
                });
            });
        } else {
            const icon = this.getElementDataByMapping(preparedElement.external_link, 'external_link_icon');

            links.push({
                url: preparedElement.external_link,
                icon: icon,
            });
        }
        preparedElement.external_link = links;

        return preparedElement;
    }

    private mapData(element: any, fields: any[]): any {
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (element && element.hasOwnProperty(field)) {
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

    private getElementDataByMapping(element: any, field: string): any {
        const fieldMapping = this.config.get('elementFieldMapping');

        if (field in fieldMapping) {
            return this.mapData(element, fieldMapping[field]);
        }
    }

    private handleError(error: HttpErrorResponse): ErrorObservable<string> {
        return ErrorObservable.create('Something went wrong; please try again later.');
    }

    private buildApiUrl(type: 'list'|'detail', params: string[], pathExtension: string = ''): string {
        return this.config.getEnvironmentApiUrl() +
            this.config.get('api', type, 'path') +
            pathExtension +
            '?' + params.join('&');
    }
}
