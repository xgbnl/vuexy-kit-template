/**
 * Determine whether the given objects are equal.
 * @param args object
 * @returns boolean
 */
export default function deepCompare(...args: any[]): boolean {
  let i: number, l: number, leftChain: any[], rightChain: any[]

  function compare2Objects(x: any, y: any): boolean {
    let p: string

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString()
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false
    }

    if (Object.prototype.isPrototypeOf.call(x, y) || Object.prototype.isPrototypeOf.call(y, x)) {
      return false
    }

    if (x.constructor !== y.constructor) {
      return false
    }

    if (x.prototype !== y.prototype) {
      return false
    }

    // Check for infinite linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false
    }

    // Quick checking of one object being a subset of another.
    for (p in y) {
      if (Object.prototype.hasOwnProperty.call(y, p) !== Object.prototype.hasOwnProperty.call(x, p)) {
        return false
      } else if (typeof y[p] !== typeof x[p]) {
        return false
      }
    }

    for (p in x) {
      if (Object.prototype.hasOwnProperty.call(y, p) !== Object.prototype.hasOwnProperty.call(x, p)) {
        return false
      } else if (typeof y[p] !== typeof x[p]) {
        return false
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x)
          rightChain.push(y)

          if (!compare2Objects(x[p], y[p])) {
            return false
          }

          leftChain.pop()
          rightChain.pop()
          break

        default:
          if (x[p] !== y[p]) {
            return false
          }

          break
      }
    }

    return true
  }

  if (args.length < 1) {
    return true // Handle case with no arguments
  }

  for (i = 1, l = args.length; i < l; i++) {
    leftChain = [] // This can be cached for performance
    rightChain = []

    if (!compare2Objects(args[0], args[i])) {
      return false
    }
  }

  return true
}
