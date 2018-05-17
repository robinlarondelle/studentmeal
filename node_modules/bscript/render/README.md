
# bscript-render

> Renders blessed elements from a bscript tree

[![npm version](https://badge.fury.io/js/bscript-render.svg)](https://badge.fury.io/js/bscript-render)
[![Dependency Status](https://david-dm.org/mattstyles/bscript-render.svg)](https://david-dm.org/mattstyles/bscript-render)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

Install with [npm](https://npmjs.com)

```sh
$ npm i -S bscript-render
```

## Example

```js
const bscript-render = require('bscript-render')
```

## Usage

```js
const blessed = require('blessed')
const render = require('bscript-render')
const b = require('bscript-tree')

const screen = blessed.screen()

let tree = b('box', {
  top: 0,
  left: 0,
  width: 100%,
  height: 1
}, 'Hello')

render(tree, screen)
```

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
