export default (path, url, urlPath, fn) => {
  if (url.host === '.') {
    // set the value on the current module
    return function fnLocalModuleStateValue ({ module }, value) {
      if (urlPath) {
        module.state[fn](urlPath, value)
      } else {
        module.state[fn](value)
      }
      return value
    }
  } else if (url.host) {
    // set the value on the named module
    return function fnModuleStateValue ({ modules }, value) {
      const module = modules[url.host]
      if (!module) {
        return console.error(`${path} : module was not found.`)
      }
      if (urlPath) {
        module.state[fn](urlPath, value)
      } else {
        module.state[fn](value)
      }
      return value
    }
  } else {
    // set the value on the global state
    return function fnStateValue ({ state }, value) {
      if (urlPath) {
        state[fn](urlPath, value)
      } else {
        state[fn](value)
      }
      return value
    }
  }
}
