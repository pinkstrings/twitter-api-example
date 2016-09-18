import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import SearchField from '../../../src/components/search-field'
import styles from '../../../src/components/search-field.css'

const defaultValue = 'some-value'

function setup(value = defaultValue) {
  return {
    wrapper: shallow(
      <SearchField
        onChange={(event) => { event.preventDefault() }}
        value={value}
      />
    )
  }
}

describe('<SearchField />', function () {
  it('SearchField is <input>', function () {
    const {wrapper} = setup()
    expect(wrapper.type()).to.equal('input')
  })

  it(`SearchField class is ${styles.searchField}`, function () {
    const {wrapper} = setup()
    expect(wrapper.render().find(`.${styles.searchField}`)).to.have.length(1)
  })

  it('SearchField has no child nodes', function () {
    const {wrapper} = setup()
    expect(wrapper.children()).to.have.length(0)
  })

  it(`SearchField has correct text() when props.value = "${defaultValue}"`, function () {
    const {wrapper} = setup()
    return expect(wrapper.html().includes(defaultValue)).to.be.true
  })

  it('SearchField has correct text() when props.value = "foo"', function () {
    const {wrapper} = setup('foo')
    return expect(wrapper.html().includes('foo')).to.be.true
  })
})
