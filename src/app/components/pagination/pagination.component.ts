import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '@listdetailapp/services';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {

    @Output() pageChange = new EventEmitter();

    constructor(private apiService: ApiService) {
    }

    prevPage(): void {
        this.apiService.decrementPage();
        this.pageChange.emit('prev');
    }

    nextPage(): void {
        this.apiService.incrementPage();
        this.pageChange.emit('next');
    }

    hasPrevPage(): boolean {
        return this.apiService.hasPrevPage();
    }

    hasNextPage(): boolean {
        return this.apiService.hasNextPage();
    }

}
