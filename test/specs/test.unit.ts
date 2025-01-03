import ChattingPage from "../pageobjects/chatting.page";
import LoginPage from "../pageobjects/login.page";

describe("My Live Chat app playground", () => {
  let loginPage: LoginPage;
  let chattingPage: ChattingPage;
  let name: string = "Faisal";
  let location: string = "Mumbai";
  let age: number = 30;

  before(async () => {
    loginPage = new LoginPage();
    chattingPage = new ChattingPage();
    await loginPage.open();
  });

  it("should verify the login page components ", async () => {
    await loginPage.verifyPageTitle("Live Chat");
    await loginPage.verifyPageHeader("Welcome to Live Chat");
    await loginPage.verifyPageFields();
    await loginPage.verifyPageFooter(
      "© 2025 Live Chat App is designed and built by Faisal Khatri"
    );
    await loginPage.verifyPageFooterIcons();
  });

  it("should verify the validation for age field", async () => {
    await loginPage.startChat(name, location, 102);
    await loginPage.verifyErrorMessage("Age should be between 18 and 99");
  });

  it("should verify the validation for location field", async () => {
    await loginPage.startChat(name, "3345", age);
    await loginPage.verifyErrorMessage("Location cannot contain only numbers");
  });

  it("should verify the chatting page components", async () => {
    let userinfo = name + " " + age;
    await loginPage.startChat(name, location, age);
    await chattingPage.verifyPageTitle("Live Chat");
    await chattingPage.verifyPageComponents();
    await chattingPage.verifyLiveUserList(userinfo);
    await chattingPage.verifyUserJoinedMessage(
      name +
        " " +
        "(" +
        location +
        "): " +
        name +
        " " +
        age +
        " " +
        "has joined the chat."
    );
    await chattingPage.verifyPageFooter(
      "© 2025 Live Chat App is designed and built by Faisal Khatri"
    );
    await chattingPage.verifyPageFooterIcons();
  });

  it("should verify sending a new message from chatting page", async () => {
    let userinfo: string = name + " (" + location + "): ";
    let message: string = "Good Morning, How are you doing?";
    await chattingPage.sendMessage(message);
    await chattingPage.verifyNewMessage(userinfo + message);
  });

  it("should verify logout of the chat", async () => {
    await chattingPage.logout();
    await loginPage.verifyPageHeader("Welcome to Live Chat");
  });
});
