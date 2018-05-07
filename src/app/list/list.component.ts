import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { DrupalApiService } from './../drupal-api.service';
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
        private drupalApiService: DrupalApiService,
        private config: ConfigService,
        private readonly metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.get('styling', 'themeMainColor');

        this.elements$ = drupalApiService.getElementsSubject();
        this.isLoading$ = drupalApiService.getIsLoadingSubject();
        this.hasError$ = drupalApiService.getHasErrorSubject();
    }

    ngOnInit() {
        this.drupalApiService.getElements();

        const title = this.config.get('metaTags', 'title') + this.config.get('metaTags', 'titleSuffix');

        this.metafrenzyService.setTitle(title);
        this.metafrenzyService.setMetaTag('og:title', title);
        this.metafrenzyService.setMetaTag('og:url', this.config.get('metaTags', 'url'));
        this.metafrenzyService.setMetaTag('og:image:url', this.config.get('metaTags', 'image'));
        this.metafrenzyService.setLinkTag({
            rel: 'canonical',
            href: this.config.get('url')
        });
    }

    prevPage() {
        this.drupalApiService.decrementPage();
    }

    nextPage() {
        this.drupalApiService.incrementPage();
    }

    hasPrevPage() {
        return this.drupalApiService.hasPrevPage();
    }

    hasNextPage() {
        return this.drupalApiService.hasNextPage();
    }

}
