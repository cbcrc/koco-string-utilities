# koco-string-utilities
String utilities to be used with a [KOCO](https://github.com/cbcrc/generator-koco) project.

[See API reference](https://github.com/cbcrc/koco-string-utilities/wiki/API-reference-documentation)

## Installation

```bash
bower install koco-string-utilities
```

## Usage with KOCO

This is a shared module that is used in many other module. The convention is to configure an alias in the `require.configs.js` with the name `string-utilities` like so:

```javascript
paths: {
  ...
  'string-utilities': 'bower_components/koco-string-utilities/src/string-utilities'
  ...
}
```
