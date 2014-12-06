'use strict'
var icons = require('./icons.json')
var idRegEx = /^icon-?(.*)\.png$/
var widths = icons.map(function(icon) {
  return icon.width
})
var ids = icons.map(function(icon) {
  return icon.name.match(idRegEx)[1]
})
var names = icons.map(function(icon) {
  return icon.name
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
  if (!isNaN(width) && size !== '') {
    return width
  }
  width = widths[ids.indexOf(size)]
  if (width) {
    return width
  }
  return widths[ids.indexOf(size.match(idRegEx)[1])]
}

module.exports = function(options) {
  options = options || {}
  var size = options.size
  if (!size && size !== '') {
    return icons
  }
  return getIconForSize(size)
}

module.exports.icons = icons
module.exports.getIconForSize = getIconForSize
module.exports.getWidthForSize = getWidthForSize
