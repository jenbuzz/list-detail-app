import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Config,
    ConfigMetaTags,
    ConfigApi,
    ConfigElementFieldMapping,
    ConfigStyling,
    ConfigSettings,
    ConfigTranslation
} from './interfaces';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {

    private config: Config;

    constructor(private http: HttpClient, private platformLocation: PlatformLocation) {
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('/assets/' + this.getConfigFilename()).subscribe( (config: Config) => {
                this.config = config;
                resolve(true);
            });
        });
    }

    private getConfigFilename(): string {
        const baseHref = this.platformLocation.getBaseHrefFromDOM().slice(1).replace('/', '-').replace(/,\s*$/, '');
        const filename = 'config' + (baseHref === '' ? '' : '-' + baseHref) + '.json';

        return filename;
    }

    get(...keys: string[]): any {
        return this.fetchValue(this.config, keys);
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

    getSettings(): ConfigSettings {
        return this.get('settings');
    }

    getTranslation(): ConfigTranslation {
        return this.get('translation');
    }

    private fetchValue(config: any, args: string[]): any {
        const key = args.shift();

        if (config == undefined || !config[key]) {
            return;
        }

        const value = config[key];

        return args.length ? this.fetchValue(value, args) : value;
    }

    getEnvironmentApiUrl(): string {
        return environment.apiUrl;
    }

}
