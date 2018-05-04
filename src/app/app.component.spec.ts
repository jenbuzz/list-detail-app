import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { DrupalApiService } from './drupal-api.service';

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

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes(appRoutes),
            ],
            declarations: [
                AppComponent,
                ListComponent,
                DetailComponent,
            ],
            providers: [DrupalApiService],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
