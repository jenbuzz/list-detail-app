import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination.component';
import { ErrorComponent } from './../error/error.component';
import { ApiService } from './../api.service';
import { ConfigService } from './../config.service';
import { MockConfigService } from './../mocks';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
            declarations: [
                PaginationComponent,
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
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
