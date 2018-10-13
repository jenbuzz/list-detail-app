import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '@listdetailapp/services/config.service';

describe('ConfigService', () => {
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
        this.service = TestBed.get(ConfigService);
        this.service.config = config;
    });

    it('should return metatags', () => {
        expect(this.service.getMetaTags()).toEqual(config.metaTags);
    });
});
