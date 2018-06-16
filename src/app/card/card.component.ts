import { Component, Input } from '@angular/core';
import { Element } from './../interfaces';
import { ConfigService } from './../config.service';
import { FontAwesomeService } from './../font-awesome.service';

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

    apiUrl: string = '';
    readmore: string = '';
    externallink: string = '';
    themeMainColor: string = '';
    showSourceTextOnBtn: boolean = true;

    constructor(private config: ConfigService, private fontawesome: FontAwesomeService) {
        this.apiUrl = this.config.getEnvironmentApiUrl();

        this.readmore = this.config.getText().readmore;
        this.externallink = this.config.getText().externallink;

        this.showSourceTextOnBtn = this.config.getSettings().showSourceTextOnBtn;

        this.themeMainColor = this.config.getStyling().themeMainColor;
    }

    getBackgroundImage(element: Element): Object {
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
