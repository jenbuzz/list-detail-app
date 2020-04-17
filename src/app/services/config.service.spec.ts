import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '@listdetailapp/services/config.service';
import {
    ConfigApi,
    ConfigElementFieldMapping,
    ConfigFilters,
    ConfigStyling,
    ConfigSettings,
    ConfigTranslation
} from '@listdetailapp/interfaces';

describe('ConfigService', () => {
    let httpMock: HttpTestingController;
    let service: ConfigService;

    const config = {
        metaTags: {
            'disableMetaTags': true,
            'url': 'https://test',
            'title': 'Lorem ipsum',
            'titleSuffix': '',
            'image': '',
        },
        api: {},
        elementFieldMapping: {},
        filters: {},
        styling: {},
        settings: {},
        translation: {},
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                ConfigService,
            ]
        });
        service = TestBed.inject(ConfigService);
        service.config = config;

        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should return metatags', () => {
        expect(service.getMetaTags()).toEqual(config.metaTags);
    });

    it('should get and return a promise with config object in load()', () => {
        const dummyConfig = {
            metaTags: {},
            api: {},
            elementFieldMapping: {},
            filters: {},
            styling: {},
            settings: {},
            translation: {},
        };

        service.load().then(hasConfig => {
          expect(hasConfig).toBeTruthy();
          expect(service.config).toEqual(dummyConfig);
        });

        const req = httpMock.expectOne('/assets/config.json');
        expect(req.request.method).toBe('GET');
        req.flush(dummyConfig);
    });

    it('should return ConfigApi object', () => {
        const configApi: ConfigApi = {
            authToken: {
                enableAuthentication: false,
                path: '',
                credentials: {
                    email: '',
                    password: ''
                }
            },
            list: {
                path: '',
                parameters: [],
                searchFieldName: '',
                filterFieldName: '',
                paginationOffsetName: '',
                paginationLimitName: ''
            },
            detail: {
                path: '',
                parameters: [],
                idParameter: '',
                idPath: false
            },
            dataPath: [],
            image: {
                path: [],
                idPath: [],
                urlPath: []
            }
        };

        const getSpy = spyOn(service, 'get').and.returnValue(configApi);

        expect(service.getApi()).toEqual(configApi);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return ConfigElementFieldMapping object', () => {
        const configElementFieldMapping: ConfigElementFieldMapping = {
            id: [],
            title: [],
            description: [],
            internal_link: [],
            external_link: [],
            external_link_icon: [],
            image: [],
            source: [],
            icons: [],
            labels: []
        };

        const getSpy = spyOn(service, 'get').and.returnValue(configElementFieldMapping);

        expect(service.getElementFieldMapping()).toEqual(configElementFieldMapping);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return ConfigFilters object', () => {
        const configFilters: ConfigFilters = {
            mainFilter: []
        };

        const getSpy = spyOn(service, 'get').and.returnValue(configFilters);

        expect(service.getFilters()).toEqual(configFilters);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return ConfigStyling object', () => {
        const configStyling: ConfigStyling = {
            theme: '',
            themeMainColor: '',
            themeTextColor: ''
        };

        const getSpy = spyOn(service, 'get').and.returnValue(configStyling);

        expect(service.getStyling()).toEqual(configStyling);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return ConfigSettings object', () => {
        const configSettings: ConfigSettings = {
            showSourceTextOnBtn: false,
            showSquareImage: false,
            useHtmlImage: false
        };

        const getSpy = spyOn(service, 'get').and.returnValue(configSettings);

        expect(service.getSettings()).toEqual(configSettings);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return ConfigTranslation object', () => {
        const configTranslation: ConfigTranslation = {
            fallbackLanguage: 'en',
            useLocalStorage: false,
            useHtmlLang: false,
            translations: {
                en: {}
            }
        };

        const getSpy = spyOn(service, 'get').and.returnValue(configTranslation);

        expect(service.getTranslation()).toEqual(configTranslation);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return specified filter', () => {
        const testFilter = ['best-filter'];

        const getSpy = spyOn(service, 'getFilters').and.returnValue({mainFilter: testFilter});

        expect(service.getFilter('mainFilter')).toEqual(testFilter);
        expect(getSpy).toHaveBeenCalled();
    });

    it('should return empty array if there is no specified filter', () => {
        spyOn(service, 'getFilters').and.returnValue({});
        expect(service.getFilter('mainFilter')).toEqual([]);
    });

    it('should return api url', () => {
        expect(service.getEnvironmentApiUrl()).toBeTruthy();
    });
});
