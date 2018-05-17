
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')

function renderChildren (items) {
  let count = 0
  return items.map(item => {
    let node = Item({
      text: item,
      x: count
    })
    count += item.length + 1
    return node
  })
}

const Item = props => {
  return b('text', {
    left: props.x
  }, props.text)
}

const App = props => {
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
  }, renderChildren(props.items))
}

render(App({
  items: [
    'Hello,',
    'is',
    'it',
    'me',
    'you’re',
    'looking',
    'for?'
  ]
}), screen)
