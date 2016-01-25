import compiler from './compiler'

export default function compile (path, fn = 'set') {
  return compiler(path, fn, false)
}
