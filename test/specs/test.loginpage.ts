import LoginPage from "../pageobjects/login.page";

describe("Login Page Tests of 'My Live Chat Playground' ", () => {
  let loginPage: LoginPage;
  let name: string = "Faisal";
  let location: string = "Mumbai";
  let age: number = 30;

  before(async () => {
    loginPage = new LoginPage();
    await loginPage.open();
  });

  it("should verify the login page title ", async () => {
    await loginPage.verifyPageTitle("Live Chat Playground");
  });

  it('should verify the login page header', async() => {
    await loginPage.verifyPageHeader("Welcome to Live Chat Play");
  });

  it('should verify that all the required fields are available in login page', async() => {
    await loginPage.verifyPageFields();
  });

  it('should verify the login page footer text', async() => {
    await loginPage.verifyPageFooter(
      "© 2025 Live Chat App is designed and built by Faisal Khatri"
    );
  });

  it('should verify the login page footer icons', async() => {
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

});
