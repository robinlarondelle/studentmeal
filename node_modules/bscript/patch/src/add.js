
const {
  objectClone,
  getNode,
  getParentNode,
  generatePath,
  extPath
} = require('./util')
const {create} = require('./create')
const {replace} = require('./replace')

/**
 * Creates a key-value addition record given a map of records and a
 * diff object to use.
 * Returns key-value tuple.
 */
function createAdditionRecord (map, diff) {
  let path = generatePath(diff.path)
  let obj = map.get(path) || {}

  // Append diff to the addition record
  obj[extPath(diff.path)] = diff.value
  return [path, obj]
}

/**
 * Mutates root to match the new root node
 */
function renderRoot (root, node) {
  // Clone root to the new node
  objectClone(root, node)

  // Create the blessed element for the bscript node
  create(root, null)

  return root
}

/**
 * Handle additions to the state tree.
 * Mutatates root param.
 */
function handleAdditions (root, screen) {
  // Returns iterator to pass through Map.forEach (kv pair)
  return (node, path) => {
    // Check for initial render
    if (path === '_' && !root.element) {
      renderRoot(root, node)
      screen.append(root.element)
      return
    }

    let parent = getParentNode(path, root)
    let stateNode = getNode(path, root)

    // Check for an attribute addition in an existing element
    if (stateNode) {
      let key = node[0]

      // If the key is an integer then this is a child, otherwise it is
      // an attribute
      if (!parseInt(key)) {
        replace(stateNode, node)
        return
      }
    }

    // Sanity check child path
    if (!/children/.test(path)) {
      return
    }

    // Iterate through addition keys (there should be just one)
    // Create new node and append to parent
    Object.keys(node).forEach(key => {
      let n = node[key]
      create(n, parent)
    })
  }
}

module.exports = {
  createAdditionRecord,
  handleAdditions
}
