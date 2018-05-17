
// Node member keys
const NODE_MEMBERS = /\/type$|\/attr$|\/attr\/.+$|\/children$/

// Keys to ignore
const IGNORE = /\/element$/

// Grabs any change from the end
const CHANGE = /[^\/]*$/

// Grabs the parent of a node
const NODE_PARENT = /children\/[0-9]+$/

const R = {
  NODE_MEMBERS,
  NODE_PARENT,
  IGNORE,
  CHANGE
}

module.exports = R
