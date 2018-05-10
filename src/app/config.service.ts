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

    load(): Promise<any> {
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

    get(...keys: string[]): any {
        return this.fetchValue(this.config, keys);
    }

    private fetchValue(config: any, args: string[]): any {
        const key = args.shift();

        if (config == undefined || !config[key]) {
            return;
        }

        const value = config[key];
      
        return args.length ? this.fetchValue(value, args) : value;
    }

}
