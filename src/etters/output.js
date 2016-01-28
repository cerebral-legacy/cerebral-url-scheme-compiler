import { setPathValue } from '../objectPath'

export default (path, url, urlPath) => {
  // add the value to the input object and pass it to output
  return function output ({ input, output }, value) {
    const outputValue = (value && typeof value.toJS === 'function')
      ? value.toJS()
      : (value && value.constructor === Object && Object.isFrozen(value))
        ? JSON.parse(JSON.stringify(value))
        : value
    if (urlPath) {
      setPathValue(input, urlPath, outputValue)
      output(input)
    } else {
      output(outputValue)
    }
    return value
  }
}
