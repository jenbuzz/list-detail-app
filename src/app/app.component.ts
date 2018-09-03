import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { ConfigService } from './config.service';
import { TranslationService } from './translation.service';
import { ApiService } from './api.service';
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
        private apiService: ApiService,
        private router: Router
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.title = this.translationService.translate('title');
        this.filters = this.config.getFilters().filter;
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

    filter(name: string) {
        if (!name) {
            return;
        }

        this.apiService.setFilter(name);
    }

}
