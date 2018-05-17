
const tape = require('tape')
const b = require('./')
const {walk, walk2, walkPost} = require('./util')

function count (node) {
  let count = 0
  walk(() => count++, node)
  return count
}

/**
 * Returns a string denoting the order in which nodes were visited
 */
function traversalOrder (fn, node) {
  let str = ''
  fn(node => {
    str += node.type
  }, node)
  return str
}

/**
 * Creates a relation maps
 * '>' denotes immediate descendant
 * postfix '$' denotes leaf node
 */
function relationMap (fn, node, subroot) {
  let str = ''
  fn((child, parent) => {
    str += '{' +
      parent.type +
      '>' +
      child.type +
      (child.children.length ? '' : '$') +
      '}'
  }, node, subroot)
  return str
}

/**
 * Checks in-element relations
 * '>' denotes immediate descendant
 * prefix '^' denotes parent relation
 * postfix '$' denotes leaf node
 */
function relations (fn, root) {
  let str = ''
  fn(node => {
    str += '{' +
      (node.parent ? '^' + node.parent.type : '') +
      '>' +
      node.type +
      (node.children.length ? '' : '$') +
      '}'
  }, root)
  return str
}

function invoke (fn) {
  let args = Array.from(arguments)
  return () => {
    fn(...args.slice(1, args.length - 1))
  }
}

const Component = props => {
  return b('box', props)
}

const ChildComponent = props => {
  return b('box', props, props.children)
}

const ComplexComponent = props => {
  return b('c1', [b('c2')].concat(props.children))
}

tape('b should create a single node', t => {
  t.ok(b('element').type === 'Element', 'b should capitalize types')
  t.end()
})

tape('Check type parameter type', t => {
  t.ok(typeof b(Component).type === 'string', 'b should accept a function as type')
  t.ok(typeof b('element').type === 'string', 'b should accept a string as type')
  t.end()
})

tape('b should throw when no type if supplied or can not be infered', t => {
  t.throws(invoke(b, {}), 'b should throw when the type is unspecified')
  t.throws(invoke(b, 1), 'b should throw when the type can not be infered')
  t.end()
})

tape('b should not require the use of an attribute object', t => {
  let root = b('element', [
    b('element')
  ])
  t.looseEquals(root.attr, {}, 'b generates an empty attribute object when not supplied')
  t.equal(root.children.length, 1, 'b processes child array as 2nd param')
  t.end()
})

tape('b should create a tree of nodes', t => {
  let tree = b('element', [
    b('element')
  ])
  t.equal(count(tree), 2, 'b should recursively create the tree')

  let deepTree = b('1', [
    b('2', [
      b('3')
    ])
  ])
  t.equal(count(deepTree), 3, 'b can create deep trees')

  t.end()
})

tape('b should append a content string into the attribute list', t => {
  t.equal(
    b('el', 'content').attr.content,
    'content',
    'content gets appended'
  )
  t.end()
})

tape('walk will depth-first walk the tree', t => {
  let tree = b('r', [
    b('1', [
      b('2'),
      b('3')
    ]),
    b('4', [
      b('5')
    ])])
  t.equal(
    traversalOrder(walk, tree),
    'R12345',
    'walk is pre-order'
  )
  t.end()
})

tape('depth-first binary tree traversal', t => {
  let tree = b('F', [
    b('B', [
      b('A'),
      b('D', [
        b('C'),
        b('E')
      ])
    ]),
    b('G', [
      b('I', [
        b('H')
      ])
    ])
  ])
  let preorder = 'FBADCEGIH'
  let postorder = 'ACEDBHIGF'
  t.equal(traversalOrder(walk, tree), preorder,
    'depth-first pre-order is correct')
  t.equal(traversalOrder(walkPost, tree), postorder,
    'depth-first post-order is correct')
  t.end()
})

tape('walk2 will depth-first walk the tree and remember parent nodes', t => {
  let tree = b('r', [
    b('1', [
      b('2'),
      b('3')
    ]),
    b('4', [
      b('5')
    ])])
  t.equal(
    relationMap(walk2, tree, {type: '^'}),
    '{^>R}{R>1}{1>2$}{1>3$}{R>4}{4>5$}',
    'walk2 is pre-order'
  )
  t.end()
})

tape.skip('b should append children to their parents during creation', t => {
  // Simple example
  let linear = b('r', [b('1')])
  t.equal(linear.children[0].type, '1', 'r > 1 is ok')
  t.equal(linear.children[0].parent.type, 'R', '1 < r is ok')

  // same as b('r', [b('1', [b('2')])])
  let grandchild = b('2')
  let child = b('1', [grandchild])
  let root = b('r', [child])
  t.equal(root.children[0].type, child.type, 'r > 1 is ok')
  t.equal(child.parent.type, root.type, '1 < r is ok')
  t.equal(child.children[0].type, grandchild.type, '1 > 2 is ok')
  t.equal(grandchild.parent.type, child.type, '2 < 1 is ok')

  t.equal(
    relations(walk, root),
    '{>R}{^R>1}{^1>2$}',
    'relations are correct'
  )

  t.end()
})

tape('b should accept component functions', t => {
  let root = b(Component)
  t.equal(root.type, 'Box', 'Component functions should be invoked')
  let complexRoot = b(Component, [b('1')])
  t.equal(complexRoot.type, 'Box', 'Components passed with children invoke')
  t.equal(complexRoot.children.length, 0, 'Components can ignore children')
  let complexComp = b(ChildComponent)
  t.equal(complexComp.type, 'Box', 'Components with children invoke')
  t.equal(complexComp.children.length, 0, 'Components can be passed no children')
  let passedChildren = b(ChildComponent, [b('r1')])
  t.equal(passedChildren.type, 'Box', 'Components passed children invoke')
  t.equal(passedChildren.children.length, 1, 'Components honour passed children')
  let compChildren = b(ComplexComponent)
  t.equal(compChildren.type, 'C1', 'Components with children invoke')
  t.equal(compChildren.children.length, 1, 'Components can have their own children')
  let compChildrenPass = b(ComplexComponent, [b('r1')])
  t.equal(compChildrenPass.type, 'C1', 'Components with children and passed children invoke')
  t.equal(compChildrenPass.children.length, 2, 'Components can have their own children and be passed children')
  t.end()
})
