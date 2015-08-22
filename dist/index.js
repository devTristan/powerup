'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = create;

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function next(context, calls, index, args) {
  var item = calls[index];
  if (index === calls.length - 1) {
    return item.call.apply(item, [context].concat(_toConsumableArray(args)));
  } else {
    return item.call(context, next.bind(null, context, calls, index + 1), args);
  }
}

var ArgumentError = (function (_Error) {
  _inherits(ArgumentError, _Error);

  function ArgumentError() {
    _classCallCheck(this, ArgumentError);

    _get(Object.getPrototypeOf(ArgumentError.prototype), 'constructor', this).apply(this, arguments);
  }

  return ArgumentError;
})(Error);

exports.ArgumentError = ArgumentError;

function create() {
  for (var _len = arguments.length, powerups = Array(_len), _key = 0; _key < _len; _key++) {
    powerups[_key] = arguments[_key];
  }

  if (powerups.length === 0) {
    throw new ArgumentError('you must provide at least one argument');
  }

  var calls = [];
  var prototype = {};

  var runner = function runner() {
    var context = _Object$assign({ runner: runner }, prototype);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return next(context, calls, 0, args);
  };

  powerups.forEach(function (powerup, i) {
    if (i === 0 && typeof powerup === 'string') {
      powerup = { displayName: powerup };
    }

    var type = typeof powerup;
    var isObject = (0, _isPlainObject2['default'])(powerup);

    if (i === powerups.length - 1) {
      if (type !== 'function') {
        throw new ArgumentError('last argument must be a function');
      }
    } else if (i === 0) {
      if (type !== 'function' && !isObject && type !== 'string') {
        throw new ArgumentError('argument ' + i + ' must be a function, string, or plain object');
      }
    } else {
      if (type !== 'function' && !isObject) {
        throw new ArgumentError('argument ' + i + ' must be a function or a plain object');
      }
    }

    if (type === 'string') {
      powerup = { displayName: powerup };
      type = 'object';
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