import isPlainObject from './isPlainObject'

function next (context, calls, index, args) {
  let item = calls[index]
  if (index === calls.length - 1) {
    return item.call(context, ...args)
  } else {
    return item.call(context, next.bind(null, context, calls, index + 1), args)
  }
}

export class ArgumentError extends Error {}

export default function create (...powerups) {
  if (powerups.length === 0) {
    throw new ArgumentError('you must provide at least one argument')
  }

  let calls = []
  let prototype = {}

  let runner = function (...args) {
    let context = Object.assign({runner: runner}, prototype)
    return next(context, calls, 0, args)
  }

  powerups.forEach((powerup, i) => {
    if (i === 0 && typeof powerup === 'string') {
      powerup = {displayName: powerup}
    }

    let type = typeof powerup
    let isObject = isPlainObject(powerup)

    if (i === powerups.length - 1) {
      if (type !== 'function') {
        throw new ArgumentError('last argument must be a function')
      }
    } else if (i === 0) {
      if (type !== 'function' && !isObject && type !== 'string') {
        throw new ArgumentError(`argument ${i} must be a function, string, or plain object`)
      }
    } else {
      if (type !== 'function' && !isObject) {
        throw new ArgumentError(`argument ${i} must be a function or a plain object`)
      }
    }

    if (type === 'string') {
      powerup = {displayName: powerup}
      type = 'object'
    }

    if (type === 'function') {
      calls.push(powerup)
    }

    if (typeof powerup.prototype === 'object') {
      Object.assign(prototype, powerup.prototype)
    }

    Object.keys(powerup)
      .filter(key => key !== 'prototype')
      .forEach(key => runner[key] = powerup[key])
  })

  return runner
}
