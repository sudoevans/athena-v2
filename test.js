const assert = require('chai').assert;
const index = require('./index.js');

describe('Imports Test', function() {
  it('should import @open-wa/wa-automate', function() {
    assert.isDefined(index.wa);
  });

  it('should import p-queue', function() {
    assert.isDefined(index.PQueue);
  });

  it('should import ./bard', function() {
    assert.isDefined(index.generateResponse);
  });
});