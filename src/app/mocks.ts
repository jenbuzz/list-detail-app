import { BehaviorSubject, Subject } from 'rxjs';
import {
    Element,
    ConfigMetaTags,
    ConfigApi,
    ConfigElementFieldMapping,
    ConfigFilters,
    ConfigStyling,
    ConfigSettings,
    ConfigTranslation
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
        return {
            id: ['id'],
        };
    }

    getFilters(): ConfigFilters {
        return this.get('filters');
    }

    getFilter(): string[] {
        return [];
    }

    getStyling(): ConfigStyling {
        return this.get('styling');
    }

    getSettings(): ConfigSettings {
        return this.get('settings');
    }

    getTranslation(): ConfigTranslation {
        return {
            'fallbackLanguage': 'en',
            'translations': {
                'en': {
                    'title': 'Lorem ipsum',
                },
            },
        };
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

    setFilter(name: string): void {
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

        return new BehaviorSubject([element]);
    }
}

export class MockTranslationService {
    translate(text: string): string {
        return text;
    }
}
