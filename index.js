'use strict';

const inspect = require('util').inspect;

const chalk = require('chalk');
const cleanStack = require('clean-stack');

const dim = chalk.dim;
const red = chalk.red;

module.exports = function neatStack(error) {
  if (typeof error === 'string') {
    return red(error);
  }

  if (!error || typeof error !== 'object' || typeof error.stack !== 'string') {
    return red(inspect(error));
  }

  const title = String(error);
  const stack = cleanStack(error.stack);

  if (!stack.startsWith(title)) {
    return red(stack);
  }

  return red(`${title}${dim(cleanStack(error.stack).slice(title.length))}`);
};
