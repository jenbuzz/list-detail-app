import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
        private apiService: ApiService,
        private config: ConfigService,
        private readonly metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.get('styling', 'themeMainColor');
        this.goback = this.config.get('text', 'goback');

        this.element$ = this.apiService.getElementSubject();
        this.isLoading$ = this.apiService.getIsLoadingSubject();
        this.hasError$ = this.apiService.getHasErrorSubject();

        this.route.params.subscribe(params => {
            this.apiService.getElementById(params['id']);
        });

        this.element$.subscribe(element => {
            if ('title' in element && element['title']) {
                let title = element['title'];
                if (this.config.get('metaTags', 'titleSuffix')) {
                    title += this.config.get('metaTags', 'titleSuffix');
                }

                this.metafrenzyService.setTitle(title);
                this.metafrenzyService.setMetaTag('og:title', title);
            }
            if ('image' in element && element['image']) {
                this.metafrenzyService.setMetaTag('og:image:url', element['image']);
            }
            if (this.config.get('url') && 'id' in element) {
                const url = this.config.get('url') + element['id'];

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
