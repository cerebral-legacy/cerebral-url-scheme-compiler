import set from 'lodash/set'

export default (fragments) => {
  // add the value to the input object and pass it to output
  return function output (args, value) {
    const outputValue = (value && typeof value.toJS === 'function')
      ? value.toJS()
      : (value && value.constructor === Object && Object.isFrozen(value))
        ? JSON.parse(JSON.stringify(value))
        : value
    set(args.input, fragments.reduce((url, fragment) => url + fragment(args), ''), outputValue)
    args.output(args.input)
    return value
  }
}
