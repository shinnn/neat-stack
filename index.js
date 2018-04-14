'use strict';

const {inspect} = require('util');

const {dim, red} = require('chalk');
const cleanStack = require('clean-stack');

module.exports = function neatStack(...args) {
	if (args.length !== 1) {
		throw new RangeError(`Expected 1 argument, but got ${args.length || 'no'} arguments.`);
	}

	const [error] = args;

	if (typeof error === 'string') {
		return red(error);
	}

	if (error === null || typeof error !== 'object' || typeof error.stack !== 'string') {
		return red(inspect(error));
	}

	const title = error.toString();
	const stack = cleanStack(error.stack);

	if (!stack.startsWith(title)) {
		return red(stack);
	}

	return red(`${title}${dim(cleanStack(error.stack).slice(title.length))}`);
};
