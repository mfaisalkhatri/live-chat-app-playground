import LoginPage from "../pageobjects/login.page";
import ChattingPage from "../pageobjects/chatting.page";

describe("Multi User Chat test - Live Chat Playground", async () => {
  let userOneLoginPage: LoginPage;
  let userOneChattingPage: ChattingPage;

  let userTwoLoginPage: LoginPage;
  let userTwoChattingPage: ChattingPage;
 
  function sleep(ms:number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let chats = {
    userOne: [
      "Hello, How are you?",
      "Where are you from?",
      "I am from California!",
      "Cool!"
    ],
    userTwo: [
      "Good, Thank you!",
      "I am from India, and you?",
      "How is the weather there?",
      "Oh! wow!"
    ]
  };

  let userOneDetails = {
    name: "Jane",
    location: "California",
    age: 24,
    chatRoom: "Meme Bank",
    gender: "female",
    genderValue: "F",
  };

  let userTwoDetails = {
    name: "John",
    location: "India",
    age: 26,
    chatRoom: "Meme Bank",
    gender: "male",
    genderValue: "M",
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

    
    for (let i:number =0; i<chats.userOne.length; i++) {
      await userOneChattingPage.sendMessage(chats.userOne[i]);
      await userTwoChattingPage.sendMessage(chats.userTwo[i]);

      console.log("Message is: " +await userOneChattingPage.messages(i+2));
      //await expect(userOneChattingPage.messages(i+1)).toBe(chats.userOne[i]);
      //await expect(userTwoChattingPage.messages(i+1)).toBe(chats.userTwo[i]);
    }
    //add assertion here

    await userOneChattingPage.logout();
    await userTwoChattingPage.logout();

    //add assertion here
  });
});
