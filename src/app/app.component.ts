import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from './config.service';

@Component({
    selector: 'list-detail-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    themeMainColor: string = '#ffffff';
    title: string = '';
    searchPlaceholder: string = '';

    searchTerm: string = '';

    constructor(
        private router: Router,
        private ApiService: ApiService,
        private config: ConfigService
    ) {
        this.ApiService.initSearch();

        this.themeMainColor = this.config.get('styling', 'themeMainColor');
        this.title = this.config.get('text', 'title');
        this.searchPlaceholder = this.config.get('text', 'search');
    }

    setSearchTerm(searchTerm) {
        this.searchTerm = searchTerm;
        this.ApiService.setSearchTerm(searchTerm);
        this.ApiService.resetPage();
        this.router.navigate(['']);
    }

}
