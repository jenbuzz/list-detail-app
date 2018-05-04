import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

import { ListComponent } from './list.component';

import { DetailComponent } from './../detail/detail.component';
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

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      declarations: [
        ListComponent,
        DetailComponent,
      ],
      providers: [DrupalApiService],
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
