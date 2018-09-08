import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { ConfigService } from './services/config.service';
import { TranslationService } from './services/translation.service';
import { routeAnimation } from './animations';

@Component({
    selector: 'list-detail-app',
    templateUrl: './app.component.html',
    animations: [
        routeAnimation,
    ],
})
export class AppComponent implements OnInit {

    themeMainColor: string = '';
    title: string = '';
    filters: string[];

    constructor(
        private config: ConfigService,
        private translationService: TranslationService,
        private router: Router
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.title = this.translationService.translate('title');
        this.filters = this.config.getFilters().filters || [];
    }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo(0, 0);
        });
    }

    getAnimation(outlet: RouterOutlet) {
        return outlet.activatedRouteData['animation'] || 'list';
    }

}
