import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService, ApiService } from './../../services';
import { Element } from './../../interfaces';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

    themeMainColor: string = '#000000';

    elements$: Observable<Element[]>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;

    constructor(
        private apiService: ApiService,
        private config: ConfigService,
        private metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;

        this.elements$ = this.apiService.getElementsSubject();
        this.isLoading$ = this.apiService.getIsLoadingSubject();
        this.hasError$ = this.apiService.getHasErrorSubject();
    }

    ngOnInit(): void {
        this.apiService.getElements();

        this.initMetaTags();
    }

    initMetaTags(): void {
        if (this.config.getMetaTags().disableMetaTags === true) {
            return;
        }

        let title = this.config.getMetaTags().title;
        if (title) {
            title += this.config.getMetaTags().titleSuffix;

            this.metafrenzyService.setAllTitleTags(title);
        }

        const image = this.config.getMetaTags().image;
        if (image) {
            this.metafrenzyService.setMetaTag('og:image:url', image);
        }

        const url = this.config.getMetaTags().url;
        if (url) {
            this.metafrenzyService.setMetaTag('og:url', url);
            this.metafrenzyService.setCanonical(url);
        }
    }

}
