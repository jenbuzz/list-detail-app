import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, ConfigService, TranslationService } from '@listdetailapp/services';
import { MockConfigService, MockApiService, MockTranslationService } from '@listdetailapp/mocks';
import { TranslatePipe } from '@listdetailapp/pipes';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let apiService: MockApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
            declarations: [
                PaginationComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement;
        apiService = debugElement.injector.get(ApiService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should go to previous page', () => {
        spyOn(apiService, 'decrementPage');
        spyOn(component.pageChange, 'emit');

        component.prevPage();

        expect(apiService.decrementPage).toHaveBeenCalled();
        expect(component.pageChange.emit).toHaveBeenCalled();
    });

    it('should go to next page', () => {
        spyOn(apiService, 'incrementPage');
        spyOn(component.pageChange, 'emit');

        component.nextPage();

        expect(apiService.incrementPage).toHaveBeenCalled();
        expect(component.pageChange.emit).toHaveBeenCalled();
    });

    it('should check for previous page', () => {
        expect(component.hasPrevPage()).toBeTruthy();
    });

    it('should check for next page', () => {
        expect(component.hasNextPage()).toBeTruthy();
    });
});
