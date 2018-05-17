
const tape = require('tape')
const b = require('bscript-tree')
const diffs = require('./diffs')
const util = require('../src/util')
const add = require('../src/add')

tape('generatePath converts member path into node path', t => {
  let p = util.generatePath(diffs.root().path)
  let p2 = util.generatePath(diffs.deep2().path)
  let p3 = util.generatePath(diffs.deep3().path)

  t.equal(p, '_', 'Root is denoted by an underscore')
  t.equal(p2, '/children/0', 'Handles one deep structure')
  t.equal(p3, '/children/0/children/1', 'Handles multi depth structure')

  t.end()
})

tape('extPath should grab just the member path', t => {
  let p = util.extPath(diffs.root().path)
  let p2 = util.extPath(diffs.deep2().path)
  let p3 = util.extPath(diffs.deep3().path)

  t.equal(p, 'content', 'Root is denoted by an underscore')
  t.equal(p2, 'content', 'Handles one deep structure')
  t.equal(p3, 'content', 'Handles multi depth structure')

  t.end()
})

tape('getNode should be able to walk a tree and pick out a specific node', t => {
  let tree = b('box', [
    b('text', 'hello', [
      b('span', 'world'),
      b('element')
    ])
  ])

  let n = util.getNode('_', tree)
  let n2 = util.getNode('children/0', tree)
  let n3 = util.getNode('children/0/children/1', tree)

  t.equal(n.type, 'Box', 'Retrieves the root node using an underscore')
  t.equal(n2.type, 'Text', 'Retrieves child nodes')
  t.equal(n3.type, 'Element', 'Retrieves deeper nodes')

  t.equal(n2.attr.content, 'hello', 'Setup for reference test')
  tree.children[0].attr.content = 'test'
  t.equal(n2.attr.content, 'test', 'Nodes are grabbed by reference')

  t.end()
})

tape('parentPath should grab the path to the parent', t => {
  let p = util.parentPath('children/0')
  let p2 = util.parentPath('children/0/children/1')

  t.equal(p, '', 'Handles root parent')
  t.equal(p2, 'children/0', 'Handles deeper nodes')

  t.end()
})

tape('getParentNode should grab the parent of a specified node', t => {
  let tree = b('box', 'root', [
    b('text', 'hello', [
      b('span', 'world'),
      b('element')
    ])
  ])

  let p = util.getParentNode('_', tree)
  let p2 = util.getParentNode('children/0', tree)
  let p3 = util.getParentNode('children/0/children/1', tree)

  t.equal(p, null, 'Retrieves the root node using an underscore')
  t.equal(p2.type, 'Box', 'Retrieves child nodes')
  t.equal(p3.type, 'Text', 'Retrieves deeper nodes')

  t.equal(p2.attr.content, 'root', 'Setup for reference test')
  tree.attr.content = 'test'
  t.equal(p2.attr.content, 'test', 'Parent nodes are grabbed by reference')

  t.end()
})

tape('creates an addition record', t => {
  let map = new Map()
  let diff = diffs.addRoot()
  let record = add.createAdditionRecord(map, diff[0])
  let newNode = record[1]

  let record2 = add.createAdditionRecord(map, diff[1])
  let newNode2 = record2[1]

  t.equal(record[0], '/children/0', 'an addition record has a path')
  t.equal(typeof newNode, 'object', 'an addition record contains a new node')
  t.ok(newNode['0'], 'an addition record knows where to add an element')
  t.ok(newNode2['1'], 'an addition record knows where children are')

  t.end()
})

tape('addition records understand tree depth', t => {
  let map = new Map()
  let diff = diffs.addDeep2()
  let record = add.createAdditionRecord(map, diff[0])
  let newNode = record[1]

  t.equal(record[0], '/children/0/children/0', 'an addition record has a path')
  t.equal(typeof newNode, 'object', 'an addition record contains a new node')
  t.ok(newNode['0'], 'an addition record knows where to add an element')

  t.end()
})

tape('addition records', t => {
  let map = new Map()
  let diff = diffs.newRoot()
  let records = []

  diff.forEach(d => records.push(add.createAdditionRecord(map, d)))

  t.equal(records[0][0], '_', 'addition records understand root')
  t.equal(records[0][1].type, 'Box', 'addition records register a single atomic change')
  t.equal(records[1][1].element, null, 'addition records register a single atomic change')

  t.end()
})
