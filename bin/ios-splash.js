#!/usr/bin/env node
'use strict'
var abbrev = require('abbrev')
var argv = require('yargs')
var splash = require('../')

// help
argv.help('help')
argv.alias('h', 'help')

// register abbreviated aliases
var abbrevs = abbrev(['width', 'height', 'size', 'format', 'help'])
var aliases = Object.keys(abbrevs)
aliases.forEach(function (alias) {
  if (alias !== abbrevs[alias]) {
    argv.alias(alias, abbrevs[alias])
  }
})

// document options
argv.option('width', {
  description: 'width of the image in pixels'
})
argv.option('height', {
  description: 'height of the image in pixels'
})
argv.option('size', {
  description: 'string identifiying the splash image'
})
argv.option('format', {
  description: 'format of the output to stdout (csv or json)'
})

argv.usage('Usage: ios-splash [options]')

argv.example('$ ios-splash --width 320', 'Default~iphone.png,320,480')
argv.example('$ ios-splash --width 320 --format json', '{"name":"Default~iphone.png","width":320,"height":480}')
argv.example('$ ios-splash --size ~iphone', 'Default~iphone.png,320,480')

argv = argv.argv

function formatLog (splash, argv) {
  var format = argv.format
  if (format === 'json') {
    return JSON.stringify(splash)
  }
  if (!(format === 'csv' || format === 'json')) format = 'csv'
  if (!Array.isArray(splash)) {
    splash = [splash]
  }
  return splash.map(function (image) {
    return image.name + ',' + image.width + ',' + image.height
  }).join('\n')
}

function cli () {
  var options = {
    size: argv.size,
    width: argv.width,
    height: argv.height
  }

  var output = splash(options)
  if (output) console.log(formatLog(output, argv))
}

cli()
