import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardComponent } from './card.component';
import { ConfigService, TranslationService, FontAwesomeService } from './../../services';
import { TranslatePipe } from './../../translate.pipe';
import { MockConfigService, MockTranslationService } from './../../mocks';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CardComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                FontAwesomeService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        component.element = {
            id: 123,
            title: 'Test',
            description: 'Lorem ipsum',
            internal_link: 'test',
            external_link: 'http://asdf',
            external_link_icon: '',
            image: 'test.jpg',
            source: 'Test',
            icons: [],
            labels: [],
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
