'use strict'
var test = require('tape')
var splash = require('./')

test('returns all splash images in array', function (t) {
  t.plan(2)
  var images = splash()
  t.ok(Array.isArray(images), 'returned an array')
  t.equal(images.length, 10, '10 images returned')
})

test('returns splash image for size 320 as Number', function (t) {
  t.plan(3)
  var image = splash({size: 320})
  t.ok(image.name === 'Default~iphone.png')
  t.ok(image.width === 320)
  t.ok(image.height === 480)
})

test('returns splash image for width 640 as Number', function (t) {
  t.plan(3)
  var image = splash({width: '640'})
  t.ok(image.name === 'Default@2x~iphone.png')
  t.ok(image.width === 640)
  t.ok(image.height === 960)
})

test('returns splash image for height 1024 as Number', function (t) {
  t.plan(3)
  var image = splash({height: 1024})
  t.ok(image.name === 'Default-Portrait~ipad.png')
  t.ok(image.width === 768)
  t.ok(image.height === 1024)
})

test('returns splash image for size 1024 as String', function (t) {
  t.plan(3)
  var image = splash({size: '1024'})
  t.ok(image.name === 'Default-Landscape~ipad.png')
  t.ok(image.width === 1024)
  t.ok(image.height === 768)
})

test('returns splash image for width 2048 as String', function (t) {
  t.plan(3)
  var image = splash({width: '2048'})
  t.ok(image.name === 'Default-Landscape@2x~ipad.png')
  t.ok(image.width === 2048)
  t.ok(image.height === 1536)
})

test('returns splash image for height 1136 as String', function (t) {
  t.plan(3)
  var image = splash({height: '1136'})
  t.ok(image.name === 'Default-568h@2x~iphone.png')
  t.ok(image.width === 640)
  t.ok(image.height === 1136)
})

test('returns splash image for size 667h', function (t) {
  t.plan(3)
  var image = splash({size: '667h'})
  t.ok(image.name === 'Default-667h.png')
  t.ok(image.width === 750)
  t.ok(image.height === 1334)
})

test('returns splash image for size Landscape-736h', function (t) {
  t.plan(3)
  var image = splash({size: 'Landscape-736h'})
  t.ok(image.name === 'Default-Landscape-736h.png')
  t.ok(image.width === 2208)
  t.ok(image.height === 1242)
})

test('returns splash image for size @2x~iphone', function (t) {
  t.plan(3)
  var image = splash({size: '@2x~iphone'})
  t.ok(image.name === 'Default@2x~iphone.png')
  t.ok(image.width === 640)
  t.ok(image.height === 960)
})

test('returns splash image for width 320, prioritizing over size', function (t) {
  t.plan(3)
  var image = splash({size: '@2x~iphone.png', width: 320})
  t.ok(image.name === 'Default~iphone.png')
  t.ok(image.width === 320)
  t.ok(image.height === 480)
})

test('returns null for width 1234', function (t) {
  t.plan(1)
  var image = splash({width: 1234})
  t.ok(image === null)
})

test('returns null for size @3x-foo', function (t) {
  t.plan(1)
  var image = splash({size: '@3x-foo'})
  t.ok(image === null)
})
