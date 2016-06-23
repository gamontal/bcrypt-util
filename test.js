'use strict';

const expect = require('chai').expect;
require('mocha-sinon');

const bcrypt = require('./index');

let string = 'secret';
let hash = '$2a$10$VRCLtQ5pIC317L7eRrfduOGjIusK9VkKBzy/ge5uGNUW/78Kr6aFa';


describe('Testing bcrypt-util.....', function () {
  beforeEach(function () {
    this.sinon.stub(console, 'log');
  });

  it('bcrypt compare secret $2a$10$VRCLtQ5pIC317L7eRrfduOGjIusK9VkKBzy/ge5uGNUW/78Kr6aFa -> should log true', function () {
    bcrypt.compare(string, hash);

    expect(console.log.calledOnce).to.be.true;
    expect(console.log.calledWith(require('chalk').green('true'))).to.be.true;
  });
});
