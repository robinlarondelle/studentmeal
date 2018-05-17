
const diff = require('bscript-diff')
const patch = require('bscript-patch')

/**
 * Creates a new id based from the parent
 * id's should not necessarily denote hierarchy so just use a counter,
 * does the advantage of each node having its own number id as well as
 * a longer id denoting path from root to node
 */
function attachId (key) {
  let count = 0
  return (node, parent) => {
    let id = parent ? parent._id + '$' : key + '$' || '$'
    id += count++ + '.'
    node._id = id
  }
}

let stateTree = {}

/**
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */

module.exports = function render (root, screen) {
  let d = diff(stateTree, root)
  patch(d, stateTree, screen)

  screen.render()
  return stateTree
}
