import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DrupalApiService } from './../drupal-api.service';
import { ConfigService } from './../config.service';
import { PaginationComponent } from './pagination.component';

class MockConfigService {
  load(): Promise<any> {
      return new Promise((resolve, reject) => {
          resolve(true);
      });
  }

  get(...keys: string[]): any {
      if (keys.length > 0 && (keys[0] === 'text' || keys[0] === 'styling')) {
          return '';
      }

      return [];
  }
}

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
            declarations: [ PaginationComponent ],
            providers: [DrupalApiService, {provide: ConfigService, useClass: MockConfigService}],
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
