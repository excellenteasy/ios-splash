'use strict'
var icons = require('./icons.json')
var widths = icons.map(function(icon) {
  return icon.width
})
var names = icons.map(function(icon) {
  return icon.name.match(/^icon-?(.*)\.png$/)[1]
})

function getIconForSize(size) {
  var width = getWidthForSize(size)

  if (!width) {
    return null
  }

  return icons[widths.indexOf(width)] || null
}

function getWidthForSize(size) {
  if ('number' === typeof size) {
    return size
  }
  var width = Number(size)
  if (isNaN(width) || size === '') {
    return widths[names.indexOf(size)]
  }
  return width
}

module.exports = function(options) {
  options = options || {}
  var size = options.size
  if (!size && size !== '') {
    return icons
  }
  return getIconForSize(size)
}

exports.icons = icons
exports.getIconForSize = getIconForSize
exports.getWidthForSize = getWidthForSize
