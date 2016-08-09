export default (fragments, fn, isGetter) => {
  const stateFn = function state (args, ...values) {
    const path = fragments.reduce((url, fragment) => url + fragment(args), '')
    if (isGetter) {
      return args.state[fn](path, ...values)
    } else {
      args.state[fn](path, ...values)
      return values.length === 1 ? values[0] : values
    }
  }
  stateFn.displayName = `state.${fn}`
  return stateFn
}
