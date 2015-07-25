'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _ = require('..');

var _2 = _interopRequireDefault(_);

(0, _blueTape2['default'])('argument errors', function callee$0$0(t) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
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

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});
//# sourceMappingURL=arguments.js.map