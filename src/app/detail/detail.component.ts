import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { ApiService } from './../api.service';
import { Element } from './../interfaces';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent {

    themeMainColor: string = '#000000';
    goback: string = 'Go back';

    element$: Observable<Element>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ApiService: ApiService,
        private config: ConfigService,
        private readonly metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.get('styling', 'themeMainColor');
        this.goback = this.config.get('text', 'goback');

        this.element$ = ApiService.getElementSubject();
        this.isLoading$ = ApiService.getIsLoadingSubject();
        this.hasError$ = ApiService.getHasErrorSubject();

        this.route.params.subscribe(params => {
            this.ApiService.getElementById(params['id']);
        });

        this.element$.subscribe(element => {
            const title = element['title'] + ' ' + this.config.get('metaTags', 'titleSuffix');
            const url = this.config.get('url') + element['id'];

            if (title) {
                this.metafrenzyService.setTitle(title);
                this.metafrenzyService.setMetaTag('og:title', title);
            }
            if ('image' in element) {
                this.metafrenzyService.setMetaTag('og:image:url', element['image']);
            }
            if (url) {
                this.metafrenzyService.setMetaTag('og:url', url);

                this.metafrenzyService.setLinkTag({
                    rel: 'canonical',
                    href: url
                });
            }
        });
    }

    back() {
        this.router.navigate(['']);
    }

}
