import { Injectable } from '@angular/core';
import { ConfigService } from '@listdetailapp/services/config.service';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    private language: string;

    constructor(private configService: ConfigService) {
        const translationSettings = this.configService.getTranslation();

        if (translationSettings.useHtmlLang) {
            this.language = document.querySelector('html').getAttribute('lang');
        } else if (translationSettings.useLocalStorage) {
            this.language = localStorage.getItem('language');
        } else {
            this.language = translationSettings.fallbackLanguage;
        }
    }

    getLanguage(): string {
        return this.language;
    }

    translate(text: string): string {
        const translations = this.configService.getTranslation().translations;

        if (this.language in translations && text in translations[this.language]) {
            return this.configService.getTranslation().translations[this.language][text];
        }

        return '';
    }
}
