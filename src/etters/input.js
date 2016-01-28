import { getPathValue } from '../objectPath'

export default (path, url, urlPath) => {
  // get the value from the input object
  return function input ({ input }) {
    return urlPath ? getPathValue(input, urlPath) : input
  }
}
