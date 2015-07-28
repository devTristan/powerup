import assert from 'assert'

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
  assert.notEqual(powerups.length, 0, 'you must provide at least one argument')

  let calls = []
  let prototype = {}

  let runner = function (...args) {
    let context = Object.assign({}, prototype)
    return next(context, calls, 0, args)
  }

  powerups.forEach((powerup, i) => {
    let type = typeof powerup

    if (i === powerups.length - 1) {
      if (type !== 'function') {
        throw new ArgumentError('last argument must be a function')
      }
    } else {
      if (type !== 'function' && type !== 'object') {
        throw new ArgumentError(`argument ${i} must be a function or an object`)
      }
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
