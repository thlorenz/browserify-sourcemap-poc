'use strict';
var sm = require('source-map');
var SourceMapGenerator = sm.SourceMapGenerator;
var smg = new SourceMapGenerator({ file: 'example/bundle.js' });

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

var jsonstr= smg.toString();
var map = new Buffer(jsonstr).toString('base64');
var mapping = '//@ sourceMappingURL=data:application/json;base64,' + map.toString();
bundleLines.push(mapping);


fs.writeFileSync(path.join(__dirname, 'example/bundle.js'), bundleLines.join('\n') , 'utf-8');
