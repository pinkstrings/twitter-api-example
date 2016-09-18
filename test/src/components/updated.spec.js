import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import Updated, {formatTime} from '../../../src/components/updated'
import styles from '../../../src/components/updated.css'

const lastUpdated = new Date()

function setup(isLoading = false, time = lastUpdated) {
  return {
    wrapper: mount(
      <Updated
        isLoading={isLoading}
        time={time}
      />
    )
  }
}

describe('<Updated />', function () {
  it('Updated is <span>', function () {
    const {wrapper} = setup()
    expect(wrapper.name()).to.equal('Updated')
  })

  it(`Updated class is ${styles.updated}`, function () {
    const {wrapper} = setup()
    expect(wrapper.render().find(`.${styles.updated}`)).to.have.length(1)
  })

  describe('initial state', function () {
    it('Updated props.isLoading === false', function () {
      const {wrapper} = setup()
      return expect(wrapper.prop('isLoading')).to.be.false
    })

    it(`Updated props.time === ${new Date(lastUpdated)}`, function () {
      const {wrapper} = setup()
      return expect(wrapper.prop('time').value).to.equal(new Date(lastUpdated).value)
    })

    it(`Updated text is "Last Update: ${formatTime(new Date(lastUpdated))}"`, function () {
      const {wrapper} = setup()
      return expect(wrapper.text()).to.equal(`Last Update: ${formatTime(new Date(lastUpdated))}`)
    })
  })

  describe('loading state', function () {
    it('Updated props.isLoading === true', function () {
      const {wrapper} = setup(true)
      return expect(wrapper.prop('isLoading')).to.be.true
    })

    it(`Updated props.time === ${new Date(lastUpdated)}`, function () {
      const {wrapper} = setup(true)
      return expect(wrapper.prop('time').value).to.equal(new Date(lastUpdated).value)
    })

    it('Updated text is "Updating..."', function () {
      const {wrapper} = setup(true)
      return expect(wrapper.text()).to.equal('Updating...')
    })
  })
})
