import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { MetafrenzyModule } from 'ngx-metafrenzy';
import { ListComponent } from './list.component';
import { DetailComponent } from './../detail/detail.component';
import { ErrorComponent } from './../error/error.component';
import { ApiService } from './../api.service';
import { ConfigService } from './../config.service';
import { routes } from './../app-routing.module';
import { MockConfigService } from './../mocks';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
                MetafrenzyModule.forRoot(),
            ],
            declarations: [
                ListComponent,
                DetailComponent,
                ErrorComponent,
            ],
            providers: [
                ApiService,
                {provide: ConfigService, useClass: MockConfigService},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
