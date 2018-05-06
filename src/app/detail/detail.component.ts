import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { DrupalApiService } from './../drupal-api.service';
import { Element } from './../interfaces';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent {

    themeMainColor: string = '#000000';
    goback: string = 'Go back';
    readmore: string = '';

    element$: Observable<Element>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private drupalApiService: DrupalApiService,
        private config: ConfigService,
        private readonly metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.get('styling').themeMainColor;
        this.readmore = this.config.get('text').readmore;
        this.goback = this.config.get('text').goback;

        this.element$ = drupalApiService.getElementSubject();
        this.isLoading$ = drupalApiService.getIsLoadingSubject();
        this.hasError$ = drupalApiService.getHasErrorSubject();

        this.route.params.subscribe(params => {
            this.drupalApiService.getElementById(params['id']);
        });

        this.element$.subscribe(element => {
            const title = element['title'] + ' ' + this.config.get('metaTags').titleSuffix;
            const url = this.config.get('url') + element['id'];

            this.metafrenzyService.setTitle(title);
            this.metafrenzyService.setMetaTag('og:title', title);
            this.metafrenzyService.setMetaTag('og:url', url);
            this.metafrenzyService.setMetaTag('og:image:url', element['image']);
            this.metafrenzyService.setLinkTag({
                rel: 'canonical',
                href: url
            });
        });
    }

    back() {
        this.router.navigate(['']);
    }

}
