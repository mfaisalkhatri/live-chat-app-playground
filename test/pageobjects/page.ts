import {Browser} from 'webdriverio';

export default class Page {

  browser: Browser;
  
  constructor(browser:Browser) {
    this.browser = browser;
  }
  private get pageTitle() {
    return this.browser.$("h1").getText();
  }

  private get footerText() {
    return this.browser.$("footer p").getText();
  }

  private get linkedInIcon() {
    return this.browser.$('footer svg[data-icon="linkedin"]');
  }

  private get githubIcon() {
    return this.browser.$('footer svg[data-icon="github"]');
  }

  private get youtubeIcon() {
    return this.browser.$('footer svg[data-icon="youtube"]');
  }

  open(path: string) {
    return this.browser.url(path);
  }

  public async verifyPageTitle(expectedTitle: string) {
    expect(await this.pageTitle).toBe(expectedTitle);
  }

  public async verifyPageFooter(expectedFooterText: string) {
    expect(await this.footerText).toBe(expectedFooterText);
  }

  public async verifyPageFooterIcons() {
    expect(await this.linkedInIcon).toBeDisplayed();
    expect(await this.githubIcon).toBeDisplayed();
    expect(await this.youtubeIcon).toBeDisplayed();
  }
}
