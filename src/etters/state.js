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
  if (url.host) {
    // process on the named module
    const moduleFn = function moduleState ({ modules, state }, ...values) {
      const module = modules[url.host]
      if (!module) {
        return console.error(`${path} : module was not found.`)
      }
      return execute(state, values, [...module.path, ...urlPath], fn, isGetter)
    }
    moduleFn.displayName = `module.state.${fn}`
    return moduleFn
  } else {
    // process on the global state
    const stateFn = function state ({ state }, ...values) {
      return execute(state, values, urlPath, fn, isGetter)
    }
    stateFn.displayName = `state.${fn}`
    return stateFn
  }
}
