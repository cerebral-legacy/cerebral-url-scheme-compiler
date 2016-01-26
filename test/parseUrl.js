/*global describe,it*/
import { expect } from 'chai'
import parseUrl from '../src/parseUrl'

describe('parseUrl', function () {
  it('should parse scheme, host and path', function () {
    const url = parseUrl('state://module/module.state.path')
    expect(url.scheme).to.equal('state')
    expect(url.host).to.equal('module')
    expect(url.path).to.equal('module.state.path')
  })

  it('should parse a url without host', function () {
    const url = parseUrl('state:/module.state.path')
    expect(url.scheme).to.equal('state')
    expect(url.host).to.be.undefind
    expect(url.path).to.equal('module.state.path')
  })

  it('should parse a url without path', function () {
    const url = parseUrl('state://module/')
    expect(url.scheme).to.equal('state')
    expect(url.host).to.equal('module')
    expect(url.path).to.be.undefined
  })

  it('should parse a url without host or path', function () {
    const url = parseUrl('state:/')
    expect(url.scheme).to.equal('state')
    expect(url.host).to.be.undefined
    expect(url.path).to.be.undefined
  })

  it('should not parse a url without scheme', function () {
    expect(parseUrl(':/')).to.be.null
    expect(parseUrl('/')).to.be.null
    expect(parseUrl('state/')).to.be.null
  })

  it('should not parse other state access types as urls', function () {
    expect(parseUrl('state.path')).to.be.null
    expect(parseUrl(['state', 'path'])).to.be.null
  })
})
