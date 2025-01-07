import LoginPage from "../pageobjects/login.page";
import ChattingPage from "../pageobjects/chatting.page";

describe("Multi User Chat test - Live Chat Playground", async () => {
  let userOneLoginPage: LoginPage;
  let userOneChattingPage: ChattingPage;

  let userTwoLoginPage: LoginPage;
  let userTwoChattingPage: ChattingPage;

  let userOneDetails = {
    name: "Jane",
    location: "California",
    age: 24,
    chatRoom: "Meme Bank",
    gender: "female",
  };

  let userTwoDetails = {
    name: "John",
    location: "India",
    age: 26,
    chatRoom: "Meme Bank",
    gender: "male",
  };

  before(async () => {
    userOneLoginPage = new LoginPage(browser.chrome);
    userOneChattingPage = new ChattingPage(browser.chrome);

    userTwoLoginPage = new LoginPage(browser.firefox);
    userTwoChattingPage = new ChattingPage(browser.firefox);
  });

  it("should test two user chatting simultaneously", async () => {
    await userOneLoginPage.open();
    await userTwoLoginPage.open();
    await userOneLoginPage.startChat(
      userOneDetails.name,
      userOneDetails.location,
      userOneDetails.age,
      userOneDetails.chatRoom,
      userOneDetails.gender
    );
    await userTwoLoginPage.startChat(
      userTwoDetails.name,
      userTwoDetails.location,
      userTwoDetails.age,
      userTwoDetails.chatRoom,
      userTwoDetails.gender
    );
    
    await userOneChattingPage.logout();
    await userTwoChattingPage.logout();
  });
});
