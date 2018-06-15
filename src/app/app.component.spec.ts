import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './card/card.component';
import { ErrorComponent } from './error/error.component';
import { ConfigService } from './config.service';
import { MockConfigService } from './mocks';
import { ApiService } from './api.service';
import { FontAwesomeService } from './font-awesome.service';
import { routes } from './app-routing.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [
                AppComponent,
                ListComponent,
                DetailComponent,
                PaginationComponent,
                CardComponent,
                ErrorComponent,
            ],
            providers: [
                ApiService,
                {provide: ConfigService, useClass: MockConfigService},
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
});
