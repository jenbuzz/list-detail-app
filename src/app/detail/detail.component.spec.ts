import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

import { MetafrenzyModule } from 'ngx-metafrenzy';

import { DetailComponent } from './detail.component';

import { ListComponent } from './../list/list.component';
import { DrupalApiService } from './../drupal-api.service';

const appRoutes: Routes = [
    {
        path: ':id',
        component: DetailComponent,
    },
    {
        path: '',
        component: ListComponent,
    },
];

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
          RouterTestingModule.withRoutes(appRoutes),
          MetafrenzyModule.forRoot(),
      ],
      declarations: [
          DetailComponent,
          ListComponent,
      ],
      providers: [DrupalApiService],
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
