
# bscript

> Creates a tree of elements

[![npm version](https://badge.fury.io/js/bscript.svg)](https://badge.fury.io/js/bscript)
[![Dependency Status](https://david-dm.org/mattstyles/bscript.svg)](https://david-dm.org/mattstyles/bscript)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

Install with [npm](https://npmjs.com)

```sh
$ npm i -S bscript
```

## Example

```js
const b = require('bscript')

b('box', {
  top: 2,
  left: 2
}, 'Page', [
  b('text', 'Title')
])
```

## Usage

`bscript` will return a tree of nodes which can be fed into a render function to produce output on the screen.

```js
const b = require('bscript')
const render = require('bscript-render')
const blessed = require('blessed')

const screen = blessed.screen({
  title: 'example'
})

screen.on('keypress', (ch, key) => {
  if (['escape', 'q', 'C-c'].includes(key.full)) {
    process.exit(0)
  }
})

render(b('text', 'Hello World'), screen)
```

## Contributing

Pull requests are always welcome, the project uses the [standard](http://standardjs.com) code style.

For bugs and feature requests, [please create an issue](https://github.com/mattstyles/bscript/issues).

## License

MIT
