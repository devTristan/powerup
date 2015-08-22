'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isPlainObject = function isPlainObject(o) {
  return o != null && typeof o === 'object' && !Array.isArray(o) && Object.prototype.toString.call(o) === '[object Object]' && typeof o.constructor === 'function' && Object.prototype.toString.call(o.constructor.prototype) === '[object Object]' && o.constructor.prototype.hasOwnProperty('isPrototypeOf');
};

exports['default'] = isPlainObject;
module.exports = exports['default'];
//# sourceMappingURL=isPlainObject.js.map