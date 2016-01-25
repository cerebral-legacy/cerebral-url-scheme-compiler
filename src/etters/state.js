const execute = function (state, values, urlPath, fn, isGetter) {
  if (isGetter) {
    return urlPath ? state[fn](urlPath, ...values) : state[fn](...values)
  } else {
    if (urlPath) {
      state[fn](urlPath, ...values)
    } else {
      state[fn](...values)
    }
    return values.length === 1 ? values[0] : values
  }
}

export default (path, url, urlPath, fn, isGetter) => {
  if (url.host === '.') {
    // process on the current module
    return function fnLocalModuleStateValue ({ module }, ...values) {
      return execute(module.state, values, urlPath, fn, isGetter)
    }
  } else if (url.host) {
    // process on the named module
    return function fnModuleStateValue ({ modules }, ...values) {
      const module = modules[url.host]
      if (!module) {
        return console.error(`${path} : module was not found.`)
      }
      return execute(module.state, values, urlPath, fn, isGetter)
    }
  } else {
    // process on the global state
    return function fnStateValue ({ state }, ...values) {
      return execute(state, values, urlPath, fn, isGetter)
    }
  }
}
