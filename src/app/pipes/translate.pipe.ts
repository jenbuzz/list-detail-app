import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '@listdetailapp/services';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
    constructor(private translationService: TranslationService) {
    }

    transform(text: string): string {
        return this.translationService.translate(text);
    }
}
