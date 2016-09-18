import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import RetweetIcon from '../../../src/components/retweet-icon'

describe('<RetweetIcon />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<RetweetIcon />)
  })

  it('RetweetIcon has 1 child node', function () {
    expect(wrapper.children()).to.have.length(1)
  })

  it('RetweetIcon is <svg>', function () {
    expect(wrapper.type()).to.equal('svg')
  })

  it('RetweetIcon nth-child(0) is <path>', function () {
    expect(wrapper.childAt(0).type()).to.equal('path')
  })
})
