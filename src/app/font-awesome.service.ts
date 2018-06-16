import { Injectable } from '@angular/core';
import { faAmazon, faApple, faAndroid, faWindows } from '@fortawesome/fontawesome-free-brands';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

@Injectable({
    providedIn: 'root',
})
export class FontAwesomeService {

    private icons = {
        'amazon': faAmazon,
        'apple': faApple,
        'android': faAndroid,
        'windows': faWindows,
        'times': faTimes,
    };

    getIcon(name: string): string {
        return this.icons[name];
    }

}
