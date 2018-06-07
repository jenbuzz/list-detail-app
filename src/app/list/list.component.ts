import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { ApiService } from './../api.service';
import { Element } from './../interfaces';

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
        private route: ActivatedRoute,
        private apiService: ApiService,
        private config: ConfigService,
        private readonly metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;

        this.elements$ = this.apiService.getElementsSubject();
        this.isLoading$ = this.apiService.getIsLoadingSubject();
        this.hasError$ = this.apiService.getHasErrorSubject();
    }

    ngOnInit() {
        this.apiService.getElements();

        this.initMetaTags();
    }

    initMetaTags() {
        if (this.config.getMetaTags().disableMetaTags === true) {
            return;
        }

        let title = this.config.getMetaTags().title;
        if (this.config.getMetaTags().titleSuffix) {
            title += this.config.getMetaTags().titleSuffix;
        }

        const image = this.config.getMetaTags().image;
        const url = this.config.getMetaTags().url;

        if (title) {
            this.metafrenzyService.setTitle(title);
            this.metafrenzyService.setMetaTag('og:title', title);
        }
        if (image) {
            this.metafrenzyService.setMetaTag('og:image:url', image);
        }
        if (url) {
            this.metafrenzyService.setMetaTag('og:url', url);
            this.metafrenzyService.setLinkTag({
                rel: 'canonical',
                href: url
            });
        }
    }

}
