import { TestBed } from '@angular/core/testing';
import { FontAwesomeService } from '@listdetailapp/services/font-awesome.service';

describe('FontAwesomeService', () => {
    let service: FontAwesomeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FontAwesomeService,
            ]
        });
        service = TestBed.get(FontAwesomeService);
    });

    it('should return "times" solid icon', () => {
        const name = 'times';
        const icon: any = service.getIcon(name);
        expect(typeof icon).toBe('object');
        expect(icon.iconName).toBe(name);
    });

    it('should return "android" brand icon', () => {
        const name = 'android';
        const icon: any = service.getIcon(name);
        expect(typeof icon).toBe('object');
        expect(icon.iconName).toBe(name);
    });
});
