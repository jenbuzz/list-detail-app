import { Component } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    constructor(private apiService: ApiService) {
    }

    prevPage() {
        this.apiService.decrementPage();
    }

    nextPage() {
        this.apiService.incrementPage();
    }

    hasPrevPage() {
        return this.apiService.hasPrevPage();
    }

    hasNextPage() {
        return this.apiService.hasNextPage();
    }

}
