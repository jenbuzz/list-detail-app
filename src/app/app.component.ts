import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { ConfigService, TranslationService } from '@listdetailapp/services';
import { routeAnimation } from '@listdetailapp/animations';

@Component({
    selector: 'list-detail-app',
    templateUrl: './app.component.html',
    animations: [
        routeAnimation,
    ],
})
export class AppComponent implements OnInit {

    themeMainColor: string = '';
    themeTextColor: string = '';
    title: string = '';
    filters: string[];

    constructor(
        private config: ConfigService,
        private translationService: TranslationService,
        private router: Router,
        private element: ElementRef
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.themeTextColor = this.config.getStyling().themeTextColor;
        this.title = this.translationService.translate('title');
        this.filters = this.config.getFilter('mainFilter');
    }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo({
                top: this.element.nativeElement.offsetTop,
                behavior: 'smooth',
            });
        });
    }

    getAnimation(outlet: RouterOutlet) {
        return outlet.activatedRouteData['animation'] || 'list';
    }

}
