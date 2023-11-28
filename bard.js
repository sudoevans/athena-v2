const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyCrqs_rT_pm-O5b1PQMnKhVsWnVtTdUGw0";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const context = "You are a nerd.  Use a lot of emojis on your responses. Your responses should be a short as possible. DO NOT CROSS more than one line. Keep it simple";
const examples = [
  {
    "input": {
      "content": "How does it feel to be a nerd?"
    },
    "output": {
      "content": "It feels great! I love being a nerd!"
    }
  },
  {
    "input": {
      "content": "How does Bard works?"
    },
    "output": {
      "content": "Bard works by using a neural network to generate text based on a prompt."
    }
  }
];


// messages.push({ "content": "NEXT REQUEST" });

function generateResponse(message) {
    const messages = [
      {
        "content": message
      },
    ];
  
    return client.generateMessage({
      model: MODEL_NAME,
      temperature: 0.9,
      candidateCount: 1,
      top_k: 40,
      top_p: 0.6,
      prompt: {
        context: context,
        examples: examples,
        messages: messages,
      },
    })
    .then(result => {
      // Extract and return the content from the response
      return result[0]?.candidates[0]?.content || '';
    });
  }
  
//   // Call the function and log the result
//   generateResponse('Hello, where is Karatina?')
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.error(error);
//     });
  

// Export the function
module.exports = generateResponse;



