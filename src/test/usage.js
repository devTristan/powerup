import test from 'blue-tape'
import powerup from '..'

test('property overrides', async function (t) {
  let sum = powerup({
    params: ['...number']
  }, (...numbers) => numbers.reduce((a, b) => a + b))

  t.equal(typeof sum, 'function', 'sum should be a function')
  t.deepEqual(sum.params, ['...number'], `sum.params should be ['...number']`)
  t.equal(sum(5), 5, 'sum(5) should be 5')
  t.equal(sum(0, 0.2, 0.03), 0.23, 'sum(0, 0.2, 0.03) should be 0.23')
  t.equal(sum(1, 2, 3), 6, 'sum(1, 2, 3) should be 6')
})

test('prototype overrides', async function (t) {
  class GaveUp extends Error {
    constructor (workDone) {
      super(`Gave up after getting ${workDone} work done`)
      this.workDone = workDone
    }
  }

  let worker = {
    prototype: {
      workDone: 0,
      work: function () {
        this.workDone++
      }
    }
  }

  let quitter = function (next, ...args) {
    try {
      return next(...args)
    } catch (err) {
      if (err instanceof GaveUp) {
        return err
      } else {
        throw err
      }
    }
  }
  quitter.prototype = {}
  quitter.prototype.giveUp = function () {
    throw new GaveUp(this.workDone)
  }

  let me = powerup(worker, quitter, function () {
    this.work()
    this.giveUp()
    this.work()
    return this.workDone
  })

  t.deepEqual(Object.keys(me), [], 'should have no properties')
  let result = me()
  t.ok(result instanceof GaveUp, 'should have given up')
  t.equal(result.workDone, 1, 'should have only done one unit of work')
})
