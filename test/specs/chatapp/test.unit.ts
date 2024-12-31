import LoginPage from '../../pageobjects/chatapp/login.page';

describe('My Live Chat app playground', () => {

    it('should check the login page components ', async() => {
      const loginPage = new LoginPage();
      loginPage.open();
      loginPage.verifyPageTitle('Live Chat');
      loginPage.verifyPageHeader('Welcome to Live Chat');
      loginPage.verifyPageFooter('© 2024 Live Chat App is designed and built by Faisal Khatri');
      loginPage.verifyPageFooterIcons();
    })
})