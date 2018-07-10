import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService } from './../config.service';
import { ApiService } from './../api.service';
import { Element } from './../interfaces';
import { switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription = new Subscription();

    themeMainColor: string = '#000000';
    goback: string = 'Go back';

    activeElement$: Observable<Element>;
    elements$: Observable<Element[]>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private config: ConfigService,
        private metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.goback = this.config.getText().goback;

        this.elements$ = this.apiService.getElementsSubject();
        this.isLoading$ = this.apiService.getIsLoadingSubject();
        this.hasError$ = this.apiService.getHasErrorSubject();
    }

    ngOnInit() {
        this.subscriptions.add(
            this.route.paramMap.pipe(
                switchMap(params => {
                    return this.apiService.getElements(+params.get('id'));
                })
            ).subscribe()
        );

        this.subscriptions.add(
            this.elements$.subscribe(elements => {
                if (Array.isArray(elements)) {
                    this.initMetaTags(elements[0]);
                }
            })
        );

        this.activeElement$ = this.elements$.pipe(
            map(elements => {
                return Array.isArray(elements) ? elements[0] : null;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
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
                href: url,
            });
        }
    }

    back(): void {
        this.router.navigate(['']);
    }

}
