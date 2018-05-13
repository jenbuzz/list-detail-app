import { Component } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    constructor(private ApiService: ApiService) {
    }

    prevPage() {
        this.ApiService.decrementPage();
    }

    nextPage() {
        this.ApiService.incrementPage();
    }

    hasPrevPage() {
        return this.ApiService.hasPrevPage();
    }

    hasNextPage() {
        return this.ApiService.hasNextPage();
    }

}
