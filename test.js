'use strict';
var test = require('ava');
var iosIcons = require('./');

test('returns all icons in array', function (t) {
	var icons = iosIcons();
	t.assert(Array.isArray(icons));
	t.assert(icons.length === 15);
});

test('returns icon for width 60 as Number', function (t) {
	var icon = iosIcons(60);
	t.assert(icon.name === 'icon-60.png');
	t.assert(icon.width === 60);
});

test('returns icon for width 60 as String', function (t) {
	var icon = iosIcons('60');
	t.assert(icon.name === 'icon-60.png');
	t.assert(icon.width === 60);
});

test('returns icon for width 120', function (t) {
	var icon = iosIcons(120);
	t.assert(icon.name === 'icon-60@2x.png');
	t.assert(icon.width === 120);
});

test('returns icon for width 60@2x', function (t) {
	var icon = iosIcons('60@2x');
	t.assert(icon.name === 'icon-60@2x.png');
	t.assert(icon.width === 120);
});

test('returns icon for width 60@3x', function (t) {
	var icon = iosIcons('60@3x');
	t.assert(icon.name === 'icon-60@3x.png');
	t.assert(icon.width === 180);
});

test('returns icon for empty string with width 57', function (t) {
	var icon = iosIcons('');
	t.assert(icon.name === 'icon.png');
	t.assert(icon.width === 57);
});

test('returns icon for width 57 as Number', function (t) {
	var icon = iosIcons(57);
	t.assert(icon.name === 'icon.png');
	t.assert(icon.width === 57);
});

test('returns icon for width 57 as String', function (t) {
	var icon = iosIcons('57');
	t.assert(icon.name === 'icon.png');
	t.assert(icon.width === 57);
});

test('returns icon for @2x', function (t) {
	var icon = iosIcons('@2x');
	t.assert(icon.name === 'icon@2x.png');
	t.assert(icon.width === 114);
});

test('returns icon for width 114 as Number', function (t) {
	var icon = iosIcons(114);
	t.assert(icon.name === 'icon@2x.png');
	t.assert(icon.width === 114);
});

test('returns icon for width 114 as String', function (t) {
	var icon = iosIcons('114');
	t.assert(icon.name === 'icon@2x.png');
	t.assert(icon.width === 114);
});

test('returns null for width 123', function (t) {
	var icon = iosIcons(123);
	t.assert(icon === null);
});

test('returns icon for width 29 as small', function (t) {
	var icon = iosIcons(29);
	t.assert(icon.name === 'icon-small.png');
	t.assert(icon.width === 29);
});

test('returns icon for width 58 as small@2x', function (t) {
	var icon = iosIcons(58);
	t.assert(icon.name === 'icon-small@2x.png');
	t.assert(icon.width === 58);
});
