import Page from "./page";
import { Browser } from "webdriverio";

class ChattingPage extends Page {

    constructor(browser:Browser) {
      super(browser);
    }
  private get userJoinedMessage() {
    return this.browser.$("#message-0").getText();
  }

  private get messageOne() {
    return this.browser.$("#message-1").getText();
  }

  private get chatMessageBox() {
    return this.browser.$("#message");
  }

  private get sendButton() {
    return this.browser.$("#send-message");
  }

  private get logoutButton() {
    return this.browser.$("#logout");
  }

  private get liveUserList() {
    return this.browser.$("h3").getText();
  }

  private get liveUsers() {
    return this.browser.$("ul li").getText();
  }

  public async verifyChatMessageBoxIsAccessible() {
    expect(await this.chatMessageBox).toBeDisplayed();
    expect(await this.chatMessageBox).toBeEnabled();
    expect(await this.chatMessageBox).toBeClickable();
  }

  public async verifySendButtonIsAccessible() {
    expect(await this.sendButton).toBeDisplayed();
    expect(await this.sendButton).toBeEnabled();
    expect(await this.sendButton).toBeClickable();
  }

  public async verifyLogoutButtonIsAccessible() {
    expect(await this.logoutButton).toBeDisplayed();
    expect(await this.logoutButton).toBeEnabled();
    expect(await this.logoutButton).toBeClickable();
  }

  public async verifyLiveUserList() {
    expect(await this.liveUserList).toBeDisplayed();
    expect(await this.liveUserList).toBe("Live Users List (1)");
  }

  public async verifyLiveUserDetails(userinfo: string) {
    expect(await this.liveUsers).toBeDisplayed();
    expect(await this.liveUsers).toBe(userinfo);
  }

  public async verifyUserJoinedMessage(message: string) {
    expect(await this.userJoinedMessage).toBeDisplayed();
    expect(await this.userJoinedMessage).toBe(message);
  }

  public async sendMessage(message: string) {
    await this.chatMessageBox.setValue(message);
    await this.sendButton.click();
  }

  public async verifyNewMessage(message: string) {
    expect(await this.messageOne).toBe(message);
  }

  public async logout() {
    await this.logoutButton.click();
  }
}

export default ChattingPage;
