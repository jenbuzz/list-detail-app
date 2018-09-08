import { Component } from '@angular/core';
import { ConfigService, ApiService } from './../../services';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent {

    filters: string[];

    constructor(private config: ConfigService, private apiService: ApiService) {
        this.filters = this.config.getFilter('mainFilter');
    }

    filter(name: string) {
        if (!name) {
            return;
        }

        this.apiService.setFilter(name);
    }

}
