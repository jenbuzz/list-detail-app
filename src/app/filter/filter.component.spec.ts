import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterComponent } from './filter.component';
import { ConfigService } from './../config.service';
import { ApiService } from './../api.service';
import { MockConfigService, MockApiService } from './../mocks';

describe('FilterComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilterComponent
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
