import Page from "../page";

class LoginPage extends Page{

 private get pageTitle() {
    return $('h1').getText();
 }

 private get pageHeader() {
    return $('form h1').getText();
 }

 private get inputName() {
    return $('#name');
 }

 private get inputLocation() {
    return $('#location');
 }

 private get inputAge() {
    return $('#age');
 }

 private get startChattingButton() {
    return $('#start-chat');
 }

 private get footerText() {
    return $('footer p').getText();
 }

 private get linkedInIcon() {
    return $('footer svg[data-icon="linkedin"]');
 }

 private get githubIcon() {
    return $('footer svg[data-icon="github"]');
 }

 private get youtubeIcon () {
    return $('footer svg[data-icon="youtube"]');
 } 

public async verifyPageTitle(expectedTitle: string) {
    expect(await this.pageTitle).toBe(expectedTitle);

}

public async verifyPageHeader(expectedHeader: string) {
    expect(await this.pageHeader).toBe(expectedHeader);
}

 public async startChat (name: string, location: string, age:number) {
    await this.inputName.setValue(name);
    await this.inputLocation.setValue(location);
    await this.inputAge.setValue(age);
    await this.startChattingButton.click();
}

public async verifyPageFooter(expectedFooterText:string) {
    expect(await this.footerText).toBe(expectedFooterText);
    expect(await this.linkedInIcon).toBeDisplayed();
    expect(await this.githubIcon).toBeDisplayed();
    expect(await this.youtubeIcon).toBeDisplayed();

}
}


export default LoginPage;