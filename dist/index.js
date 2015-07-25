'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = create;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function next(context, calls, index) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var item = calls[index];
  if (index === calls.length - 1) {
    return item.call.apply(item, [context].concat(args));
  } else {
    return item.call.apply(item, [context, next.bind(null, context, calls, index + 1)].concat(args));
  }
}

var ArgumentError = (function (_Error) {
  function ArgumentError() {
    _classCallCheck(this, ArgumentError);

    if (_Error != null) {
      _Error.apply(this, arguments);
    }
  }

  _inherits(ArgumentError, _Error);

  return ArgumentError;
})(Error);

exports.ArgumentError = ArgumentError;

function create() {
  for (var _len2 = arguments.length, powerups = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    powerups[_key2] = arguments[_key2];
  }

  _assert2['default'].notEqual(powerups.length, 0, 'you must provide at least one argument');

  var calls = [];
  var prototype = {};

  var runner = function runner() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var context = _Object$assign({}, prototype);
    return next.apply(undefined, [context, calls, 0].concat(args));
  };

  powerups.forEach(function (powerup, i) {
    var type = typeof powerup;

    if (i === powerups.length - 1) {
      if (type !== 'function') {
        throw new ArgumentError('last argument must be a function');
      }
    } else {
      if (type !== 'function' && type !== 'object') {
        throw new ArgumentError('argument ' + i + ' must be a function or an object');
      }
    }

    if (type === 'function') {
      calls.push(powerup);
    }

    if (typeof powerup.prototype === 'object') {
      _Object$assign(prototype, powerup.prototype);
    }

    _Object$keys(powerup).filter(function (key) {
      return key !== 'prototype';
    }).forEach(function (key) {
      return runner[key] = powerup[key];
    });
  });

  return runner;
}
//# sourceMappingURL=index.js.map