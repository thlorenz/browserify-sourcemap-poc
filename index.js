'use strict';
var sm = require('source-map');
var SourceMapGenerator = sm.SourceMapGenerator;
var path = require('path');
var smg = new SourceMapGenerator({ file: '', sourceRoot: path.resolve(__dirname, 'example') });

var fs = require('fs');
var path = require('path');
var foo = fs.readFileSync(require.resolve('./example/foo'), 'utf-8');
var fooLines = foo.split('\n');

var bar = fs.readFileSync(require.resolve('./example/bar'), 'utf-8');
var barLines = bar.split('\n');

var subfoo = fs.readFileSync(require.resolve('./example/sub/foo'), 'utf-8');
var subfooLines = subfoo.split('\n');

var bundleLines = [];

fooLines.forEach(function (line, idx) {
  bundleLines.push(line);
  smg.addMapping({
      source: 'foo.js'
    , original: { line: idx + 1, column: 0 }
    , generated: { line: bundleLines.length, column: 0 }
  });
});

subfooLines.forEach(function (line, idx) {
  bundleLines.push(line);
  smg.addMapping({
      source: 'sub/foo.js'
    , original: { line: idx + 1, column: 0 }
    , generated: { line: bundleLines.length, column: 0 }
  });
});

barLines.forEach(function (line, idx) {
  bundleLines.push(line);
  smg.addMapping({
      source: 'bar.js'
    , original: { line: idx + 1, column: 0 }
    , generated: { line: bundleLines.length, column: 0 }
  });
});

function inlineMappings() {

  /*
  * Inline mappings currently work in:
  *   Chrome Canary (Version 27.0.1428.0 canary) and up
  *   Chrome Version 26.0.1410.19 beta
  *
  * Inline maps are not working in:
  *   Chrome official release (Version 25.0.1364.155)
  */

  var map= smg.toString();
  var encodedMap = new Buffer(map).toString('base64');
  var mapping = '//@ sourceMappingURL=data:application/json;base64,' + encodedMap;
  bundleLines.push(mapping);
}


inlineMappings();
fs.writeFileSync(path.join(__dirname, 'example/build/bundle.js'), bundleLines.join('\n') , 'utf-8');
