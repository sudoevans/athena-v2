const wa = require('@open-wa/wa-automate');
const generateResponse = require('./bard');

wa.create({
  sessionId: "COVID_HELPER",
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

function start(client) {
  client.onMessage(async message => {
    if (message.body != '') 
    {
      // Use the message content to generate a response
      const response = await generateResponse(message.body);
      // await client.reply(message.from, response);
      await client.sendText(message.from, response);
    }
  });



}






// // Example usage
// generateResponse('Hello, where is Karatina?')
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.error(error);
//   });


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


