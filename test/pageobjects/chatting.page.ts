import Page from "./page";

class ChattingPage extends Page {
  private get userJoinedMessage() {
    return $("#message-0").getText();
  }

  private get messageOne() {
    return $("#message-1").getText();
  }

  private get chatMessageBox() {
    return $("#message");
  }

  private get sendButton() {
    return $("#send-message");
  }

  private get logoutButton() {
    return $("#logout");
  }

  private get liveUserList() {
    return $("h3").getText();
  }

  private get liveUsers() {
    return $("ul li").getText();
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
