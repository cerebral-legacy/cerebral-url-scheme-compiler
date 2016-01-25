import { getPathValue } from '../objectPath'

export default (path, url, urlPath) =>
  // get the value from the input object
  function getInputValue ({ input }) {
    return getPathValue(input, urlPath)
  }
