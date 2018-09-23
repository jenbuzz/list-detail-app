import { TestBed } from '@angular/core/testing';
import { FontAwesomeService } from './font-awesome.service';

describe('FontAwesomeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FontAwesomeService,
            ]
        });
        this.service = TestBed.get(FontAwesomeService);
    });

    it('should return icon', () => {
        const name = 'times';
        const icon = this.service.getIcon(name);
        expect(typeof icon).toBe('object');
        expect(icon.iconName).toBe(name);
    });
});
