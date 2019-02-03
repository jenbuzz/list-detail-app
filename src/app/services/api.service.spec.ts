import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '@listdetailapp/services/api.service';
import { ConfigService } from '@listdetailapp/services/config.service';
import { MockConfigService } from '@listdetailapp/mocks';

describe('ApiService', () => {
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

        this.service = TestBed.get(ApiService);
    });

    it('initSearch should update searchterm and elements', () => {
        this.service.initSearch();
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

    it('should not decrement page and return first page', () => {
        expect(this.service.decrementPage()).toEqual(0);

        this.service.page = 1;

        expect(this.service.decrementPage()).toEqual(0);
    });

    it('should not increment page and return first page', () => {
        expect(this.service.incrementPage()).toEqual(1);
    });

    it('should not return previous page', () => {
        expect(this.service.hasPrevPage()).toBeFalsy();
    });

    it('should return next page', () => {
        expect(this.service.hasNextPage()).toBeTruthy();
    });

    it('should reset page', () => {
        this.service.page = 2;
        this.service.isLastPageLoaded = true;

        this.service.resetPage();

        expect(this.service.page).toEqual(0);
        expect(this.service.isLastPageLoaded).toBeFalsy();
    });

    it('should return has no errors', () => {
        const subject = this.service.getHasErrorSubject();

        subject.subscribe(hasError => {
            expect(hasError).toBeFalsy();
        });
    });

    it('should return is not loading', () => {
        const subject = this.service.getIsLoadingSubject();

        subject.subscribe(isLoading => {
            expect(isLoading).toBeFalsy();
        });
    });

    it('should return zero elements', () => {
        const subject = this.service.getElementsSubject();

        subject.subscribe(elements => {
            expect(elements).toBeFalsy();
        });
    });

    it('should update searchterm', () => {
        spyOn(this.service, 'resetPage');

        const searchTerm = 'test';

        this.service.setSearchTerm(searchTerm);

        this.service.searchTerm$.subscribe(newSearchTerm => {
            expect(searchTerm).toEqual(newSearchTerm);
            expect(this.service.resetPage).toHaveBeenCalled();
        });
    });

    it('should update filter', () => {
        spyOn(this.service, 'getElements');

        const filter = 'test-filter';

        this.service.setFilter(filter);

        expect(filter).toEqual(filter);
        expect(this.service.getElements).toHaveBeenCalled();
    });
});
