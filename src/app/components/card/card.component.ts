import { Component, Input } from '@angular/core';
import { Element } from './../../interfaces';
import { ConfigService, FontAwesomeService } from './../../services';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
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

    @Input()
    showSource: boolean;

    apiUrl: string = '';
    themeMainColor: string = '';
    showSourceTextOnBtn: boolean = true;
    showSquareImage: boolean = false;
    useHtmlImage: boolean = false;

    constructor(
        private config: ConfigService,
        private fontawesome: FontAwesomeService
    ) {
        this.apiUrl = this.config.getEnvironmentApiUrl();

        this.showSourceTextOnBtn = this.config.getSettings().showSourceTextOnBtn;
        this.showSquareImage = this.config.getSettings().showSquareImage;
        this.useHtmlImage = this.config.getSettings().useHtmlImage;

        this.themeMainColor = this.config.getStyling().themeMainColor;
    }

    getBackgroundImage(): Object {
        if (this.useBackgroundImage) {
            return {
                'background-image': 'url(' + this.element.image + ')',
            };
        }

        return {};
    }

    getIcon(name: string): Object {
        return this.fontawesome.getIcon(name);
    }

}
