
const b = require('../')

const App = props => {
  return b('element', {
    customAttribute: 'foo',
    passedAttribute: props.pass
  }, 'custom content')
}

let root = b(App, {
  pass: 'bar'
})

console.log(root)
