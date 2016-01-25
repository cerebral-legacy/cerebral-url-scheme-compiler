import input from './getters/input'
import state from './getters/state'
import parseUrl from './parseUrl'

export default function compile (path, fn = 'get') {
  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      const urlPath = (url.path || '').split('.')
      if (url.scheme === 'input' && fn === 'get') {
        return input(path, url, urlPath)
      } else if (url.scheme === 'state') {
        return state(path, url, urlPath, fn)
      } else {
        return console.error(`${path} : not supported by state.{fn}().`)
      }
    }
  } else if (typeof path === 'function') {
    // for functions simply return them
    return path
  }
  // other values (probably an array or non-url string) are passed through to state.fn
  return function fnState ({ state }) {
    return state[fn](path)
  }
}
