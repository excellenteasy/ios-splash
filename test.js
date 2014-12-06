'use strict';
var test = require('tape');
var iosIcons = require('./');

test('returns all icons in array', function (t) {
	t.plan(2);
	var icons = iosIcons();
	t.ok(Array.isArray(icons), 'returned an array');
	t.equal(icons.length, 15, '15 icons returned');
});

test('returns icon for size 60 as Number', function (t) {
	t.plan(2);
	var icon = iosIcons({size: 60});
	t.ok(icon.name === 'icon-60.png');
	t.ok(icon.width === 60);
});

test('returns icon for size 60 as String', function (t) {
	t.plan(2);
	var icon = iosIcons({size: '60'});
	t.ok(icon.name === 'icon-60.png');
	t.ok(icon.width === 60);
});

test('returns icon for size 120', function (t) {
	t.plan(2);
	var icon = iosIcons({size: 120});
	t.ok(icon.name === 'icon-60@2x.png');
	t.ok(icon.width === 120);
});

test('returns icon for size 60@2x', function (t) {
	t.plan(2);
	var icon = iosIcons({size: '60@2x'});
	t.ok(icon.name === 'icon-60@2x.png');
	t.ok(icon.width === 120);
});

test('returns icon for size 60@3x', function (t) {
	t.plan(2);
	var icon = iosIcons({size: '60@3x'});
	t.ok(icon.name === 'icon-60@3x.png');
	t.ok(icon.width === 180);
});

test('returns icon for empty string with width 57', function (t) {
	t.plan(2);
	var icon = iosIcons({size: ''});
	t.ok(icon.name === 'icon.png');
	t.ok(icon.width === 57);
});

test('returns icon for size 57 as Number', function (t) {
	t.plan(2);
	var icon = iosIcons({size: 57});
	t.ok(icon.name === 'icon.png');
	t.ok(icon.width === 57);
});

test('returns icon for size 57 as String', function (t) {
	t.plan(2);
	var icon = iosIcons({size: '57'});
	t.ok(icon.name === 'icon.png');
	t.ok(icon.width === 57);
});

test('returns icon for @2x', function (t) {
	t.plan(2);
	var icon = iosIcons({size: '@2x'});
	t.ok(icon.name === 'icon@2x.png');
	t.ok(icon.width === 114);
});

test('returns icon for size 114 as Number', function (t) {
	t.plan(2);
	var icon = iosIcons({size: 114});
	t.ok(icon.name === 'icon@2x.png');
	t.ok(icon.width === 114);
});

test('returns icon for size 114 as String', function (t) {
	t.plan(2);
	var icon = iosIcons({size: '114'});
	t.ok(icon.name === 'icon@2x.png');
	t.ok(icon.width === 114);
});

test('returns null for size 123', function (t) {
	t.plan(1);
	var icon = iosIcons({size: 123});
	t.ok(icon === null);
});

test('returns icon for size 29 as small', function (t) {
	t.plan(2);
	var icon = iosIcons({size: 29});
	t.ok(icon.name === 'icon-small.png');
	t.ok(icon.width === 29);
});

test('returns icon for size 58 as small@2x', function (t) {
	t.plan(2);
	var icon = iosIcons({size: 58});
	t.ok(icon.name === 'icon-small@2x.png');
	t.ok(icon.width === 58);
});

test('returns icon for file name icon-small@2x.png', function (t) {
  t.plan(2);
  var icon = iosIcons({size: 'icon-small@2x.png'});
  t.ok(icon.name === 'icon-small@2x.png');
  t.ok(icon.width === 58);
});

test('returns icon for file name icon.png', function (t) {
  t.plan(2);
  var icon = iosIcons({size: 'icon.png'});
  t.ok(icon.name === 'icon.png');
  t.ok(icon.width === 57);
});
