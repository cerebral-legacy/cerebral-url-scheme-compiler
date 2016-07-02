export default (url, fn, isGetter) => {
  const stateFn = function state ({ state }, ...values) {
    if (isGetter) {
      return state[fn](url.path, ...values)
    } else {
      state[fn](url.path, ...values)
      return values.length === 1 ? values[0] : values
    }
  }
  stateFn.displayName = `state.${fn}`
  return stateFn
}
