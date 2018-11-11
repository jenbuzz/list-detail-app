import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService, ApiService } from '@listdetailapp/services';
import { Element, HasMetaTags } from '@listdetailapp/interfaces';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, HasMetaTags {

    themeMainColor: string = '#000000';

    elements$: Observable<Element[]>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;

    constructor(
        private element: ElementRef,
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

        const title = this.config.getMetaTags().title !== '' ?
            this.config.getMetaTags().title + this.config.getMetaTags().titleSuffix : '';

        this.metafrenzyService.setTags({
            title,
            image: this.config.getMetaTags().image,
            url: this.config.getMetaTags().url,
        });
    }

    scrollToTop(direction: string) {
        window.scrollTo({
            top: this.element.nativeElement.offsetTop,
            behavior: 'smooth',
        });
    }

}
