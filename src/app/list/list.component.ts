import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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
        private ApiService: ApiService,
        private config: ConfigService,
        private readonly metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.get('styling', 'themeMainColor');

        this.elements$ = ApiService.getElementsSubject();
        this.isLoading$ = ApiService.getIsLoadingSubject();
        this.hasError$ = ApiService.getHasErrorSubject();
    }

    ngOnInit() {
        this.ApiService.getElements();

        const title = this.config.get('metaTags', 'title') + this.config.get('metaTags', 'titleSuffix');
        const image = this.config.get('metaTags', 'image');
        const url = this.config.get('metaTags', 'url');

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
