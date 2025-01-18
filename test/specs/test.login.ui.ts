import LoginPage from "../pageobjects/login.page";

describe("Login Page UI Tests - 'Live Chat Playground' ", () => {
  let loginPage: LoginPage;
  let name: string = "Faisal";
  let location: string = "Mumbai";
  let age: number = 30;
  let chatRoom: string = "Meme Bank";
  let gender = "male";

  before(async () => {
    loginPage = new LoginPage(browser.chrome);
    await loginPage.open();
  });

  it("should verify the login page title ", async () => {
    await loginPage.verifyPageTitle("Live Chat Playground");
  });

  it("should verify the login page header", async () => {
    await loginPage.verifyPageHeader("Welcome to Live Chat Playground");
  });

  it("should verify that the name field is accessible", async () => {
    await loginPage.verifyNameFieldIsAccessible();
  });

  it("should verify that the location field is accessible", async () => {
    await loginPage.verifyLocationFieldIsAccessible();
  });

  it("should verify that the age field is accessible", async () => {
    await loginPage.verifyAgeFieldIsAccessible();
  });

  it("should verify that the start chat button is accessible", async () => {
    await loginPage.verifyStartChatButtonIsAccessible();
  });

  it("should verify that the select chat room field is accessible", async () => {
    await loginPage.verifyChatRoomDropdownIsAccessible();
  });

  it("should verify that the male dropdown is accessible", async () => {
    await loginPage.verifyMaleRadioButtonIsAccessible();
  });

  it("should verify that the female dropdown is accessible", async () => {
    await loginPage.verifyFemaleRadioButtonIsAccessible();
  });

  it("should verify that the terms checkbox is accessible", async () => {
    await loginPage.verifyTermsCheckBoxIsAccessible();
  });

  it("should verify the login page footer text", async () => {
    await loginPage.verifyPageFooter(
      "© 2025 Live Chat App is designed and built by Faisal Khatri"
    );
  });

  it("should verify the login page footer icons", async () => {
    await loginPage.verifyPageFooterIcons();
  });
  it("should verify the validation for location field", async () => {
    await loginPage.startChat(name, "3345", age, chatRoom, gender);
    await loginPage.verifyErrorMessage("Location cannot contain only numbers");
  });
  it("should verify the validation for age field", async () => {
    await browser.refresh();
    await loginPage.startChat(name, location, 102, chatRoom, gender);
    await loginPage.verifyErrorMessage("Age should be between 18 and 99");
  });
});
