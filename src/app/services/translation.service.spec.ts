import { TranslationService, ConfigService } from '@listdetailapp/services';
import { MockConfigService } from '@listdetailapp/mocks';

describe('TranslationService', () => {
    let configServiceMock: ConfigService;
    let translationService: TranslationService;

    beforeEach(() => {
        configServiceMock = <ConfigService> new MockConfigService();

        translationService = new TranslationService(configServiceMock);
    });

    it('should return fallback language', () => {
        expect(translationService.getLanguage()).toEqual('en');
    });

    it('should return html element language', () => {
        spyOn(configServiceMock, 'getTranslation').and.returnValue({
            'useHtmlLang': true,
        });
        translationService = new TranslationService(configServiceMock);

        expect(translationService.getLanguage()).toBeNull();
    });

    it('should return local storage language', () => {
        spyOn(configServiceMock, 'getTranslation').and.returnValue({
            useLocalStorage: true,
        });
        translationService = new TranslationService(configServiceMock);

        expect(translationService.getLanguage()).toBeNull();
    });

    it('should return translated title', () => {
        expect(translationService.translate('title')).toEqual('Lorem ipsum');
    });

    it('should return empty string for untranslateable text', () => {
        expect(translationService.translate('bs')).toEqual('');
    });
});
