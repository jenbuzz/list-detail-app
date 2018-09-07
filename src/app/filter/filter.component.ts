import { Component } from '@angular/core';
import { ConfigService } from './../config.service';
import { ApiService } from './../api.service';

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
