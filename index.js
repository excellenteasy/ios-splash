'use strict'
var splash = require('./splash.json')
var idRegEx = /^Default-?(.*)\.png$/
var widths = splash.map(function (image) {
  return image.width
})
var heights = splash.map(function (image) {
  return image.height
})
var ids = splash.map(function (image) {
  return image.name.match(idRegEx)[1]
})

function getSplashForSize (width, height) {
  if (width) {
    width = getWidthForSize(width)
    if (!width) {
      return null
    }
    return splash[widths.indexOf(width)] || null
  }

  height = Number(height)
  return splash[heights.indexOf(height)] || null
}

function getWidthForSize (size) {
  if (typeof size === 'number') {
    return size
  }
  var width = Number(size)
  if (!isNaN(width) && size !== '') {
    return width
  }
  width = widths[ids.indexOf(size)]
  if (width) {
    return width
  }
  var id = size.match(idRegEx)
  if (id && id[1]) {
    return widths[ids.indexOf(id[1])]
  }

  return null
}

module.exports = function (options) {
  options = options || {}
  var size = options.size
  var width = options.width
  var height = options.height
  if (!width && !height && !size) {
    return splash
  }
  return getSplashForSize(width || size, height)
}

module.exports.splash = splash
module.exports.getSplashForSize = getSplashForSize
module.exports.getWidthForSize = getWidthForSize
