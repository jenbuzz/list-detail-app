import { Component } from '@angular/core';
import { ConfigService, ApiService, FontAwesomeService } from '@listdetailapp/services';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent {

    filters: string[];

    constructor(
        private config: ConfigService,
        private apiService: ApiService,
        private fontawesome: FontAwesomeService
    ) {
        this.filters = this.config.getFilter('mainFilter');
    }

    filter(name: string): boolean {
        if (!name) {
            return false;
        }

        this.apiService.setFilter(name);

        return true;
    }

    getIcon(name: string): Object {
        return this.fontawesome.getIcon(name);
    }

}
