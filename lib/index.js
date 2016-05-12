/**
 * Modules
 */

 const isObject = require('@f/is-object')
 const isFunction = require('@f/is-function')
 const isGenerator = require('@f/is-generator')
 const map = require('@f/map')
 const toPromise = require('@f/to-promise')
 const compose = require('@f/compose')


/**
 * Expose dynamicJson
 */

module.exports = dynamicJSON

/**
 * dynamicJson
 */

function dynamicJSON (val) {
  return compose(toPromise, (props) => {
    if (isObject(val)) {
      return map((v) => dynamicJSON(v)(props), val)
    } else if (isFunction(val) || isGenerator(val)) {
      return val(props)
    } else {
      return val
    }
  })
}
