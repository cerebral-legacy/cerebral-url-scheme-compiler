import get from 'lodash/get'

export default (fragments) => {
  // get the value from the input object
  return function input (args) {
    return get(args.input, fragments.reduce((url, fragment) => url + fragment(args), ''))
  }
}
