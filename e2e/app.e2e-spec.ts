import { AppPage } from './app.po';

describe('list-detail-app App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should have title "list-detail-app Example"', () => {
        page.navigateTo();
        expect(page.getTitle()).toEqual('list-detail-app Example');
    });
});
