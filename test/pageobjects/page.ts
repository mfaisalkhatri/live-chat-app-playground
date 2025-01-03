export default class Page {

  private get pageTitle() {
    return $("h1").getText();
  }

  private get footerText() {
    return $("footer p").getText();
  }

  private get linkedInIcon() {
    return $('footer svg[data-icon="linkedin"]');
  }

  private get githubIcon() {
    return $('footer svg[data-icon="github"]');
  }

  private get youtubeIcon() {
    return $('footer svg[data-icon="youtube"]');
  }

  open(path: string) {
    return browser.url(path);
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
