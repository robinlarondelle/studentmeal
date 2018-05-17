
const patch = require('fast-json-patch')

/**
 * Turns json patch pretty much handles it so long as the tree generator
 * does not circularise by adding parents at that step.
 * @TODO check perf. We can't bail on subtrees as attr could differ, not
 * all attributes will be passed from parent to child, so work out some
 * additional places to _cheat_ if perf becomes an issue.
 */
module.exports = function (prev, next) {
  return patch.compare(prev, next)
}
