import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;
  const EC = browser.ExpectedConditions;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('AgileSphere coding test - The Weather App');
  });

  it(`should add the first city`, async () => {
    page.navigateTo();
    await page.getInputField().clear();
    await page.getInputField().sendKeys('London');
    await page.clickSubmitButton();
    await browser.wait(EC.presenceOf(await page.getFirstCity()));
    const city = await page.getFirstCity().getText();
    expect(city).toEqual('London');
  });

  it(`should show error on unknown city`, async () => {
    page.navigateTo();
    await page.getInputField().clear();
    await page.getInputField().sendKeys('ababab');
    await page.clickSubmitButton();
    await browser.wait(EC.presenceOf(await page.getErrorMessage()));
    const error = await page.getErrorMessage().getText();
    expect(error).toEqual('Error: city not found');
  });
});
