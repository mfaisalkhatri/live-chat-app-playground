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

  private get selectChatRoom() {
    return $("#chat-room");
  }

  private get maleRadioButton() {
    return $("#male");
  }

  private get femaleRadioButton() {
    return $("#female");
  }

  private get startChattingButton() {
    return $("button#start-chat");
  }

  private get termsCheckBox() {
    return $("#terms");
  }

  public async verifyNameFieldIsAccessible() {
    expect(await this.inputName).toBeDisplayed();
    expect(await this.inputName).toBeEnabled;
  }

  public async verifyLocationFieldIsAccessible() {
    expect(await this.inputLocation).toBeDisplayed();
    expect(await this.inputLocation).toBeEnabled;
  }

  public async verifyAgeFieldIsAccessible() {
    expect(await this.inputAge).toBeDisplayed();
    expect(await this.inputAge).toBeEnabled;
  }

  public async verifyChatRoomDropdownIsAccessible() {
    expect(await this.selectChatRoom).toBeDisplayed();
    expect(await this.selectChatRoom).toBeEnabled();
    expect(await this.selectChatRoom).toBeClickable();
  }

  public async verifyMaleRadioButtonIsAccessible() {
    expect(await this.maleRadioButton).toBeDisplayed();
    expect(await this.maleRadioButton).toBeEnabled();
    expect(await this.maleRadioButton).toBeClickable();
  }

  public async verifyFemaleRadioButtonIsAccessible() {
    expect(await this.femaleRadioButton).toBeDisplayed();
    expect(await this.femaleRadioButton).toBeEnabled();
    expect(await this.femaleRadioButton).toBeClickable();
  }

  public async verifyTermsCheckBoxIsAccessible() {
    expect(await this.termsCheckBox).toBeDisplayed();
    expect(await this.termsCheckBox).toBeEnabled();
    expect(await this.termsCheckBox).toBeClickable();
  }

  public async verifyStartChatButtonIsAccessible() {
    expect(await this.startChattingButton).toBeDisplayed();
    expect(await this.startChattingButton).toBeEnabled;
    expect(await this.startChattingButton).toBeClickable;
  }

  public async verifyPageHeader(expectedHeader: string) {
    expect(await this.pageHeader).toBe(expectedHeader);
  }

  public async startChat(
    name: string,
    location: string,
    age: number,
    chatroom: string,
    gender: string
  ) {
    await this.inputName.clearValue();
    await this.inputName.setValue(name);
    await this.inputLocation.clearValue();
    await this.inputLocation.setValue(location);
    await this.inputAge.clearValue();
    await this.inputAge.setValue(age);
    await this.selectChatRoom.selectByVisibleText(chatroom);
    if (gender === "male") {
      await this.maleRadioButton.click();
    } else if (gender === "female") {
      await this.femaleRadioButton.click();
    }
    await this.termsCheckBox.click();
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
