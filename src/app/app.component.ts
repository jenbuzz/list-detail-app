import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { FontAwesomeService } from './font-awesome.service';
import { routeAnimation } from './animations';

@Component({
    selector: 'list-detail-app',
    templateUrl: './app.component.html',
    animations: [
        routeAnimation,
    ],
})
export class AppComponent {

    themeMainColor: string = '';
    title: string = '';
    searchPlaceholder: string = '';

    searchTerm: string = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private config: ConfigService,
        private fontawesome: FontAwesomeService
    ) {
        this.apiService.initSearch();

        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.title = this.config.getText().title;
        this.searchPlaceholder = this.config.getText().search;
    }

    setSearchTerm(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.apiService.setSearchTerm(searchTerm);
        this.router.navigate(['']);
    }

    getAnimation(outlet: RouterOutlet) {
        return outlet.activatedRouteData['animation'] || 'list';
    }

    getIcon(name: string): string {
        return this.fontawesome.getIcon(name);
    }

}
