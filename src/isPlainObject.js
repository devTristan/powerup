let isPlainObject = o => (
  o != null &&
  typeof o === 'object' &&
  !Array.isArray(o) &&
  Object.prototype.toString.call(o) === '[object Object]' &&
  typeof o.constructor === 'function' &&
  Object.prototype.toString.call(o.constructor.prototype) === '[object Object]' &&
  o.constructor.prototype.hasOwnProperty('isPrototypeOf')
)

export default isPlainObject
