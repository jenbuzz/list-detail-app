import { Injectable } from '@angular/core';
import { faAmazon, faApple, faAndroid, faWindows } from '@fortawesome/fontawesome-free-brands';
import { faTimes, faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';

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
        'link': faExternalLinkAlt,
    };

    getIcon(name: string): string {
        return this.icons[name];
    }

}
