
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')

// render(b('box', 'Hello', [
//   b('box', {
//     top: 1,
//     content: 'deep'
//   })
// ]), screen)
//
// setTimeout(() => {
//   render(b('box', 'Hello', [
//     b('box', {
//       top: 1
//     })
//   ]), screen)
// }, 250)

render(b('box', 'Hello', [
  b('box', {
    top: 1,
    content: 'World'
  })
]), screen)

setTimeout(() => {
  render(b('box', 'Hello', [
    b('box', {
      content: 'World'
    })
  ]), screen)
}, 250)

// render(b('box', 'Hello', [
//   b('box', 'World')
// ]), screen)
//
// setTimeout(() => {
//   render(b('box', 'Hello'), screen)
// }, 250)
