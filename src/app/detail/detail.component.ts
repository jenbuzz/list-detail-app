import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { ApiService } from './../api.service';
import { Element } from './../interfaces';
import { switchMap, subscribeOn } from 'rxjs/operators';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

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
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.goback = this.config.getText().goback;

        this.element$ = this.apiService.getElementSubject();
        this.isLoading$ = this.apiService.getIsLoadingSubject();
        this.hasError$ = this.apiService.getHasErrorSubject();

        this.element$.subscribe(element => {
            this.initMetaTags(element);
        });
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                return this.apiService.getElementById(+params.get('id'))
            })
        ).subscribe();
    }

    initMetaTags(element): void {
        if (this.config.getMetaTags().disableMetaTags === true) {
            return;
        }

        if ('title' in element && element['title']) {
            let title = element['title'];
            if (this.config.getMetaTags().titleSuffix) {
                title += this.config.getMetaTags().titleSuffix;
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
    }

    back(): void {
        this.router.navigate(['']);
    }

}
