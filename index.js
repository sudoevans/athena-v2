const wa = require('@open-wa/wa-automate');
const { default: PQueue } = require("p-queue");

const generateResponse = require('./bard');


const queue = new PQueue({ concurrency: 1,
autoStart:false});

wa.create({
  sessionId: "BARD_SESSION",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));


// Disable Group Chats.
function start(client) {
  client.onMessage(async message => {

   
    // if (message.body != '') 
    // {
    //   // Use the message content to generate a response
      // const response = await generateResponse(message.body);
    //   // await client.reply(message.from, response);
    //   await client.sendText(message.from, response);
    // }
    try {
      // Check if the message is from a group
      const isGroupMessage = message.isGroupMsg;

      // If it's not a group message, reply
      if (!isGroupMessage) {
        const response = await generateResponse(message.body); //Making sure the message is not from group before sending a response.
        await client.simulateTyping(message.from); //Simulating typing action.
        await client.sendText(message.from, response);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

}



  // function start(client) {
  //   client.onMessage(async message => {
  //     // console.log(message);
  //     // check if message is from a group:

  //     if (message.isGroupMsg===false) {
  //       // Use the message content to generate a response
  //       const response = await generateResponse(message.body);
  //       // await client.sendText(message.from, response);
  //       await client.reply(message.from, response);

  //     }
  //     else{
  //       console.log("Group message");
  //     }
  //   });
  // }
  module.exports = {
    wa,
    PQueue,
    generateResponse
  };

