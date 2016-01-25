import compiler from './compiler'

export default function compile (path, fn = 'get') {
  return compiler(path, fn, true)
}
