'use strict';

const {dim, red} = require('chalk');
const neatStack = require('.');
const test = require('tape');

test('neatStack()', t => {
	const error = new Error('foo');
	error.stack = `Error: foo
    at foo (/hello/world.js:1:1)\r\n    at bar (\\hello\\world.js:3:4)
    at createScript (vm.js:53:10)`;

	t.equal(
		neatStack(error),
		red(`Error: foo${dim('\n    at foo (/hello/world.js:1:1)\r\n    at bar (/hello/world.js:3:4)')}`),
		'should stringify the error with colors.'
	);

	const modifiedStackError = new TypeError('Hi');
	modifiedStackError.stack = '0123456789';

	t.equal(
		neatStack(modifiedStackError),
		red('0123456789'),
		'should just return the red-colored stack when it\'s somehow modified.'
	);

	t.equal(
		neatStack('this is string'),
		red('this is string'),
		'should return a red string if it takes a string.'
	);

	t.equal(
		neatStack(new Set([Buffer.alloc(0)])),
		red('Set { <Buffer > }'),
		'should return a red-colored util.inspect result if it takes a non-error object.'
	);

	t.throws(
		() => neatStack(),
		/^RangeError.*Expected 1 argument, but got no arguments\./,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => neatStack(1, 2),
		/^RangeError.*Expected 1 argument, but got 2 arguments\./,
		'should throw an error when it takes too many arguments.'
	);

	t.end();
});
