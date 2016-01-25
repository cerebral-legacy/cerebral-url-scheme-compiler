export default (path, url, urlPath, fn) => {
  if (url.host === '.') {
    // get the value from the current module
    return function fnLocalModuleStateValue ({ module }) {
      return urlPath ? module.state[fn](urlPath) : module.state[fn]()
    }
  } else if (url.host) {
    // get the value from the named module
    return function fnModuleStateValue ({ modules }) {
      const module = modules[url.host]
      if (!module) {
        return console.error(`${path} : module was not found.`)
      }
      return urlPath ? module.state[fn](urlPath) : module.state[fn]()
    }
  } else {
    // get the value from the global state
    return function fnStateValue ({ state }) {
      return urlPath ? state[fn](urlPath) : state[fn]()
    }
  }
}
