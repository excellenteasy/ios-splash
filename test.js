'use strict'
var test = require('tape')
var splash = require('./')
var exec = require('child_process').exec

test('returns all splash images in array', function (t) {
  t.plan(2)
  var images = splash()
  t.ok(Array.isArray(images), 'returned an array')
  t.equal(images.length, 24, '24 images returned')
})

test('returns splash image for size 320 as Number', function (t) {
  t.plan(3)
  var image = splash({ size: 320 })
  t.equal(image.name, 'Default~iphone.png', 'image has correct name')
  t.equal(image.width, 320, 'image has correct width')
  t.equal(image.height, 480, 'image has correct height')
})

test('returns splash image for width 640 as Number', function (t) {
  t.plan(3)
  var image = splash({ width: '640' })
  t.equal(image.name, 'Default@2x~iphone.png', 'image has correct name')
  t.equal(image.width, 640, 'image has correct width')
  t.equal(image.height, 960, 'image has correct height')
})

test('returns splash image for height 1024 as Number', function (t) {
  t.plan(3)
  var image = splash({ height: 1024 })
  t.equal(image.name, 'Default-Portrait~ipad.png', 'image has correct name')
  t.equal(image.width, 768, 'image has correct width')
  t.equal(image.height, 1024, 'image has correct height')
})

test('returns splash image for size 1024 as String', function (t) {
  t.plan(3)
  var image = splash({ size: '1024' })
  t.equal(image.name, 'Default-Landscape~ipad.png', 'image has correct name')
  t.equal(image.width, 1024, 'image has correct width')
  t.equal(image.height, 768, 'image has correct height')
})

test('returns splash image for width 2048 as String', function (t) {
  t.plan(3)
  var image = splash({ width: '2048' })
  t.equal(image.name, 'Default-Landscape@2x~ipad.png', 'image has correct name')
  t.equal(image.width, 2048, 'image has correct width')
  t.equal(image.height, 1536, 'image has correct height')
})

test('returns splash image for height 1136 as String', function (t) {
  t.plan(3)
  var image = splash({ height: '1136' })
  t.equal(image.name, 'Default-568h@2x~iphone.png', 'image has correct name')
  t.equal(image.width, 640, 'image has correct width')
  t.equal(image.height, 1136, 'image has correct height')
})

test('returns splash image for size 667h', function (t) {
  t.plan(3)
  var image = splash({ size: '667h' })
  t.equal(image.name, 'Default-667h.png', 'image has correct name')
  t.equal(image.width, 750, 'image has correct width')
  t.equal(image.height, 1334, 'image has correct height')
})

test('returns splash image for size Landscape-736h', function (t) {
  t.plan(3)
  var image = splash({ size: 'Landscape-736h' })
  t.equal(image.name, 'Default-Landscape-736h.png', 'image has correct name')
  t.equal(image.width, 2208, 'image has correct width')
  t.equal(image.height, 1242, 'image has correct height')
})

test('returns splash image for size @2x~iphone', function (t) {
  t.plan(3)
  var image = splash({ size: '@2x~iphone' })
  t.equal(image.name, 'Default@2x~iphone.png', 'image has correct name')
  t.equal(image.width, 640, 'image has correct width')
  t.equal(image.height, 960, 'image has correct height')
})

test('returns splash image for width 320, prioritizing over size', function (t) {
  t.plan(3)
  var image = splash({ size: '@2x~iphone.png', width: 320 })
  t.equal(image.name, 'Default~iphone.png', 'image has correct name')
  t.equal(image.width, 320, 'image has correct width')
  t.equal(image.height, 480, 'image has correct height')
})

test('returns storyboard image for width 2732, prioritizing over size', function (t) {
  t.plan(3)
  var image = splash({ size: 'Default@2x~universal~anyany', width: 2732 })
  t.equal(image.name, 'Default@2x~universal~anyany.png', 'image has correct name')
  t.equal(image.width, 2732, 'image has correct width')
  t.equal(image.height, 2732, 'image has correct height')
})

test('returns null for width 1234', function (t) {
  t.plan(1)
  var image = splash({ width: 1234 })
  t.ok(image === null)
})

test('returns null for size @3x-foo', function (t) {
  t.plan(1)
  var image = splash({ size: '@3x-foo' })
  t.ok(image === null)
})

