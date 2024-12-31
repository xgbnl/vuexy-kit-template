const isObject = (o: any): boolean => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export const isPlainObject = (o: any): boolean => {
  if (!isObject(o)) {
    return false
  }

  if (o.constructor === undefined) {
    return true
  }

  if (!isObject(o.constructor.prototype)) {
    return false
  }

  return o.constructor.prototype.hasOwnProperty('isPrototypeOf')
}
