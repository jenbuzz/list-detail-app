import { TestBed } from '@angular/core/testing';
import { TranslationService } from '@listdetailapp/services/translation.service';
import { ConfigService } from '@listdetailapp/services/config.service';
import { MockConfigService } from '@listdetailapp/mocks';

describe('TranslationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TranslationService,
                {provide: ConfigService, useClass: MockConfigService},
            ]
        });
        this.service = TestBed.get(TranslationService);
    });

    it('should return language', () => {
        expect(this.service.getLanguage()).toEqual('en');
    });

    it('should return translated title', () => {
        expect(this.service.translate('title')).toEqual('Lorem ipsum');
    });

    it('should return empty string for untranslateable text', () => {
        expect(this.service.translate('bs')).toEqual('');
    });
});
