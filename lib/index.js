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
 * Expose lambdaJson
 */

module.exports = lambdaJSON

/**
 * lambdaJson
 */

function lambdaJSON (val) {
  return compose(toPromise, (props) => {
    if (isObject(val)) {
      return map((v) => lambdaJSON(v)(props), val)
    } else if (isFunction(val) || isGenerator(val)) {
      return val(props)
    } else {
      return val
    }
  })
}
