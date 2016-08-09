/*global describe,it*/
import { expect } from 'chai'
import parseUrl from '../src/parseUrl'

describe('parseUrl', function () {
  it('should parse a url', function () {
    const url = parseUrl('state:module.state.path')
    expect(url.scheme).to.equal('state')
    expect(url.fragments[0]).to.equal('module.state.path')
  })

  it('should parse a simple template url', function () {
    const url = parseUrl('state:{{input:id}}')
    expect(url.scheme).to.equal('state')
    expect(url.fragments).to.eql([
      {
        scheme: 'input',
        fragments: ['id']
      }
    ])
  })

  it('should parse a complex template url', function () {
    const url = parseUrl('state:root.{{input:parent.key}}.{{state:child.key}}.path')
    expect(url.scheme).to.equal('state')
    expect(url.fragments).to.eql([
      'root.',
      {
        scheme: 'input',
        fragments: ['parent.key']
      },
      '.',
      {
        scheme: 'state',
        fragments: ['child.key']
      },
      '.path'
    ])
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
