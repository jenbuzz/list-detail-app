import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfigService, ApiService, TranslationService, FontAwesomeService } from '@listdetailapp/services';
import { MockConfigService, MockApiService, MockTranslationService } from '@listdetailapp/mocks';
import { TranslatePipe } from '@listdetailapp/pipes';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent,
                TranslatePipe,
            ],
            imports: [
                RouterTestingModule,
                FontAwesomeModule,
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                FontAwesomeService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a new search term', () => {
        const searchTerm = 'lorem';
        component.setSearchTerm(searchTerm);

        expect(component.searchTerm).toEqual(searchTerm);
    });

    it('should return an icon', () => {
        const icon = component.getIcon('times');

        expect(typeof(icon)).toBe('object');
        expect(icon['iconName']).toEqual('times');
    });
});