test('cli returns all splash images as csv', function (t) {
  t.plan(1)
  var expected = 'Default~iphone.png,320,480\nDefault@2x~iphone.png,640,960\nDefault-Portrait~ipad.png,768,1024\nDefault-Portrait@2x~ipad.png,1536,2048\nDefault-Landscape~ipad.png,1024,768\nDefault-Landscape@2x~ipad.png,2048,1536\nDefault-568h@2x~iphone.png,640,1136\nDefault-667h.png,750,1334\nDefault-Landscape-667h.png,1334,750\nDefault-736h.png,1242,2208\nDefault-Landscape-736h.png,2208,1242\nDefault@2x~universal~anyany.png,2732,2732\nDefault-812h.png,1125,2436\nDefault-Landscape-812h.png,2436,1125\nDefault-896h.png,828,1792\nDefault-Landscape-896h.png,1792,828\nDefault-896h@3x.png,1242,2688\nDefault-Landscape-896h@3x.png,2688,1242\nDefault-1112h.png,1668,2224\nDefault-Landscape-1112h.png,2224,1668\nDefault-1194h.png,1668,2388\nDefault-Landscape-1194h.png,2388,1668\nDefault-1366h.png,2048,2732\nDefault-Landscape-1366h.png,2732,2048\n'
  exec('./bin/ios-splash.js', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
})

test('cli returns correct image for width 320 as csv', function (t) {
  t.plan(1)
  var expected = 'Default~iphone.png,320,480\n'
  exec('./bin/ios-splash.js --width 320', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
})

test('cli returns correct image for size "~iphone" as json', function (t) {
  t.plan(1)
  var expected = '{"name":"Default~iphone.png","width":320,"height":480}\n'
  exec('./bin/ios-splash.js --size ~iphone --format json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
})

// abbrev

test('cli returns all splash images as json w/ & w/o abbreviated flags', function (t) {
  t.plan(6)
  var expected = '[{"name":"Default~iphone.png","width":320,"height":480},{"name":"Default@2x~iphone.png","width":640,"height":960},{"name":"Default-Portrait~ipad.png","width":768,"height":1024},{"name":"Default-Portrait@2x~ipad.png","width":1536,"height":2048},{"name":"Default-Landscape~ipad.png","width":1024,"height":768},{"name":"Default-Landscape@2x~ipad.png","width":2048,"height":1536},{"name":"Default-568h@2x~iphone.png","width":640,"height":1136},{"name":"Default-667h.png","width":750,"height":1334},{"name":"Default-Landscape-667h.png","width":1334,"height":750},{"name":"Default-736h.png","width":1242,"height":2208},{"name":"Default-Landscape-736h.png","width":2208,"height":1242},{"name":"Default@2x~universal~anyany.png","width":2732,"height":2732},{"name":"Default-812h.png","width":1125,"height":2436},{"name":"Default-Landscape-812h.png","width":2436,"height":1125},{"name":"Default-896h.png","width":828,"height":1792},{"name":"Default-Landscape-896h.png","width":1792,"height":828},{"name":"Default-896h@3x.png","width":1242,"height":2688},{"name":"Default-Landscape-896h@3x.png","width":2688,"height":1242},{"name":"Default-1112h.png","width":1668,"height":2224},{"name":"Default-Landscape-1112h.png","width":2224,"height":1668},{"name":"Default-1194h.png","width":1668,"height":2388},{"name":"Default-Landscape-1194h.png","width":2388,"height":1668},{"name":"Default-1366h.png","width":2048,"height":2732},{"name":"Default-Landscape-1366h.png","width":2732,"height":2048}]\n'
  exec('./bin/ios-splash.js --format json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --forma json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --form json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --for json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --fo json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --f json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
})

test('cli returns correct image for width 320 w/ abbreviated flags', function (t) {
  t.plan(4)
  var expected = 'Default~iphone.png,320,480\n'
  exec('./bin/ios-splash.js --widt 320', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --wid 320', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --wi 320', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --w 320', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
})

test('cli returns correct image for size "~iphone" as json w/ abbreviated flags', function (t) {
  t.plan(3)
  var expected = '{"name":"Default~iphone.png","width":320,"height":480}\n'
  exec('./bin/ios-splash.js --siz ~iphone --format json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --si ~iphone --format json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
  exec('./bin/ios-splash.js --s ~iphone --format json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned the expected output')
  })
})
