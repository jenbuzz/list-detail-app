import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './interfaces';

@Injectable()
export class ConfigService {

    private config: Config;

    constructor(private http: HttpClient, private platformLocation: PlatformLocation) {
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/' + this.getConfigFilename()).subscribe( (config: Config) => {
                this.config = config;
                resolve(true);
            });
        });
    }

    getConfigFilename(): string {
        const baseHref = this.platformLocation.getBaseHrefFromDOM().slice(1).replace('/', '-').replace(/,\s*$/, '');
        const filename = 'config' + (baseHref === '' ? '' : '-' + baseHref) + '.json';

        return filename;
    }

    get(key: string): any {
        if (this.config && key in this.config) {
            return this.config[key];
        }

        return null;
    }

}
