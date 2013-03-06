# Proof of Concept

Figuring out how source mapping urls could be added to browserify.

Run `npm test` to see a working example.

## Inline mappings

Inline mappings currently work in:

  - Chrome Canary (Version >= 27.0.1428.0 canary)
  - Chrome (Version >= 26.0.1410.19 beta)

Inline maps are **not working in**:

  - Chrome official release (Version 25.0.1364.155)

![dev-tools](https://raw.github.com/thlorenz/browserify-sourcemap-poc/master/assets/dev-tools.png)
