import input from './input'
import output from './output'
import state from './state'
import parseUrl from './parseUrl'

export default function compile (path, fn, isGetter) {
  const urlToFn = (url, urlFn, urlIsGetter) => {
    const fragments = url.fragments.map((fragment) => {
      if (typeof fragment === 'string') {
        return () => fragment
      } else {
        return urlToFn(fragment, 'get', true)
      }
    })
    if (url.scheme === 'input' && urlFn === 'get') {
      return input(fragments)
    } else if (url.scheme === 'output' && urlFn === 'set') {
      return output(fragments)
    } else if (url.scheme === 'state') {
      return state(fragments, urlFn, urlIsGetter)
    } else {
      return console.error(`${path} : not supported by input, output or state.${urlFn}`)
    }
  }

  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      return urlToFn(url, fn, isGetter)
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
