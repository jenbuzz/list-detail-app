import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterComponent } from './components/filter/filter.component';
import { CardComponent } from './components/card/card.component';
import { ErrorComponent } from './components/error/error.component';
import { ConfigService, ApiService, TranslationService, FontAwesomeService } from './services';
import { TranslatePipe } from './translate.pipe';
import { MockConfigService, MockApiService, MockTranslationService } from './mocks';
import { routes } from './app-routing.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [
                AppComponent,
                ListComponent,
                DetailComponent,
                PaginationComponent,
                FilterComponent,
                CardComponent,
                ErrorComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                FontAwesomeService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should include a router outlet', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const dom = fixture.debugElement.nativeElement;

        expect(dom.querySelectorAll('router-outlet').length).toBe(1);
    }));
});
