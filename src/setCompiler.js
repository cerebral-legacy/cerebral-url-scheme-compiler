import output from './setters/output'
import state from './setters/state'
import parseUrl from './parseUrl'

export default function compile (path, fn = 'set') {
  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      const urlPath = (url.path || '').split('.')
      if (url.scheme === 'output') {
        return output(path, url, urlPath)
      } else if (url.scheme === 'state') {
        return state(path, url, urlPath, fn)
      } else {
        return console.error(`${path} : scheme is not supported, expect "output" or "state".`)
      }
    }
  } else if (typeof path === 'function') {
    // for functions simply return them
    return path
  }
  // other values (probably an array or non-url string) are passed through to state.fn
  return function fnState ({ state }, value) {
    state[fn](path, value)
    return value
  }
}
