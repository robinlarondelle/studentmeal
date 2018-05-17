
# bscript-tree

> Creates a tree of blessed elements

[![npm version](https://badge.fury.io/js/bscript-tree.svg)](https://badge.fury.io/js/bscript-tree)
[![Dependency Status](https://david-dm.org/mattstyles/bscript-tree.svg)](https://david-dm.org/mattstyles/bscript-tree)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

Install with [npm](https://npmjs.com)

```sh
$ npm i -S bscript-tree
```

## Example

```js
const b = require('bscript-tree')
```

## Usage

```js
const tree = b('element', [
  b('box', {
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: 'Hello'
  })
])
```

## API

### b (type, attr, children)

#### `type` `<String>`

The type of blessed element, not all elements are currently supported, and neither are custom elements just yet.

#### `attr` `<Object>`

Element attributes for this element.

#### `children` `<Array>`

Array of child elements.

## Running tests

```sh
$ npm install
$ npm test
```

## Contributing

Pull requests are always welcome, the project uses the [standard](http://standardjs.com) code style. Please run `npm test` to ensure all tests are passing and add tests for any new features or updates.

For bugs and feature requests, [please create an issue](https://github.com/mattstyles/bscript/issues).

## License

MIT
