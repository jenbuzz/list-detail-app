import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map, skip, debounceTime, distinctUntilChanged, catchError, retry } from 'rxjs/operators';
import { Element, Link } from './interfaces';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    hasError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
    elements$: Subject<Element[]> = new Subject<Element[]>();
    isLastPageLoaded: boolean = false;
    limit: number = 10;
    page: number = 0;
    searchTerm: string = '';

    constructor(private http: HttpClient, private config: ConfigService) {
    }

    initSearch(): void {
        this.searchTerm$.pipe(
            skip(1),
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(term => {
            this.searchTerm = term;
            this.getElements();
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

    setSearchTerm(term: string): void {
        this.searchTerm$.next(term);
        this.resetPage();
    }

    decrementPage(): void {
        if (this.hasPrevPage()) {
            this.page--;
            this.isLastPageLoaded = false;
            this.getElements();
        }
    }

    incrementPage(): void {
        if (this.hasNextPage()) {
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

    getToken(): BehaviorSubject<string|null> {
        const enableAuthentication = this.config.get('api', 'authToken', 'enableAuthentication');

        const token$ = new BehaviorSubject(null);

        if (enableAuthentication) {
            if (localStorage.getItem('authentication')) {
                token$.next(localStorage.getItem('authentication'));
            } else {
                const apiUrl = this.config.getEnvironmentApiUrl() + this.config.get('api', 'authToken', 'path');
                const credentials = this.config.get('api', 'authToken', 'credentials');

                this.http.post(apiUrl, credentials).subscribe(result => {
                    token$.next(result['token']);
                    localStorage.setItem('authentication', result['token']);
                });
            }
        }

        return token$;
    }

    getElements(id: number = null): Subject<Element[]> {
        this.isLoading$.next(true);
        this.hasError$.next(false);

        this.getToken().subscribe(token => {
            const requestOptions = token ? {params: new HttpParams().set('token', token)} : {};

            this.http.get(this.buildApiUrl(id), requestOptions)
            .pipe(
                retry(1),
                catchError(this.handleError),
                map(elements => {
                    const preparedElements: Element[] = [];

                    const apiDataPath = this.config.get('api', 'dataPath');
                    const elementData = (apiDataPath && apiDataPath.length > 0)
                        ? this.mapData(elements, apiDataPath) : elements;

                    if (elementData && elementData.length > 0) {
                        elementData.forEach(element => {
                            if (element == undefined) {
                                return;
                            }

                            preparedElements.push(this.prepareElement(element, elements));
                        });
                    }

                    if (id === null && elementData.length < this.limit) {
                        this.isLastPageLoaded = true;
                    }

                    return preparedElements;
                })
            ).subscribe(
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

        return this.elements$;
    }

    private prepareElement(element: Object, fullElement?: Object): Element {
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
            labels: this.getElementDataByMapping(element, 'labels'),
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

    private mapData(element: Object, fields: string[]): any {
        return fields.reduce((partialElement, key) =>
            (partialElement && partialElement[key] !== 'undefined') ? partialElement[key] : undefined, element
        );
    }

    private getElementDataByMapping(element: Object, field: string): any {
        const fieldMapping = this.config.getElementFieldMapping();

        if (field in fieldMapping) {
            return this.mapData(element, fieldMapping[field]);
        }
    }

    private handleError(error: HttpErrorResponse): ErrorObservable<string> {
        return ErrorObservable.create('Something went wrong; please try again later.');
    }

    private buildApiUrl(id: number = null): string {
        let type: string = 'list';
        let pathExtension: string = '';
        let params: Array<string> = [];

        if (id !== null) {
            type = 'detail';

            params = this.config.get('api', type, 'parameters');

            if (this.config.get('api', type, 'idParameter') !== undefined) {
                params = [this.config.get('api', type, 'idParameter') + '=' + id].concat(params);
            }

            pathExtension = this.config.get('api', type, 'idPath') ? '/' + id : '';
        } else {
            params = this.config.get('api', type, 'parameters').concat([
                this.config.get('api', type, 'paginationOffsetName') + '=' + (this.page * this.limit),
                this.config.get('api', type, 'paginationLimitName') + '=' + this.limit
            ]);

            if (this.searchTerm) {
                params.push(this.config.get('api', type, 'searchFieldName') + '=' + this.searchTerm);
            }
        }

        return this.config.getEnvironmentApiUrl() +
            this.config.get('api', type, 'path') +
            pathExtension +
            '?' + params.join('&');
    }
}
