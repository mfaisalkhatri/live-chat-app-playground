import LoginPage from "../pageobjects/login.page";
import ChattingPage from "../pageobjects/chatting.page";

describe("Multi User Chat test - Live Chat Playground", async () => {
  let userOneLoginPage: LoginPage;
  let userOneChattingPage: ChattingPage;

  let userTwoLoginPage: LoginPage;
  let userTwoChattingPage: ChattingPage;

  const chats = {
    userOne: [
      "Hello, How are you?",
      "Where are you from?",
      "I am from California!",
      "Cool!",
    ],
    userTwo: [
      "Good, Thank you!",
      "I am from India, and you?",
      "How is the weather there?",
      "Oh! wow!",
    ],
  };

  const userOneDetails = {
    name: "Jane",
    location: "California",
    age: 24,
    chatRoom: "Meme Bank",
    gender: "female",
    genderValue: "F",
  };

  const userTwoDetails = {
    name: "John",
    location: "India",
    age: 26,
    chatRoom: "Meme Bank",
    gender: "male",
    genderValue: "M",
  };

  const initializeChat = async (
    loginPage: LoginPage,
    details: typeof userOneDetails
  ) => {
    await loginPage.open();
    await loginPage.startChat(
      details.name,
      details.location,
      details.age,
      details.chatRoom,
      details.gender
    );
  };

  before(async () => {
    userOneLoginPage = new LoginPage(browser.chrome);
    userOneChattingPage = new ChattingPage(browser.chrome);

    userTwoLoginPage = new LoginPage(browser.firefox);
    userTwoChattingPage = new ChattingPage(browser.firefox);
  });

  it("should test two user chatting simultaneously from user one window", async () => {
    
    await initializeChat(userOneLoginPage, userOneDetails);
    await initializeChat(userTwoLoginPage, userTwoDetails);

    
    let userOneJoinedMessage: string = `${userOneDetails.name} (${userOneDetails.location}): ${userOneDetails.name} ${userOneDetails.age} ${userOneDetails.genderValue} has joined the chat.`;
    await userOneChattingPage.verifyUserJoinedMessage(userOneJoinedMessage);

    let userTwoJoinedMessage: string = `${userTwoDetails.name} (${userTwoDetails.location}): ${userTwoDetails.name} ${userTwoDetails.age} ${userTwoDetails.genderValue} has joined the chat.`;
    await userOneChattingPage.verifyNewMessage(userTwoJoinedMessage);


    for (let i: number = 0; i < chats.userOne.length; i++) {
      await userOneChattingPage.sendMessage(chats.userOne[i]);
      await userTwoChattingPage.sendMessage(chats.userTwo[i]);
    }

    await expect(userOneChattingPage.verifyMessages(3, chats.userTwo[0]));
    await expect(userOneChattingPage.verifyMessages(5, chats.userTwo[1]));
    await expect(userOneChattingPage.verifyMessages(7, chats.userTwo[2]));
    await expect(userOneChattingPage.verifyMessages(9, chats.userTwo[3]));

    await expect(userOneChattingPage.verifyMessages(2, chats.userOne[0]));
    await expect(userOneChattingPage.verifyMessages(4, chats.userOne[1]));
    await expect(userOneChattingPage.verifyMessages(6, chats.userOne[2]));
    await expect(userOneChattingPage.verifyMessages(8, chats.userOne[3]));

    await userOneChattingPage.logout();
    await userTwoChattingPage.logout();
  });
});
