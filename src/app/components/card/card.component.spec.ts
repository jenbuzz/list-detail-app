import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardComponent } from './card.component';
import { ConfigService, TranslationService, FontAwesomeService } from './../../services';
import { TranslatePipe } from '../../pipes';
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

    it('should return background image css', () => {
        component.useBackgroundImage = true;
        const bgImage = component.getBackgroundImage(component.element);

        expect(typeof(bgImage)).toBe('object');
        expect(bgImage.hasOwnProperty('background-image')).toBeTruthy();
        expect(bgImage['background-image']).toEqual('url(test.jpg)');
    });

    it('should not return background image css', () => {
        component.useBackgroundImage = false;
        const bgImage = component.getBackgroundImage(component.element);

        expect(typeof(bgImage)).toBe('undefined');
    });

    it('should return an icon', () => {
        const icon = component.getIcon('link');

        expect(typeof(icon)).toBe('object');
        expect(icon['iconName']).toEqual('external-link-alt');
    });
});
