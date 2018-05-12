import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { MetafrenzyModule } from 'ngx-metafrenzy';
import { DetailComponent } from './detail.component';
import { ListComponent } from './../list/list.component';
import { DrupalApiService } from './../drupal-api.service';
import { ConfigService } from './../config.service';
import { routes } from './../app-routing.module';

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

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
                MetafrenzyModule.forRoot(),
            ],
            declarations: [
                DetailComponent,
                ListComponent,
            ],
            providers: [DrupalApiService, {provide: ConfigService, useClass: MockConfigService}],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
