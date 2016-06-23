#!/usr/bin/env node

'use strict';

const bcrypt = require('bcrypt-nodejs');
const chalk = require('chalk');
const cli = require('commander');
let BCRYPT;

module.exports = BCRYPT = {
  hash: function (string, rounds) {
    if (rounds) {
      if (typeof Number(rounds) !== 'number' || isNaN(Number(rounds))) {
        return console.log(chalk.red('Expected a number, got ') + typeof rounds);
      }
    }
    console.log(chalk.green(bcrypt.hashSync(string, rounds ? bcrypt.genSaltSync(rounds) : null)));
  },
  compare: function (string, hash) {
    try {
      console.log((bcrypt.compareSync(string, hash) ? chalk.green('true') : chalk.red('false')));
    } catch (e) {
      console.log(chalk.red('Not a valid BCrypt hash.'));
    }
  }
};

cli
  .version(require('./package.json').version);

cli
  .command('hash <string> [salt_rounds]')
  .description('generate a BCrypt hash')
  .action(function (string, rounds) {
    BCRYPT.hash(string, rounds);
  });

cli
  .command('compare <string> <hash>')
  .description('compare a BCrypt hash')
  .action(function (string, hash) {
    BCRYPT.compare(string, hash);
  });

cli.parse(process.argv);
if (!process.argv.slice(2).length) { cli.outputHelp(); }

