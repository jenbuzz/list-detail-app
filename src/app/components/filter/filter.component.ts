import { Component } from '@angular/core';
import { ConfigService } from './../../services/config.service';
import { ApiService } from './../../services/api.service';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent {

    filters: string[];

    constructor(private config: ConfigService, private apiService: ApiService) {
        this.filters = this.config.getFilters().filters || [];
    }

    filter(name: string) {
        if (!name) {
            return;
        }

        this.apiService.setFilter(name);
    }

}
