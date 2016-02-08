/*global beforeEach,afterEach,describe,it*/
import compile from '../src/setCompiler'
import { reset, check, expect, expectCount } from './helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('setValue', function () {
  it('should set a value on output', function () {
    expectCount(2)

    const setValue = compile('output:/some.key')

    expect(setValue.name).to.equal('output')

    setValue({
      input: {
        passing: 'through'
      },
      output (value) {
        expect(value).to.eql({
          passing: 'through',
          some: {
            key: 'value'
          }
        })
      }
    }, 'value')
  })

  it('should set a value on state when given an array', function () {
    expectCount(3)

    const setValue = compile(['state', 'key'])

    expect(setValue.displayName).to.equal('state.set')

    setValue({
      state: {
        set (path, value) {
          expect(path).to.eql(['state', 'key'])
          expect(value).to.equal('value')
        }
      }
    }, 'value')
  })

  it('should set a value on state when given a url', function () {
    expectCount(3)

    const setValue = compile('state:/state.key')

    expect(setValue.displayName).to.equal('state.set')

    setValue({
      state: {
        set (path, value) {
          expect(path).to.eql(['state', 'key'])
          expect(value).to.equal('value')
        }
      }
    }, 'value')
  })

  it('should set a value on module state', function () {
    expectCount(3)

    const setValue = compile('state://module/state.key')

    expect(setValue.displayName).to.equal('module.state.set')

    setValue({
      modules: {
        module: {
          path: ['module']
        }
      },
      state: {
        set (path, value) {
          expect(path).to.eql(['module', 'state', 'key'])
          expect(value).to.equal('value')
        }
      }
    }, 'value')
  })

  it('should set a value on current module state', function () {
    expectCount(3)

    const setValue = compile('state://./state.key')

    expect(setValue.displayName).to.equal('module.state.set')

    setValue({
      module: {
        state: {
          set (path, value) {
            expect(path).to.eql(['state', 'key'])
            expect(value).to.equal('value')
          }
        }
      }
    }, 'value')
  })
})
