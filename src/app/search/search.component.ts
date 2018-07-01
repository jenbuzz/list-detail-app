import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { ConfigService } from './../config.service';
import { FontAwesomeService } from './../font-awesome.service';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
})
export class SearchComponent {

    searchPlaceholder: string = '';

    searchTerm: string = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private config: ConfigService,
        private fontawesome: FontAwesomeService
    ) {
        this.apiService.initSearch();

        this.searchPlaceholder = this.config.getText().search;
    }

    setSearchTerm(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.apiService.setSearchTerm(searchTerm);
        this.router.navigate(['']);
    }

    getIcon(name: string): string {
        return this.fontawesome.getIcon(name);
    }

}
