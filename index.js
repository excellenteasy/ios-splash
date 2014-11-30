'use strict';
var sizes = require('./sizes.json');

function getIconForSize(size) {
	var width = getWidthForSize(size);
	var name  = getNameForWidth(width);

	if (!width || !name) {
		return null;
	}

	return {
		name: name + '.png',
		width: width
	};
}

function getWidthForSize(size) {
	if (size === '' || size === 57) {
		return 57;
	}
	else if ('number' === typeof size) {
		return sizes[sizes.indexOf(size)];
	}
	else if ('string' === typeof size) {
		if (size == 'small') {
			return 29;
		}
		if (size === 'small@2x') {
			return 58;
		}
		if (size === '@2x') {
			return 114;
		}
		var values = size.split('@');
		return values[0] * ((values[1] && values[1][0]) || 1);
	}
}

function getNameForWidth(width) {
	if (width === 57) {
		return 'icon';
	}
	if (width == 114) {
		return 'icon@2x';
	}
	if (width === 29) {
		return 'icon-small';
	}
	if (width === 58) {
		return 'icon-small@2x';
	}

	var sizes = [60, 76, 40, 72, 50];
	if (sizes.indexOf(width) !== -1) {
		return 'icon-' + width;
	}
	for (var i = 0; i < sizes.length; i++) {
		if (width % sizes[i] === 0) {
			var factor = width / sizes[i];
			if ((factor === 3 && width === 180) || factor === 2) {
				return 'icon-' + sizes[i] + '@' + (width / sizes[i]) + 'x';
			}
		}
	};
}

module.exports = function (size) {
	debugger
	if (!size && size !== '') {
		return sizes.map(getIconForSize);
	}
	return getIconForSize(size);
};

module.exports.sizes = sizes;
