
const exists = require('exists')
const {
  getNode,
  generatePath,
  extPath
} = require('./util')

function replace (node, diff) {
  let {attr, element} = node

  Object.keys(diff).forEach(key => {
    // Attempt to update attr
    if (exists(attr[key])) {
      attr[key] = diff[key]
    }

    // Attempt to update the actual element
    // @TODO not sure this works for all attribute values
    if (exists(element[key])) {
      element[key] = diff[key]
    }
  })
}

/**
 * Handle replace mutation
 */
function handleReplace (root, diff) {
  let path = generatePath(diff.path)
  let node = getNode(path, root)
  let member = extPath(diff.path)
  let {attr, element} = node

  if (member === 'content') {
    element.setContent(diff.value)
    attr[member] = diff.value
    return
  }

  replace(node, {
    [member]: diff.value
  })

  // @TODO handle changes to the children array (do these even get
  // reported or are they handled normally?)
}

module.exports = {
  handleReplace,
  replace
}
