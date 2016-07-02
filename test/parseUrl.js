/*global describe,it*/
import { expect } from 'chai'
import parseUrl from '../src/parseUrl'

describe('parseUrl', function () {
  it('should parse a url without host', function () {
    const url = parseUrl('state:module.state.path')
    expect(url.scheme).to.equal('state')
    expect(url.path).to.equal('module.state.path')
  })

  it('should not parse a url without scheme', function () {
    expect(parseUrl(':')).to.be.null
    expect(parseUrl('')).to.be.null
    expect(parseUrl('state')).to.be.null
  })

  it('should not parse other state access types as urls', function () {
    expect(parseUrl('state.path')).to.be.null
    expect(parseUrl(['state', 'path'])).to.be.null
  })
})
