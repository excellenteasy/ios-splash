'use strict';
var test = require('tape');
var iosIcons = require('./');

test('returns all icons in array', function (t) {
	t.plan(2);
	var icons = iosIcons();
	t.ok(Array.isArray(icons), 'returned an array');
	t.equal(icons.length, 15, '15 icons returned');
});

test('returns icon for width 60 as Number', function (t) {
	t.plan(2);
	var icon = iosIcons(60);
	t.ok(icon.name === 'icon-60.png');
	t.ok(icon.width === 60);
});

test('returns icon for width 60 as String', function (t) {
	t.plan(2);
	var icon = iosIcons('60');
	t.ok(icon.name === 'icon-60.png');
	t.ok(icon.width === 60);
});

test('returns icon for width 120', function (t) {
	t.plan(2);
	var icon = iosIcons(120);
	t.ok(icon.name === 'icon-60@2x.png');
	t.ok(icon.width === 120);
});

test('returns icon for width 60@2x', function (t) {
	t.plan(2);
	var icon = iosIcons('60@2x');
	t.ok(icon.name === 'icon-60@2x.png');
	t.ok(icon.width === 120);
});

test('returns icon for width 60@3x', function (t) {
	t.plan(2);
	var icon = iosIcons('60@3x');
	t.ok(icon.name === 'icon-60@3x.png');
	t.ok(icon.width === 180);
});

test('returns icon for empty string with width 57', function (t) {
	t.plan(2);
	var icon = iosIcons('');
	t.ok(icon.name === 'icon.png');
	t.ok(icon.width === 57);
});

test('returns icon for width 57 as Number', function (t) {
	t.plan(2);
	var icon = iosIcons(57);
	t.ok(icon.name === 'icon.png');
	t.ok(icon.width === 57);
});

test('returns icon for width 57 as String', function (t) {
	t.plan(2);
	var icon = iosIcons('57');
	t.ok(icon.name === 'icon.png');
	t.ok(icon.width === 57);
});

test('returns icon for @2x', function (t) {
	t.plan(2);
	var icon = iosIcons('@2x');
	t.ok(icon.name === 'icon@2x.png');
	t.ok(icon.width === 114);
});

test('returns icon for width 114 as Number', function (t) {
	t.plan(2);
	var icon = iosIcons(114);
	t.ok(icon.name === 'icon@2x.png');
	t.ok(icon.width === 114);
});

test('returns icon for width 114 as String', function (t) {
	t.plan(2);
	var icon = iosIcons('114');
	t.ok(icon.name === 'icon@2x.png');
	t.ok(icon.width === 114);
});

test('returns null for width 123', function (t) {
	t.plan(1);
	var icon = iosIcons(123);
	t.ok(icon === null);
});

test('returns icon for width 29 as small', function (t) {
	t.plan(2);
	var icon = iosIcons(29);
	t.ok(icon.name === 'icon-small.png');
	t.ok(icon.width === 29);
});

test('returns icon for width 58 as small@2x', function (t) {
	t.plan(2);
	var icon = iosIcons(58);
	t.ok(icon.name === 'icon-small@2x.png');
	t.ok(icon.width === 58);
});
