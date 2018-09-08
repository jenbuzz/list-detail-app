import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, FontAwesomeService } from './../../services';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
})
export class SearchComponent {

    searchTerm: string = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private fontawesome: FontAwesomeService
    ) {
        this.apiService.initSearch();
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
