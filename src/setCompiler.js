import { setPathValue } from './objectPath'
import parseUrl from './parseUrl'

export default function compile (path) {
  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      const urlPath = (url.path || '').split('.')
      if (url.scheme === 'output') {
        // add the value to the input object and pass it to output
        return function setOutputValue ({ input, output }, value) {
          const outputValue = (typeof value.toJS === 'function')
            ? value.toJS()
            : (value && value.constructor === Object && Object.isFrozen(value))
              ? JSON.parse(JSON.stringify(value))
              : value
          setPathValue(input, urlPath, outputValue)
          output(input)
          return value
        }
      } else if (url.scheme === 'state') {
        if (url.host === '.') {
          // set the value on the current module
          return function setLocalModuleStateValue ({ module }, value) {
            module.state.set(urlPath, value)
            return value
          }
        } else if (url.host) {
          // set the value on the named module
          return function setModuleStateValue ({ modules }, value) {
            const module = modules[url.host]
            if (!module) {
              return console.error(`${path} : module was not found.`)
            }
            module.state.set(urlPath, value)
            return value
          }
        } else {
          // set the value on the global state
          return function setStateValue ({ state }, value) {
            state.set(urlPath, value)
            return value
          }
        }
      } else {
        return console.error(`${path} : scheme is not supported, expect "output" or "state".`)
      }
    }
  } else if (typeof path === 'function') {
    return path
  }
  // non-strings and non-urls (probably an array) are passed through to state.get
  return function set ({ state }, value) {
    state.set(path, value)
    return value
  }
}
