
const blessed = require('blessed')

/**
 * Creates the raw blessed instance from attributes
 */
function createElement (type, attr) {
  if (blessed[type]) {
    return blessed[type](attr)
  }

  throw new Error('unrecognized type: ' + type)
}

/**
 * Mutates the node by appending id and an actual element
 */
function create (node, parent) {
  const {type, attr} = node
  node.element = createElement(type, Object.assign({}, attr))

  if (node.children) {
    node.children.forEach(child => {
      create(child, node)
    })
  }

  if (!parent) {
    // parent.append(node.element)
    return
  }

  parent.element.append(node.element)
}

module.exports = {
  create,
  createElement
}
