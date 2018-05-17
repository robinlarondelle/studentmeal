
function depth (fn, node) {
  if (node.children && node.children.length) {
    node.children.forEach(fn)
  }
}

/**
 * Depth first pre-order iterator
 */
exports.walk = function walk (fn, node) {
  fn(node)
  depth(child => walk(fn, child), node)
}

exports.walk2 = function walk2 (fn, node, parent) {
  fn(node, parent)
  depth(child => walk2(fn, child, node), node)
}

/**
 * Depth first post-order iterator
 */
exports.walkPost = function walkPost (fn, node) {
  depth(child => walkPost(fn, child), node)
  fn(node)
}

exports.walk2Post = function walk2Post (fn, node, parent) {
  fn(node, parent)
  depth(child => walk2Post(fn, child, node), node)
}
