'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ = require('..');

var _2 = _interopRequireDefault(_);

(0, _tape2['default'])('argument overrides', function (t) {
  var modifier = (0, _2['default'])(function (next, args) {
    return next(args.concat([1]));
  }, function (a, b) {
    return a + b;
  });
  t.equal(modifier(5), 6);
  t.end();
});

(0, _tape2['default'])('return overrides', function (t) {
  var modifier = (0, _2['default'])(function (next, args) {
    return next(args) * 2;
  }, function (a, b) {
    return a + b;
  });
  t.equal(modifier(3, 4), 14);
  t.end();
});

(0, _tape2['default'])('property overrides', function (t) {
  var sum = (0, _2['default'])({
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
  t.end();
});

(0, _tape2['default'])('prototype overrides', function (t) {
  var GaveUp = (function (_Error) {
    _inherits(GaveUp, _Error);

    function GaveUp(workDone) {
      _classCallCheck(this, GaveUp);

      _get(Object.getPrototypeOf(GaveUp.prototype), 'constructor', this).call(this, 'Gave up after getting ' + workDone + ' work done');
      this.workDone = workDone;
    }

    return GaveUp;
  })(Error);

  var worker = {
    prototype: {
      workDone: 0,
      work: function work() {
        this.workDone++;
      }
    }
  };

  var quitter = function quitter(next, args) {
    try {
      return next(args);
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

  var me = (0, _2['default'])(worker, quitter, function () {
    this.work();
    this.giveUp();
    this.work();
    return this.workDone;
  });

  t.deepEqual(_Object$keys(me), [], 'should have no properties');
  var result = me();
  t.ok(result instanceof GaveUp, 'should have given up');
  t.equal(result.workDone, 1, 'should have only done one unit of work');
  t.end();
});
//# sourceMappingURL=usage.js.map