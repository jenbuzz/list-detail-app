import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { TranslationService } from './../translation.service';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {

    prevpage: string;
    nextpage: string;

    constructor(private apiService: ApiService, private translationService: TranslationService) {
        this.prevpage = this.translationService.translate('prevpage');
        this.nextpage = this.translationService.translate('nextpage');
    }

    prevPage(): void {
        this.apiService.decrementPage();
    }

    nextPage(): void {
        this.apiService.incrementPage();
    }

    hasPrevPage(): boolean {
        return this.apiService.hasPrevPage();
    }

    hasNextPage(): boolean {
        return this.apiService.hasNextPage();
    }

}
