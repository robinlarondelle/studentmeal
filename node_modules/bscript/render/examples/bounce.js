
const render = require('../')
const b = require('../../tree')
const screen = require('./util/screen')

const FPS = 1000 / 60

const Ball = props => {
  let {position, color} = props
  return b('box', {
    left: position[0] | 0,
    top: position[1] | 0,
    width: 1,
    height: 1,
    style: {
      bg: '#' + color.join('0') + '0'
    }
  })
}

let bounds = [0, 0, 60, 30]

let initial = {
  position: [0, 0],
  velocity: [Math.random(), -Math.random()],
  color: ['f', 'a', 'a'],
  tick: 0
}

function update (state) {
  let {position, velocity, tick, color} = state

  tick += FPS
  if (tick > 200) {
    tick = 0
    color = ['3', 'f', '4']
  }

  if (position[0] > bounds[2] || position[0] < bounds[0]) {
    velocity[0] = -velocity[0]
  }
  if (position[1] > bounds[3] || position[1] < bounds[1]) {
    velocity[1] = -velocity[1]
  }

  position[0] += velocity[0]
  position[1] += velocity[1]
  return Object.assign({}, state, {position, velocity, tick, color})
}

function main (state) {
  render(b(Ball, state), screen)

  setTimeout(() => {
    main(update(state))
  }, FPS)
}

main(initial)
