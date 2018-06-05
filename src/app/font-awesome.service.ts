import { Injectable } from '@angular/core';
import { faAmazon, faApple, faAndroid, faWindows } from '@fortawesome/fontawesome-free-brands';

@Injectable()
export class FontAwesomeService {

    private icons = {
        'amazon': faAmazon,
        'apple': faApple,
        'android': faAndroid,
        'windows': faWindows,
    };

    getIcon(name: string): string {
        return this.icons[name];
    }

}
