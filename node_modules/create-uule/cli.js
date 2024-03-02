#!/usr/bin/env node

const createUule = require('./src/main');

const args = process.argv.slice(2);

if (args.length !== 1) {
    throw new Error('Only one argument should be passed');
}

console.log(createUule(args[0]));
