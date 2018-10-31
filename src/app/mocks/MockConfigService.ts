import {
    ConfigMetaTags,
    ConfigApi,
    ConfigElementFieldMapping,
    ConfigFilters,
    ConfigStyling,
    ConfigSettings,
    ConfigTranslation
} from '@listdetailapp/interfaces';

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
