import ChattingPage from "../pageobjects/chatting.page";
import LoginPage from "../pageobjects/login.page";

describe("Chatting Page UI Tests - 'Live Chat Playground' ", () => {
  let loginPage: LoginPage;
  let chattingPage: ChattingPage;
  let name: string = "Faisal";
  let location: string = "Mumbai";
  let age: number = 30;
  let chatRoom: string = "Meme Bank";
  let gender = "male";
  let userinfo = `${name} ${age}`;
  let genderValue: string;

  before(async () => {
    genderValue = gender === "male" ? "M" : "F";
    loginPage = new LoginPage(browser.chrome);
    chattingPage = new ChattingPage(browser.chrome);
    await loginPage.open();
    await loginPage.startChat(name, location, age, chatRoom, gender);
  });

  it("should verify the chatting page title", async () => {
    await chattingPage.verifyPageTitle("Live Chat Playground");
  });

  it("should verify that the chat message box is accessible ", async () => {
    await chattingPage.verifyChatMessageBoxIsAccessible();
  });

  it("should verify that the send button is accessible ", async () => {
    await chattingPage.verifySendButtonIsAccessible();
  });

  it("should verify that the logout button is accessible", async () => {
    await chattingPage.verifyLogoutButtonIsAccessible();
  });

  it("should verify that the live user list section is displayed", async () => {
    await chattingPage.verifyLiveUserList();
  });

  it("should verify that the live user details are displayed", async () => {
    await chattingPage.verifyLiveUserDetails(userinfo + ` ${genderValue}`);
  });

  it("should verify the user joined message is displayed", async () => {
    let message: string = `${name} (${location}): ${name} ${age} ${genderValue} has joined the chat.`;
    await chattingPage.verifyUserJoinedMessage(message);
  });

  it("should verify the page footer text", async () => {
    await chattingPage.verifyPageFooter(
      "© 2025 Live Chat App is designed and built by Faisal Khatri"
    );
  });

  it("should verify the page footer icons ", async () => {
    await chattingPage.verifyPageFooterIcons();
  });

  it("should verify sending a new message from chatting page", async () => {
    let userinfo = `${name} (${location}): `;
    let message: string = "Good Morning, How are you doing?";
    await chattingPage.sendMessage(message);
    await chattingPage.verifyNewMessage(userinfo + message);
  });

  it("should verify logout of the chat", async () => {
    await chattingPage.logout();
    await loginPage.verifyPageHeader("Welcome to Live Chat Playground");
  });
});
