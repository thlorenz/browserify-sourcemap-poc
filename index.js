'use strict';
var sm = require('source-map');
var SourceMapGenerator = sm.SourceMapGenerator;
var smg = new SourceMapGenerator({ file: 'example/bundle.js', sourceRoot: './' });

var fs = require('fs');
var path = require('path');
var foo = fs.readFileSync(require.resolve('./example/foo'), 'utf-8');
var fooLines = foo.split('\n');

var bar = fs.readFileSync(require.resolve('./example/bar'), 'utf-8');
var barLines = bar.split('\n');

var bundleLines = [];

fooLines.forEach(function (line, idx) {
  bundleLines.push(line);
  smg.addMapping({
      source: 'foo.js'
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

bundleLines.push('//@ sourceMappingURL=bundle.js.map');

var prettyMap = JSON.stringify(JSON.parse(smg.toString()), null, 4);

fs.writeFileSync(path.join(__dirname, 'example/bundle.js'), bundleLines.join('\n') , 'utf-8');
fs.writeFileSync(path.join(__dirname, 'example/bundle.js.map'), prettyMap , 'utf-8');
