import { Injectable } from '@angular/core';
import { faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmazon, faApple, faAndroid, faWindows } from '@fortawesome/free-brands-svg-icons';

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

    getIcon(name: string): Object {
        return this.icons[name];
    }

}
