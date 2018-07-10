import { BehaviorSubject, Subject } from 'rxjs';
import {
    Element,
    ConfigMetaTags,
    ConfigApi,
    ConfigElementFieldMapping,
    ConfigStyling,
    ConfigText,
    ConfigSettings
} from './interfaces';

export class MockConfigService {
    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    get(...keys: string[]): any {
        if (keys.length > 0 && (keys[0] === 'text' || keys[0] === 'styling')) {
            return '';
        }

        return [];
    }

    getMetaTags(): ConfigMetaTags {
        return this.get('metaTags');
    }

    getApi(): ConfigApi {
        return this.get('api');
    }

    getElementFieldMapping(): ConfigElementFieldMapping {
        return this.get('elementFieldMapping');
    }

    getStyling(): ConfigStyling {
        return this.get('styling');
    }

    getText(): ConfigText {
        return this.get('text');
    }

    getSettings(): ConfigSettings {
        return this.get('settings');
    }

    getEnvironmentApiUrl(): string {
        return '';
    }
}

export class MockApiService {
    initSearch(): void {
    }

    getHasErrorSubject(): BehaviorSubject<boolean> {
        return new BehaviorSubject(false);
    }

    getIsLoadingSubject(): BehaviorSubject<boolean> {
        return new BehaviorSubject(false);
    }

    getElementsSubject(): Subject<Element[]> {
        return new BehaviorSubject([]);
    }

    getElementSubject(): Subject<Element> {
        const element: Element = {
            id: 123,
            title: 'Test',
            description: 'Lorem ipsum',
            internal_link: 'test',
            external_link: 'http://asdf',
            external_link_icon: '',
            image: 'test.jpg',
            source: 'Test',
            icons: [],
            labels: [],
        };

        return new BehaviorSubject(element);
    }

    setSearchTerm(term: string): void {
    }

    decrementPage(): void {
    }

    incrementPage(): void {
    }

    hasPrevPage(): boolean {
        return true;
    }

    hasNextPage(): boolean {
        return true;
    }

    resetPage(): void {
    }

    getToken(): BehaviorSubject<string|null> {
        return new BehaviorSubject(null);
    }

    getElements(): Subject<Element[]> {
        return new BehaviorSubject([]);
    }

    getElementById(id: number): Subject<Element> {
        const element: Element = {
            id: 123,
            title: 'Test',
            description: 'Lorem ipsum',
            internal_link: 'test',
            external_link: 'http://asdf',
            external_link_icon: '',
            image: 'test.jpg',
            source: 'Test',
            icons: [],
            labels: [],
        };

        return new BehaviorSubject(element);
    }
}
