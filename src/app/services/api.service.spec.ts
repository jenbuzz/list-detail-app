import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '@listdetailapp/services/api.service';
import { ConfigService } from '@listdetailapp/services/config.service';
import { MockConfigService } from '@listdetailapp/mocks';
import { of, BehaviorSubject } from 'rxjs';

describe('ApiService', () => {
    let service: ApiService;
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                ApiService,
                {provide: ConfigService, useClass: MockConfigService},
            ]
        });

        service = TestBed.get(ApiService);
        configService = TestBed.get(ConfigService);
    });

    it('initSearch should update searchterm and elements', () => {
        service.initSearch();
    });

    it('getElements should return elements', inject(
        [HttpTestingController, ApiService],
        (httpMock: HttpTestingController, apiService: ApiService) => {
            const response = [
                {
                    id: 4,
                    title: 'Aliquid dolore voluptas quidem est.',
                    path: '/detail/4',
                    link: 'https://www.bergnaum.biz/fugiat-quibusdam-fugit-voluptates-numquam',
                    linkIcon: 'amazon',
                    image: 'images/test02.jpg',
                    source: 'kulas.com',
                    description: 'Voluptates sunt excepturi porro qui eius amet. Ratione quo sunt quasi maxime ut facilis.',
                    icons: [
                        'images/icon01.png',
                        'images/icon02.png',
                    ],
                    labels: [
                        50.85,
                    ]
                },
            ];

            apiService.getElements().subscribe(result => {
                expect(result[0].id).toBe(response[0].id);
            });

            apiService.getHasErrorSubject().subscribe(error => {
                expect(error).toBeFalsy();
            });

            const mockReq = httpMock.match(req => true);

            mockReq[0].flush(response);
        }
    ));

    it('should check for token on getElements', () => {
        spyOn(service, 'getToken').and.returnValue(new BehaviorSubject(''));

        service.getElements();

        expect(service.getToken).toHaveBeenCalled();
    });

    it('should check if token authentication is enabled', () => {
        spyOn(configService, 'get').and.returnValue(true);

        service.getToken();

        expect(configService.get).toHaveBeenCalled();
    });

    it('should not decrement page and return first page', () => {
        expect(service.decrementPage()).toEqual(0);

        service.page = 1;

        expect(service.decrementPage()).toEqual(0);
    });

    it('should not increment page and return first page', () => {
        expect(service.incrementPage()).toEqual(1);
    });

    it('should not return previous page', () => {
        expect(service.hasPrevPage()).toBeFalsy();
    });

    it('should return next page', () => {
        expect(service.hasNextPage()).toBeTruthy();
    });

    it('should reset page', () => {
        service.page = 2;
        service.isLastPageLoaded = true;

        service.resetPage();

        expect(service.page).toEqual(0);
        expect(service.isLastPageLoaded).toBeFalsy();
    });

    it('should return has no errors', () => {
        const subject = service.getHasErrorSubject();

        subject.subscribe(hasError => {
            expect(hasError).toBeFalsy();
        });
    });

    it('should return is not loading', () => {
        const subject = service.getIsLoadingSubject();

        subject.subscribe(isLoading => {
            expect(isLoading).toBeFalsy();
        });
    });

    it('should return zero elements', () => {
        const subject = service.getElementsSubject();

        subject.subscribe(elements => {
            expect(elements).toBeFalsy();
        });
    });

    it('should update searchterm', () => {
        spyOn(service, 'resetPage');

        const searchTerm = 'test';

        service.setSearchTerm(searchTerm);

        service.searchTerm$.subscribe(newSearchTerm => {
            expect(searchTerm).toEqual(newSearchTerm);
            expect(service.resetPage).toHaveBeenCalled();
        });
    });

    it('should update filter', () => {
        spyOn(service, 'getElements');

        const filter = 'test-filter';

        service.setFilter(filter);

        expect(filter).toEqual(filter);
        expect(service.getElements).toHaveBeenCalled();
    });
});
