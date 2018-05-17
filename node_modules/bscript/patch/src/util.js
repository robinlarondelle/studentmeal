
const R = require('./regex')

/**
 * Strips bscript-node members from the path to reveal the path to
 * the actual node rather to a node member
 */
function generatePath (path) {
  return path.replace(R.NODE_MEMBERS, '') || '_'
}

/**
 * Justs grabs the end of the path, which should be the member that
 * needs to be manipulated
 */
function extPath (path) {
  return path.match(R.CHANGE)[0]
}

/**
 * Returns the route to the parent node of the specified path
 */
function parentPath (path) {
  return generatePath(path)
    .replace(R.NODE_PARENT, '')
    .replace(/\/$/, '')
}

/**
 * Grabs the node member from the path
 */
function memberPath (path) {
  return path.match(R.NODE_MEMBERS)[0]
}

function isAttribute (path) {
  return R.NODE_MEMBERS.test(path)
}

/**
 * Walks the tree and returns the requested node
 */
function getNode (path, tree) {
  if (path === '_' || path === '') {
    return tree
  }

  return path
    .split('/')
    .reduce((node, segment) => {
      if (segment === '') {
        return node
      }

      return node[segment]
    }, tree)
}

/**
 * Walks the tree and returns the parent
 */
function getParentNode (path, tree) {
  if (path === '_') {
    return null
  }

  return getNode(
    parentPath(path),
    tree
  )
}

/**
 * Mutative clone of b to a
 */
function objectClone (a, b) {
  let r = Object.assign({}, b)
  Object.keys(r).forEach(key => {
    a[key] = r[key]
  })
}

module.exports = {
  extPath,
  generatePath,
  memberPath,
  parentPath,
  getNode,
  getParentNode,
  isAttribute,
  objectClone
}
