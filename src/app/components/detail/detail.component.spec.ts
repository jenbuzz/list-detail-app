import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MetafrenzyModule, MetafrenzyService } from 'ngx-metafrenzy';
import { ApiService, ConfigService, TranslationService } from '@listdetailapp/services';
import { MockConfigService, MockApiService, MockTranslationService } from '@listdetailapp/mocks';
import { TranslatePipe } from '@listdetailapp/pipes';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;
    let configService: MockConfigService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MetafrenzyModule.forRoot(),
            ],
            declarations: [
                DetailComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                MetafrenzyService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailComponent);
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

        expect(component.initMetaTags({
            id: 1,
        })).toBeFalsy();
    });

    it('should add meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: false,
        });

        expect(component.initMetaTags({
            id: 1,
        })).toBeTruthy();
    });
});
