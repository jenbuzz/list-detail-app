import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MetafrenzyModule } from 'ngx-metafrenzy';
import { ApiService, ConfigService, TranslationService } from '@listdetailapp/services';
import { MockConfigService, MockApiService, MockTranslationService } from '@listdetailapp/mocks';
import { TranslatePipe } from '@listdetailapp/pipes';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
    let component: ListComponent;
    let configService: MockConfigService;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MetafrenzyModule.forRoot(),
            ],
            declarations: [
                ListComponent,
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
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement;
        configService = debugElement.injector.get(ConfigService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not add meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: true,
        });

        expect(component.initMetaTags()).toBeFalsy();
    });

    it('should add meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: false,
            url: 'http://test.test',
        });

        expect(component.initMetaTags()).toBeTruthy();
    });
});
