#!/usr/bin/env node
'use strict'
var argv = require('minimist')(process.argv.slice(2))
var pkg = require('./package.json')
var splash = require('./')

function help() {
  console.log([
    pkg.description,
    '',
    'Use `--format json` to set output to JSON.',
    'Get specifc splash by width, height or name by using `--width`, `--height` or `--size`.',
    '',
    'Examples:',
    '  $ ios-splash --width 320',
    '  Default~iphone.png,320,480',
    '',
    '  $ ios-splash --size "~iphone" --format json',
    '  {"name":"Default~iphone.png","width":320,"height":480}'
  ].join('\n'))
}

if (argv.help || argv.h) {
  help()
  return
}

if (argv.version || argv.v) {
  console.log(pkg.version)
  return
}

function formatLog(splash, argv) {
  var format = (argv.format || 'csv').toLowerCase()
  if (format === 'json') {
    return JSON.stringify(splash)
  }
  if (!Array.isArray(splash)) {
    splash = [splash]
  }
  return splash.map(function(image) {
    return image.name + ',' + image.width + ',' + image.height
  }).join('\n')
}

var options = {
  size: argv.size || argv.s,
  width: argv.width || argv.w,
  height: argv.height || argv.h
}

var output = splash(options)
if (output) {
  console.log(formatLog(output, argv))
}
