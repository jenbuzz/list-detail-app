import { Component } from '@angular/core';
import { ApiService } from '@listdetailapp/services';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {

    constructor(private apiService: ApiService) {
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
