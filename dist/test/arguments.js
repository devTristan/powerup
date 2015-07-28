'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ = require('..');

var _2 = _interopRequireDefault(_);

(0, _tape2['default'])('argument errors', function (t) {
  t.throws(function () {
    return (0, _2['default'])();
  }, _2['default'].ArgumentError, 'powerup() should throw powerup.ArgumentError');
  t.throws(function () {
    return (0, _2['default'])(1);
  }, _2['default'].ArgumentError, 'powerup(1) should throw powerup.ArgumentError');
  t.throws(function () {
    return (0, _2['default'])(1, 2, 3);
  }, _2['default'].ArgumentError, 'powerup(1, 2, 3) should throw powerup.ArgumentError');
  t.throws(function () {
    return (0, _2['default'])('hi');
  }, _2['default'].ArgumentError, 'powerup(\'hi\') should throw powerup.ArgumentError');
  t.throws(function () {
    return (0, _2['default'])('hello', 'world', 1);
  }, _2['default'].ArgumentError, 'powerup(\'hello\', \'world\', 1) should throw powerup.ArgumentError');
  t.throws(function () {
    return (0, _2['default'])({});
  }, _2['default'].ArgumentError, 'powerup({}) should throw powerup.ArgumentError');

  t.doesNotThrow(function () {
    return (0, _2['default'])(function () {});
  }, _2['default'].ArgumentError, 'powerup(function(){}) should not throw');
  t.doesNotThrow(function () {
    return (0, _2['default'])({}, function () {});
  }, _2['default'].ArgumentError, 'powerup({}, function(){}) should not throw');
  t.doesNotThrow(function () {
    return (0, _2['default'])({}, {}, function () {});
  }, _2['default'].ArgumentError, 'powerup({}, {}, function(){}) should not throw');
  t.doesNotThrow(function () {
    return (0, _2['default'])({}, { prototype: {} }, function () {});
  }, _2['default'].ArgumentError, 'powerup({}, {prototype: {}}, function(){}) should not throw');
  t.doesNotThrow(function () {
    return (0, _2['default'])(function () {}, function () {});
  }, _2['default'].ArgumentError, 'powerup(function(){}, function(){}) should not throw');
  t.end();
});
//# sourceMappingURL=arguments.js.map