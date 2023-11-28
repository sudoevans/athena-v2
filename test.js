// FILEPATH: /c:/Users/snave/OneDrive/Desktop/Projects/Whatsapp Bot-Bard/Bot/index.test.js
const wa = require('@open-wa/wa-automate');
const { default: PQueue } = require("p-queue");
const generateResponse = require('./bard');
const { start } = require('./index'); // Assuming start is exported

jest.mock('@open-wa/wa-automate');
jest.mock('p-queue');
jest.mock('./bard');
