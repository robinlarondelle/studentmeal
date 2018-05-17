
const diff = require('bscript-diff')
const b = require('bscript-tree')

module.exports = {
  newRoot: function () {
    let x = {}
    let y = b('box', 'hello')
    return diff(x, y)
  },

  root: function () {
    let x = b('box', 'hello')
    let y = b('box', 'world')
    return diff(x, y)[0]
  },

  deep2: function () {
    let x = b('box', [
      b('text', 'hello')
    ])
    let y = b('box', [
      b('text', 'world')
    ])
    return diff(x, y)[0]
  },

  deep3: function () {
    let x = b('box', [
      b('text', [
        b('span', 'hello'),
        b('span', 'world')
      ])
    ])
    let y = b('box', [
      b('text', [
        b('span', 'hello'),
        b('span', 'foo')
      ])
    ])
    return diff(x, y)[0]
  },

  addRoot: function () {
    let x = b('a')
    let y = b('a', [b('b'), b('c')])
    return diff(x, y)
  },

  addDeep2: function () {
    let x = b('a', [b('b')])
    let y = b('a', [b('b', [b('c')])])
    return diff(x, y)
  },

  addAttrRoot: function () {
    let x = b('a', {
      top: 0
    })
    let y = b('a', {
      top: 1
    })
    return diff(x, y)
  }
}
