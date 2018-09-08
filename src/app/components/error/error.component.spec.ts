import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationService } from './../../services/translation.service';
import { TranslatePipe } from './../../translate.pipe';
import { MockTranslationService } from './../../mocks';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ErrorComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: TranslationService, useClass: MockTranslationService},
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
