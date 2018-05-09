import { Component } from '@angular/core';
import { DrupalApiService } from './../drupal-api.service';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    constructor(private drupalApiService: DrupalApiService) {
    }

    prevPage() {
        this.drupalApiService.decrementPage();
    }

    nextPage() {
        this.drupalApiService.incrementPage();
    }

    hasPrevPage() {
        return this.drupalApiService.hasPrevPage();
    }

    hasNextPage() {
        return this.drupalApiService.hasNextPage();
    }

}
