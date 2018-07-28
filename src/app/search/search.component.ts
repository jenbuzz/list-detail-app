import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { FontAwesomeService } from './../font-awesome.service';
import { TranslationService } from './../translation.service';

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
        private fontawesome: FontAwesomeService,
        private translationService: TranslationService
    ) {
        this.apiService.initSearch();

        this.searchPlaceholder = this.translationService.translate('search');
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
