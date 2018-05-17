
const render = require('../')
const b = require('../../tree')
const {walk} = require('../../tree/util')
const screen = require('./util/screen')

let App = props => {
  return b('text', {
    top: 0,
    left: '50%',
    content: 'F'
  }, [
    b('text', {
      top: 2,
      left: -12,
      content: 'B'
    }, [
      b('text', {
        top: 2,
        left: -6,
        content: 'A'
      }),
      b('text', {
        top: 2,
        left: 6,
        content: 'D'
      }, [
        b('text', {
          top: 2,
          left: -6,
          content: 'C'
        }),
        b('text', {
          top: 2,
          left: 6,
          content: 'E'
        })
      ])
    ]),
    b('text', {
      top: 2,
      left: 12,
      content: 'G'
    }, [
      b('text', {
        top: 2,
        left: 6,
        content: 'I'
      }, [
        b('text', {
          top: 2,
          left: -6,
          content: 'H'
        })
      ])
    ])
  ])
}

let tree = render(b(App), screen)

walk(node => {
  console.log(node.attr.content)
}, tree)
