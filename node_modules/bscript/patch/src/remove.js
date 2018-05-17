
const exists = require('exists')
const {
  generatePath,
  getNode,
  getParentNode,
  extPath,
  isAttribute
} = require('./util')

/**
 * Lets blessed handle actual removal
 */
function removeChild (child, parent) {
  parent.element.remove(child.element)
  // node.element.detach()
}

/**
 * Tries to reset key from obj to a sane default
 * @todo this assumes a lot, need to check this is ok
 */
function removeAttribute (obj, key) {
  if (!exists(obj[key])) {
    return
  }

  if (typeof obj[key] === 'number') {
    obj[key] = 0
    return
  }

  if (typeof obj[key] === 'string') {
    obj[key] = ''
    return
  }
}

/**
 * Removes an attribute or child
 */
function handleRemove (root, diff) {
  if (root === '_') {
    // Assume that we can not remove the root
    return
  }

  let path = generatePath(diff.path)
  let node = getNode(path, root)
  let parent = getParentNode(path, root)

  // Handle removing children
  if (!isAttribute(diff.path)) {
    removeChild(node, parent)
  }

  // Handle specific attribute removal
  let member = extPath(diff.path)
  let {attr, element} = node

  removeAttribute(attr, member)
  removeAttribute(element, member)
}

module.exports = {
  handleRemove
}
