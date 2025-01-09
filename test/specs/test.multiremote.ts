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
    genderValue: "F"
  };

  let userTwoDetails = {
    name: "John",
    location: "India",
    age: 26,
    chatRoom: "Meme Bank",
    gender: "male",
    genderValue: "M"
  };
  

  let userOneChat = {
    messageOne: "Hello, How are you?",
    messageTwo: "Where are you from?",
    messageThree: "I am from California!",
    messageFour:"Cool!"
  };

  let userTwoChat = {
    messageOne: "Good, Thank you!",
    messageTwo: "I am from India, and you?",
    messageThree: "How is the weather there?",
    messageFour: "Oh! wow!"
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

    let userOneJoinedMessage: string = `${userTwoDetails.name} (${userTwoDetails.location}): ${userTwoDetails.name} ${userTwoDetails.age} ${userTwoDetails.genderValue} has joined the chat.`;
    await userTwoChattingPage.verifyUserJoinedMessage(userOneJoinedMessage);

    let userTwoJoinedMessage: string = `${userOneDetails.name} (${userOneDetails.location}): ${userOneDetails.name} ${userOneDetails.age} ${userOneDetails.genderValue} has joined the chat.`;
    await userOneChattingPage.verifyUserJoinedMessage(userTwoJoinedMessage);

    await userOneChattingPage.sendMessage(userOneChat.messageOne);
    await userTwoChattingPage.sendMessage(userTwoChat.messageOne);

    //add assertion here

    await userOneChattingPage.sendMessage(userOneChat.messageTwo);
    await userTwoChattingPage.sendMessage(userTwoChat.messageTwo);

    //add assertion here

    await userOneChattingPage.sendMessage(userOneChat.messageThree);
    await userTwoChattingPage.sendMessage(userTwoChat.messageThree);

    //add assertion here

    await userOneChattingPage.sendMessage(userOneChat.messageFour);
    await userTwoChattingPage.sendMessage(userTwoChat.messageFour);

    //add assertion here

    await userOneChattingPage.logout();
    await userTwoChattingPage.logout();

    //add assertion here
  });
});
