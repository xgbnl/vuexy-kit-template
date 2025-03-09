export function isPlainObject(o: object | unknown): boolean {
  if (!isObject(o)) {
    return false
  }

  if (o?.constructor === undefined) {
    return true
  }

  const prot = o?.constructor?.prototype

  if (!isObject(prot)) {
    return false
  }

  if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')) {
    return false
  }

  return true
}

function isObject(o: object | unknown): boolean {
  return Object.prototype.toString.call(o) === '[object Object]'
}
