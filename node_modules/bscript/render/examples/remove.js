
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')

render(b('box', 'Hello', [
  b('box', {
    left: 6
  }, 'World')
]), screen)

setTimeout(() => {
  render(b('box', 'Hello'), screen)
}, 250)
