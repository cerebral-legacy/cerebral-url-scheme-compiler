export function getPathValue (obj, path) {
  let value
  if (obj && path) {
    if (typeof path === 'string' && path.indexOf('.') !== -1) {
      value = obj
      const keys = path.split('.')
      keys.forEach((key) => {
        if (value) {
          value = value[key]
        }
      })
    } else {
      value = obj[path]
    }
  }
  return value
}

export function setPathValue (obj, path, value) {
  if (obj && path) {
    if (typeof path === 'string' && path.indexOf('.') !== -1) {
      let node = obj
      const keys = path.split('.')
      keys.forEach((key, index) => {
        node = node[key] = index + 1 < keys.length ? node[key] || {} : value
      })
    } else {
      obj[path] = value
    }
  }
}
