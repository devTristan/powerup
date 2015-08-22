'use strict';

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _isPlainObject = require('../isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

(0, _tape2['default'])('isPlainObject', function (t) {
  t.equal((0, _isPlainObject2['default'])(_Object$create({})), true);
  t.equal((0, _isPlainObject2['default'])(_Object$create(Object.prototype)), true);
  t.equal((0, _isPlainObject2['default'])({ foo: 'bar' }), true);
  t.equal((0, _isPlainObject2['default'])({}), true);

  function Foo() {
    this.abc = {};
  }
  t.equal((0, _isPlainObject2['default'])(/foo/), false);
  t.equal((0, _isPlainObject2['default'])(function () {}), false);
  t.equal((0, _isPlainObject2['default'])(1), false);
  t.equal((0, _isPlainObject2['default'])(['foo', 'bar']), false);
  t.equal((0, _isPlainObject2['default'])([]), false);
  t.equal((0, _isPlainObject2['default'])(new Foo()), false);
  t.equal((0, _isPlainObject2['default'])(null), false);
  t.equal((0, _isPlainObject2['default'])(_Object$create(null)), false);
  t.equal((0, _isPlainObject2['default'])(Foo), false);

  t.end();
});
//# sourceMappingURL=isPlainObject.js.map