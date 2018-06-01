import { Injectable } from '@angular/core';

@Injectable()
export class FontAwesomeService {

    private icons = {
        'amazon': 'fab fa-amazon',
        'apple': 'fab fa-apple',
        'android': 'fab fa-android',
        'windows': 'fab fa-windows',
    };

    getIcon(name: string): string {
        return this.icons[name];
    }

}
