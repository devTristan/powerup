import test from 'tape'
import powerup from '..'

test('argument errors', function (t) {
  t.throws(() => powerup(), powerup.ArgumentError, 'powerup() should throw powerup.ArgumentError')
  t.throws(() => powerup(1), powerup.ArgumentError, 'powerup(1) should throw powerup.ArgumentError')
  t.throws(() => powerup(1, 2, 3), powerup.ArgumentError, 'powerup(1, 2, 3) should throw powerup.ArgumentError')
  t.throws(() => powerup('hi'), powerup.ArgumentError, `powerup('hi') should throw powerup.ArgumentError`)
  t.throws(() => powerup('hello', 'world', 1), powerup.ArgumentError, `powerup('hello', 'world', 1) should throw powerup.ArgumentError`)
  t.throws(() => powerup({}), powerup.ArgumentError, 'powerup({}) should throw powerup.ArgumentError')

  t.doesNotThrow(() => powerup(function () {}), powerup.ArgumentError, 'powerup(function(){}) should not throw')
  t.doesNotThrow(() => powerup({}, function () {}), powerup.ArgumentError, 'powerup({}, function(){}) should not throw')
  t.doesNotThrow(() => powerup({}, {}, function () {}), powerup.ArgumentError, 'powerup({}, {}, function(){}) should not throw')
  t.doesNotThrow(() => powerup({}, {prototype: {}}, function () {}), powerup.ArgumentError, 'powerup({}, {prototype: {}}, function(){}) should not throw')
  t.doesNotThrow(() => powerup(function () {}, function () {}), powerup.ArgumentError, 'powerup(function(){}, function(){}) should not throw')
  t.end()
})
