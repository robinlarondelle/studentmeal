
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')

const App = props => {
  return b('box', {
    top: 0,
    left: 20
  }, 'frames: ' + props.text)
}

let state = 0
const FPS = 1000 / 60

function main (state) {
  render(b(App, {
    text: state
  }), screen)

  setTimeout(() => {
    state++
    main(state)
  }, FPS)
}

main(state)
