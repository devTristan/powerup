# powerup
a lightweight tool for extending javascript functions

[![travis](https://img.shields.io/travis/devTristan/powerup.svg?style=flat)](https://travis-ci.org/devTristan/powerup)
[![npm](https://img.shields.io/npm/v/powerup.svg?style=flat)](https://npmjs.org/package/powerup)

[![standard](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Simple extensions for better functions

* type checking
* caching and locking
* resource cleanup
* **anything** you can think of!

## Install

To install powerup for use in node or the browser, run:

```console
npm install powerup
```

## Get powerups

- [put your module here](https://github.com/devTristan/powerup/edit/master/README.md)

## Make your own

Lets make a simple function.

```javascript
function add (a, b) {
  return a + b
}
```

These work fine, but what if somebody passes in a string?

```javascript
> add(5, '6')
'56'
```

Uh oh, we made a bug. This is why type checking can be really useful. Lets implement it as a powerup.

```javascript
var powerup = require('powerup')
var assert = require('assert')

function argumentTypes (...types) {
  // return a powerup, which is basically just a cool function
  return function (next, ...args) {
    // limit the number of arguments to the number of types specified
    assert.equal(types.length, args.length)

    types.forEach(function (type, i) {
      // validate the typeof each argument
      assert.ok(typeof args[i], type)
    })

    // if everything is valid, return the result of the next function
    return next(...args)
  }
}

var add = powerup(
  argumentTypes('number', 'number'), // two arguments, both numbers
  function (a, b) {
    return a + b
  }
)
```

Okay, what just happened? We made the argumentTypes function, which returns a powerup. A powerup is a function that will be called with a `next` function as the first argument, followed by any arguments passed to `add`.

So if you do `add(1, 2)` it will be called with `(next, 1, 2)`. First we check that all arguments are the correct type, and if so, we call `next` with all of the now validated args. So now if you call `add('1', '2')` it will throw an exception instead of returning an invalid answer. Awesome.
