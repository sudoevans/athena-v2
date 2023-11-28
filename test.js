// FILEPATH: /c:/Users/snave/OneDrive/Desktop/Projects/Whatsapp Bot-Bard/Bot/index.test.js
const wa = require('@open-wa/wa-automate');
const { default: PQueue } = require("p-queue");
const generateResponse = require('./bard');
const { start } = require('./index'); // Assuming start is exported

jest.mock('@open-wa/wa-automate');
jest.mock('p-queue');
jest.mock('./bard');


describe('start function', () => {
  it('should handle incoming messages correctly', async () => {
    const mockClient = {
      onMessage: jest.fn().mockImplementation((callback) => {
        const mockMessage = { body: 'Hello', from: '123', isGroupMsg: false };
        callback(mockMessage);
      }),
      sendText: jest.fn(),
    };
    generateResponse.mockResolvedValue('Hello, World!');
    await start(mockClient);
    expect(mockClient.onMessage).toHaveBeenCalled();
    expect(mockClient.sendText).toHaveBeenCalledWith('123', 'Hello, World!');
  });

  it('should ignore group messages', async () => {
    const mockClient = {
      onMessage: jest.fn().mockImplementation((callback) => {
        const mockMessage = { body: 'Hello', from: '123', isGroupMsg: true };
        callback(mockMessage);
      }),
      sendText: jest.fn(),
    };
    await start(mockClient);
    expect(mockClient.onMessage).toHaveBeenCalled();
    expect(mockClient.sendText).not.toHaveBeenCalled();
  });
});