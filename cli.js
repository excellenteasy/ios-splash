#!/usr/bin/env node
'use strict'
var argv = require('minimist')(process.argv.slice(2))
var pkg = require('./package.json')
var icons = require('./')

function help() {
	console.log([
		pkg.description,
		'',
		'Example',
		'  $ ios-icons',
		"  [ { name: 'icon-60@3x.png', width: 180 }, { name: 'icon-60.png', width: 60 }, ... ]"
	].join('\n'))
}

function makeLog(icons, options) {
	var log = []
	if (!icons.length){
		icons = [icons]
	}
	icons.each(function(icon) {
		if (options.json) {
			if (options.width) {
				return log.push(icon)
			}
			return log.push({
				name: icon.name
			})
		}
		var line = icon.name
		if (options.width) {
			line += ',' + icon.width
		}
		log.push(line)
	})
	return options.json ? log : log.join('\n')
}

if (argv.help) {
	help()
	return
}

if (argv.version) {
	console.log(pkg.version)
	return
}

console.log(makeLog(icons(argv.size || argv.s), argv))
