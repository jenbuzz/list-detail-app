import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { ConfigService } from './config.service';
import { MockConfigService } from './../mocks';

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
