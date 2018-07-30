import { Component } from '@angular/core';
import { TranslationService } from './../translation.service';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
})
export class ErrorComponent {

    notfoundtitle: string;
    notfoundtext: string;

    constructor(private translationService: TranslationService) {
        this.notfoundtitle = this.translationService.translate('notfoundtitle');
        this.notfoundtext = this.translationService.translate('notfoundtext');
    }

}
