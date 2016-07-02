import get from 'lodash/get'

export default (url) => {
  // get the value from the input object
  return function input ({ input }) {
    return get(input, url.path)
  }
}
