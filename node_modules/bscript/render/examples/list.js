
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')
const prettyTime = require('pretty-hrtime')

const Item = props => {
  return b('text', {
    top: props.top
  }, props.text)
}

const App = props => {
  let items = props.items.map((item, index) => {
    return Item({
      top: 2,
      text: item
    })
  })
  return b('box', {
    top: 0,
    left: 0
  }, items)
}

let count = 0
let state = ['foo', 'bar']

// This tests removing items
// Also pop during the main loop
// for (let i = 0; i < 100; i++) {
//   state.push(i + '')
// }

const FPS = 1000 / 60

var prev = process.hrtime()

function main (state) {
  let now = process.hrtime(prev)
  screen.debug('frame render time', prettyTime(now), now[1] > 32666666 ? 'OVER ' + count : '')

  render(b(App, {
    items: state
  }), screen)

  prev = process.hrtime()

  setTimeout(() => {
    if (count > 100) {
      screen.debug('    COMPLETED')
      process.exit(0)
    }

    count++
    state.push(count + '')
    // state.pop()
    main(state)
  }, FPS)
}

main(state)

// Manually test adding many items at once
// main([
//   'foo'
// ])
//
// setTimeout(() => {
//   main(
//     [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(i => 'foo ' + i)
//   )
// }, 500)
