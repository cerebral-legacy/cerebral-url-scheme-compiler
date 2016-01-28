import input from './etters/input'
import output from './etters/output'
import state from './etters/state'
import parseUrl from './parseUrl'

export default function compile (path, fn, isGetter) {
  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      const urlPath = url.path && url.path.split('.')
      if (url.scheme === 'input' && fn === 'get') {
        return input(path, url, urlPath)
      } else if (url.scheme === 'output' && fn === 'set') {
        return output(path, url, urlPath)
      } else if (url.scheme === 'state') {
        return state(path, url, urlPath, fn, isGetter)
      } else {
        return console.error(`${path} : not supported by input, output or state.${fn}`)
      }
    }
  } else if (typeof path === 'function') {
    // for functions simply return them
    return path
  }
  // other values (probably an array or non-url string) are passed through to state.fn
  const stateFn = function state ({ state }, ...values) {
    if (isGetter) {
      return path ? state[fn](path, ...values) : state[fn](...values)
    } else {
      if (path) {
        state[fn](path, ...values)
      } else {
        state[fn](...values)
      }
      return values.length === 1 ? values[0] : values
    }
  }
  stateFn.displayName = `state.${fn}`
  return stateFn
}
