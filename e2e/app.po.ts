import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.navbar-brand')).getText();
  }

  getInputField() {
    return element(by.css('input'));
  }

  clickSubmitButton() {
    return element(by.css('button')).click();
  }

  getFirstCity() {
    return element(by.css('.city'));
  }

  getErrorMessage() {
    return element(by.css('.alert'));
  }
}
