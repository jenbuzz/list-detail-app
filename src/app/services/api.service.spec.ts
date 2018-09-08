import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { MockConfigService } from './../mocks';
import { ApiService } from './api.service';

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
    });

    it('getElements should return elements', inject(
        [HttpTestingController, ApiService],
        (
            httpMock: HttpTestingController,
            apiService: ApiService
        ) => {
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
});
