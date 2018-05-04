import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { DrupalApiService } from './../drupal-api.service';
import { Article } from './../interfaces';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent {

    themeMainColor: string = '#000000';
    goback: string = 'Go back';
    readmore: string = '';

    article$: Observable<Article>;
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

        this.article$ = drupalApiService.getArticleSubject();
        this.isLoading$ = drupalApiService.getIsLoadingSubject();
        this.hasError$ = drupalApiService.getHasErrorSubject();

        this.route.params.subscribe(params => {
            let id = params['id'];
            this.drupalApiService.getArticleById(id);
        });

        this.article$.subscribe(article => {
            let title = article['title'] + ' ' + this.config.get('metaTags').titleSuffix;
            let url = this.config.get('url') + article['id'];

            this.metafrenzyService.setTitle(title);
            this.metafrenzyService.setMetaTag('og:title', title);
            this.metafrenzyService.setMetaTag('og:url', url);
            this.metafrenzyService.setMetaTag('og:image:url', article['image']);
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
