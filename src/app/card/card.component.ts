import { Component, Input } from '@angular/core';
import { Element } from './../interfaces';
import { ConfigService } from './../config.service';

@Component({
    selector: 'card',
    templateUrl: './card.component.html'
})
export class CardComponent {

    @Input()
    element: Element;

    @Input()
    useBackgroundImage: boolean;

    @Input()
    showExternalLinkBtn: boolean;

    @Input()
    showDescription: boolean;

    readmore: string = '';
    externallink: string = '';

    constructor(private config: ConfigService) {
        this.readmore = this.config.get('text', 'readmore');
        this.externallink = this.config.get('text', 'externallink');
    }

    getBackgroundImage(element: Element): any {
        if (this.useBackgroundImage) {
            return {
                'background-image': 'url(' + element.image + ')'
            };
        }
    }

}
