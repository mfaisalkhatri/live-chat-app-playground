import Page from "./page";

class LoginPage extends Page {

  private get pageHeader() {
    return $("form h1").getText();
  }

  private get errorMessage() {
    return $("#start-chat p").getText();
  }

  private get inputName() {
    return $("#name");
  }

  private get inputLocation() {
    return $("#location");
  }

  private get inputAge() {
    return $("#age");
  }

  private get startChattingButton() {
    return $("button#start-chat");
  }

  public async verifyPageFields() {
    expect(await this.inputName).toBeDisplayed();
    expect(await this.inputName).toBeEnabled;
    expect(await this.inputLocation).toBeDisplayed();
    expect(await this.inputLocation).toBeEnabled;
    expect(await this.inputAge).toBeDisplayed();
    expect(await this.inputAge).toBeEnabled;
    expect(await this.startChattingButton).toBeDisplayed();
    expect(await this.startChattingButton).toBeEnabled;
    expect(await this.startChattingButton).toBeClickable;
  }

  public async verifyPageHeader(expectedHeader: string) {
    expect(await this.pageHeader).toBe(expectedHeader);
  }

  public async startChat(name: string, location: string, age: number) {
    await this.inputName.setValue(name);
    await this.inputLocation.setValue(location);
    await this.inputAge.setValue(age);
    await this.startChattingButton.click();
  }

  public open() {
    return super.open("http://localhost:3000");
  }

  public async verifyErrorMessage(errorMessage: string) {
    expect(await this.errorMessage).toBe(errorMessage);
  }
}

export default LoginPage;
