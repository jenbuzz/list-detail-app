import {
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
