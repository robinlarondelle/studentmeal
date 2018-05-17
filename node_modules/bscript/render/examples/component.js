
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')

let App = props => {
  return b('box', {
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'white'
      }
    }
  }, props.content, [
    b('text', {
      top: 0,
      left: 20,
      content: 'Sailor'
    })
  ].concat(props.children))
}

render(b(App, {
  content: 'Hello'
}, [
  b('text', {
    top: 2
  }, 'World')
]), screen)
