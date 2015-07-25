'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _ = require('..');

var _2 = _interopRequireDefault(_);

(0, _blueTape2['default'])('property overrides', function callee$0$0(t) {
  var sum;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        sum = (0, _2['default'])({
          params: ['...number']
        }, function () {
          for (var _len = arguments.length, numbers = Array(_len), _key = 0; _key < _len; _key++) {
            numbers[_key] = arguments[_key];
          }

          return numbers.reduce(function (a, b) {
            return a + b;
          });
        });

        t.equal(typeof sum, 'function', 'sum should be a function');
        t.deepEqual(sum.params, ['...number'], 'sum.params should be [\'...number\']');
        t.equal(sum(5), 5, 'sum(5) should be 5');
        t.equal(sum(0, 0.2, 0.03), 0.23, 'sum(0, 0.2, 0.03) should be 0.23');
        t.equal(sum(1, 2, 3), 6, 'sum(1, 2, 3) should be 6');

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

(0, _blueTape2['default'])('prototype overrides', function callee$0$0(t) {
  var GaveUp, worker, quitter, me, result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        GaveUp = (function (_Error) {
          function GaveUp(workDone) {
            _classCallCheck(this, GaveUp);

            _get(Object.getPrototypeOf(GaveUp.prototype), 'constructor', this).call(this, 'Gave up after getting ' + workDone + ' work done');
            this.workDone = workDone;
          }

          _inherits(GaveUp, _Error);

          return GaveUp;
        })(Error);

        worker = {
          prototype: {
            workDone: 0,
            work: function work() {
              this.workDone++;
            }
          }
        };

        quitter = function quitter(next) {
          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          try {
            return next.apply(undefined, args);
          } catch (err) {
            if (err instanceof GaveUp) {
              return err;
            } else {
              throw err;
            }
          }
        };

        quitter.prototype = {};
        quitter.prototype.giveUp = function () {
          throw new GaveUp(this.workDone);
        };

        me = (0, _2['default'])(worker, quitter, function () {
          this.work();
          this.giveUp();
          this.work();
          return this.workDone;
        });

        t.deepEqual(_Object$keys(me), [], 'should have no properties');
        result = me();

        t.ok(result instanceof GaveUp, 'should have given up');
        t.equal(result.workDone, 1, 'should have only done one unit of work');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});
//# sourceMappingURL=usage.js.map