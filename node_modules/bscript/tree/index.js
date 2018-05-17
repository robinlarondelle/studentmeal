
const {isArray} = require('util')

/**
 * Use generator to create the node
 */
class Node {
  constructor () {
    this.type = null
    this.element = null
    this.attr = {}
    this.children = []
  }
}

/**
 * Node generator, accepts multiple arguments
 */
function createNode (args) {
  let node = new Node()

  // The order of checks is important
  function generate (p) {
    // Type
    if (typeof p === 'string' && node.type === null) {
      node.type = p.replace(/^./, ch => ch.toUpperCase())
      return
    }

    // Type
    if (typeof p === 'function') {
      node.type = p
      return
    }

    // Children
    if (isArray(p)) {
      node.children = p
      return
    }

    // Attr
    if (typeof p === 'object') {
      node.attr = p
      return
    }

    // Content
    if (typeof p === 'string') {
      node.attr.content = p
      return
    }
  }

  while (args.length) {
    generate(args.shift())
  }

  if (!node.type) {
    throw new Error('Can not generate node type')
  }

  return node
}

/**
 * Main bscript function, returns nodes
 */
module.exports = function b () {
  let node = createNode(Array.from(arguments))

  // If its a component then unpack it
  if (typeof node.type === 'function') {
    node = node.type(Object.assign({}, node.attr, {
      children: node.children
    }))
  }

  return node
}
