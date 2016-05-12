/**
 * Imports
 */

var dynamicJSON = require('..')
var test = require('tape')
var sleep = require('@f/sleep')

/**
 * Tests
 */

test('should convert function to obj', (t) => {
  var obj = (props) => ({foo: props.foo})

  dynamicJSON(obj)({foo: 'bar'}).then(function (val) {
    t.deepEqual(val, {foo: 'bar'})
    t.end()
  })

})

test('should convert object with functions to plain object', (t) => {
  var obj = {
    foo: (props) => props.foo,
    bar: (props) => 'woot'
  }

  dynamicJSON(obj)({foo: 'bar'}).then(function (val) {
    t.deepEqual(val, {foo: 'bar', bar: 'woot'})
    t.notEqual(val, obj)
    t.end()
  })
})

test('should convert object with nested functions to plain object', (t) => {
  var obj = {
    foo: {
      bar: (props) => props.bar
    }
  }

  dynamicJSON(obj)({bar: 'woot'}).then(function (val) {
    t.deepEqual(val, {foo: {bar: 'woot'}})
    t.end()
  })
})

test('should resolve generators', (t) => {
  var obj = {
    foo: function * (props) {
      yield sleep(10)
      return props.foo
    }
  }

  dynamicJSON(obj)({foo: 'bar'}).then(function (val) {
    t.deepEqual(val, {foo: 'bar'})
    t.end()
  })

})
