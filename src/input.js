import { getPathValue } from './objectPath'

export default (url) => {
  // get the value from the input object
  return function input ({ input }) {
    return getPathValue(input, url.path)
  }
}
