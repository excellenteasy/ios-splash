#!/usr/bin/env node
'use strict';
var argv = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json');
var icons = require('./');

function help() {
	console.log([
		pkg.description,
		'',
		'Example',
		'  $ ios-icons',
		"  [ { name: 'icon-60@3x.png', width: 180 }, { name: 'icon-60.png', width: 60 }, ... ]"
	].join('\n'));
}

if (argv.help) {
	help();
	return;
}

if (argv.version) {
	console.log(pkg.version);
	return;
}

if (argv.size || argv.s) {
	console.log(icons(argv.size || argv.s));
	return;
}

console.log(icons());
