# ios-icons [![Build Status](https://travis-ci.org/excellenteasy/ios-icons.svg?branch=master)](https://travis-ci.org/excellenteasy/ios-icons)

> Get iOS icons: files names and sizes

The default icon file names and required sizes for iOS are derived from a [JSON file](sizes.json). This information is useful, for example, when you want to generate icons with the required sizes or to create a [`config.xml`](http://docs.phonegap.com/en/3.5.0/config_ref_images.md.html) file for a PhoneGap/Cordova project.


## Install

```sh
$ npm install --save ios-icons
```


## Usage

```js
var icons = require('ios-icons');

icons();
//=> [{name: 'icon-60@3x.png', width: 180}, {name: 'icon-60.png', width: 60, ...}]

icons('72')
//=> {name: 'icon-72.png', width: 72}

icons('small')
//=> {name: 'icon-small.png', width: 29}
```


## API

### icons()

Returns an array of icons, each icon being represented by an object with `name` and `width` properties.

> Notice that icons are always squares, so no `height` property is provided.

### icons(size)

Returns object of the icon for that size or `null`.

`size` can be either a `Number` or `String` value. If it is a `Number`, it represents the width in pixels. If it is a `String`, you can use `"@2x"` or `"@3x"` notation to refer to a certain size.

For example:

```js
icons("60@3x");
// ==> {name: "icon-60@3x.png", width: 180}
```


## CLI

```sh
$ npm install --global ios-icons
```

```sh
$ ios-icons --help

Examples:
	$ ios-icons
	[ { name: 'icon-60@3x.png', width: 180 }, { name: 'icon-60.png', width: 60 }, ... ]

	$ ios-icons --size 60
	{ name: 'icon-40.png', width: 40 }

	$ ios-icons --size 60@3x
	{ name: 'icon-60@3x.png', width: 180 }
	
```


## License
Based on [animals](https://github.com/boennemann/animals) by [Stephan Bönnemann](http://boennemann.me/).
MIT © [David Pfahler](http://excellenteasy.com)
