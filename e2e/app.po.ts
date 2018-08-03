import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getTitle() {
        return element(by.css('list-detail-app h2')).getText();
    }
}
