import isPlainObject from '../isPlainObject'
import test from 'tape'

test('isPlainObject', t => {
  t.equal(isPlainObject(Object.create({})), true)
  t.equal(isPlainObject(Object.create(Object.prototype)), true)
  t.equal(isPlainObject({foo: 'bar'}), true)
  t.equal(isPlainObject({}), true)

  function Foo () {this.abc = {}}
  t.equal(isPlainObject(/foo/), false)
  t.equal(isPlainObject(() => {}), false)
  t.equal(isPlainObject(1), false)
  t.equal(isPlainObject(['foo', 'bar']), false)
  t.equal(isPlainObject([]), false)
  t.equal(isPlainObject(new Foo()), false)
  t.equal(isPlainObject(null), false)
  t.equal(isPlainObject(Object.create(null)), false)
  t.equal(isPlainObject(Foo), false)

  t.end()
})
