/*global beforeEach,afterEach,describe,it*/
import compile from '../src/getCompiler'
import { reset, check, expect, expectCount } from './helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('getValue', function () {
  it('should get a value from input', function () {
    expectCount(2)

    const getValue = compile('input:some.key')

    expect(getValue.name).to.equal('input')

    const value = getValue({
      input: {
        some: {
          key: 'inputValue'
        }
      }
    })

    expect(value).to.equal('inputValue')
  })

  it('should get a value from state when given a url', function () {
    expectCount(3)

    const getValue = compile('state:state.key')

    expect(getValue.displayName).to.equal('state.get')

    const value = getValue({
      state: {
        get (path) {
          expect(path).to.equal('state.key')
          return 'stateValue'
        }
      }
    })

    expect(value).to.equal('stateValue')
  })
})
