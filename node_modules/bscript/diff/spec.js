
const {isArray} = require('util')
const tape = require('tape')
const diff = require('./')
const b = require('../tree')

tape('diff should produce a list of ops', t => {
  let x = b('box', [
    b('text', 'hello')
  ])
  let y = b('box', [
    b('text', 'world')
  ])

  let d = diff(x, y)

  t.ok(isArray(d), 'Diff list is an array')
  t.end()
})

tape('diff should report on mutations', t => {
  let tests = [
    () => {
      let x = b('box', 'hello')
      let y = b('box', 'world')

      let d = diff(x, y)
      let p = d[0]
      t.equal(p.op, 'replace', 'Detected content mutation')
      t.equal(p.path, '/attr/content', 'Patch location report')
    },
    () => {
      let x = b('box', [
        b('text', 'hello')
      ])
      let y = b('box', [
        b('text', 'world')
      ])

      let d = diff(x, y)
      let p = d[0]
      t.equal(p.op, 'replace', 'Detected content mutation in children')
      t.equal(p.path, '/children/0/attr/content', 'Patch location report')
    },
    () => {
      let x = b('text')
      let y = b('box')

      let d = diff(x, y)
      let p = d[0]
      t.equal(p.op, 'replace', 'Detected type change')
      t.equal(p.path, '/type', 'Patch type location')
    }
  ]

  tests.forEach(fn => fn())
  t.end()
})

tape('diff should report on additions', t => {
  let tests = [
    () => {
      let x = b('box')
      let y = b('box', [b('text')])

      let p = diff(x, y)[0]
      t.equal(p.op, 'add', 'Detected a simple node addition')
      t.equal(p.path, '/children/0', 'Add path')
    },
    () => {
      let x = b('box')
      let y = b('box', {
        top: 2
      }, [b('text')])

      let d = diff(x, y)
      let p = d[0]
      let p2 = d[1]
      t.equal(p.op, 'add', 'Detected a simple node addition')
      t.equal(p.path, '/children/0', 'Add path')
      t.equal(p2.op, 'add', 'Detected a simple node addition')
      t.equal(p2.path, '/attr/top', 'Add path')
    },
    () => {
      let x = b('box', [
        b('text')
      ])
      let y = b('box', [
        b('text'),
        b('text')
      ])

      let d = diff(x, y)
      let p = d[0]
      t.equal(p.op, 'add', 'Child list tail addition')
      t.equal(p.path, '/children/1', 'Add path')
    },
    () => {
      let x = b('box', [
        b('text', 'B')
      ])
      let y = b('box', [
        b('text', 'A'),
        b('text', 'B')
      ])

      let d = diff(x, y)
      let p = d[0]
      let p2 = d[1]
      // @TODO head addition does a lot of stuff! Would be better to detect
      // a head addition and report it so the reconciler can push to the front
      // of the list without mutating all its contents
      t.equal(p.op, 'replace', 'Child list head addition requires a replace')
      t.equal(p.path, '/children/0/attr/content', 'Add path')
      t.equal(p2.op, 'add', 'Child list head addition')
      t.equal(p2.path, '/children/1', 'Add path')
    }
  ]

  tests.forEach(fn => fn())
  t.end()
})

tape('diff should handle additions and mutations', t => {
  let tests = [
    () => {
      let x = b('box', 'hello')
      let y = b('box', 'world', [b('text')])

      let d = diff(x, y)
      let p = d[0]
      let p2 = d[1]
      t.equal(p.op, 'add', 'Detected addition')
      t.equal(p.path, '/children/0', 'Add path')
      t.equal(p2.op, 'replace', 'Detected mutation')
      t.equal(p2.path, '/attr/content', 'Add path for root node')
    }
  ]

  tests.forEach(fn => fn())
  t.end()
})
