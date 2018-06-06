import { Component, Input } from '@angular/core';
import { Element } from './../interfaces';
import { ConfigService } from './../config.service';
import { FontAwesomeService } from './../font-awesome.service';

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

    apiUrl: string = '';

    readmore: string = '';
    externallink: string = '';

    showSourceTextOnBtn: boolean = true;

    themeMainColor: string = '#000000';

    constructor(private config: ConfigService, private fontawesome: FontAwesomeService) {
        this.apiUrl = this.config.getEnvironmentApiUrl();

        this.readmore = this.config.get('text', 'readmore');
        this.externallink = this.config.get('text', 'externallink');

        this.showSourceTextOnBtn = this.config.get('settings', 'showSourceTextOnBtn');

        this.themeMainColor = this.config.get('styling', 'themeMainColor');
    }

    getBackgroundImage(element: Element): any {
        if (this.useBackgroundImage) {
            return {
                'background-image': 'url(' + element.image + ')'
            };
        }
    }

    getIcon(name: string): string {
        return this.fontawesome.getIcon(name);
    }

}
