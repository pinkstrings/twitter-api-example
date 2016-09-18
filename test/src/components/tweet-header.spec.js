import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import TweetHeader from '../../../src/components/tweet-header'
import styles from '../../../src/components/tweet-header.css'
import sampleTweetlist from '../../utils/sample-tweetlist'

const sampleTweet = sampleTweetlist.first()

function setup(retweetCount = null, tweetId = null) {
  const {profile_image_url, name, screen_name} = sampleTweet.get('user')

  return {
    wrapper: shallow(
      <TweetHeader
        name={name}
        profileImgUrl={profile_image_url} // eslint-disable-line camelcase
        screenName={screen_name} // eslint-disable-line camelcase
      />
    )
  }
}

describe('<TweetHeader />', function () {
  it('TweetHeader is <header>', function () {
    const {wrapper} = setup()
    expect(wrapper.type()).to.equal('header')
  })

  it(`TweetHeader class is ${styles.tweetHeader}`, function () {
    const {wrapper} = setup()
    expect(wrapper.render().find(`.${styles.tweetHeader}`)).to.have.length(1)
  })

  it('TweetHeader has 2 child nodes', function () {
    const {wrapper} = setup()
    expect(wrapper.children()).to.have.length(2)
  })

  it('TweetHeader nth-child(0) is <div>', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).type()).to.equal('div')
  })

  it(`TweetHeader > div:nth-child(0) class is ${styles.imgContainer}`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).render().find(`.${styles.imgContainer}`)).to.have.length(1)
  })

  it(`TweetHeader > div.${styles.imgContainer} has 1 child node`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).children()).to.have.length(1)
  })

  it(`TweetHeader > div.${styles.imgContainer} > nth-child(0) is <img>`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).childAt(0).type()).to.equal('img')
  })

  it(`TweetHeader > div.${styles.imgContainer} > img props.alt === name`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).childAt(0).prop('alt')).to.equal(sampleTweet.get('user').name)
  })

  it(`TweetHeader > div.${styles.imgContainer} > img props.src === profile_image_url`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).childAt(0).prop('src')).to.equal(sampleTweet.get('user').profile_image_url)
  })

  it('TweetHeader > div:nth-child(1) is <div>', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).type()).to.equal('div')
  })

  it(`TweetHeader > div:nth-child(1) class is ${styles.metaContainer}`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).render().find(`.${styles.metaContainer}`)).to.have.length(1)
  })

  it(`TweetHeader > div:${styles.metaContainer} has 2 child nodes`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).children()).to.have.length(2)
  })

  it(`TweetHeader > div:${styles.metaContainer} nth-child(0) is <h2>`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).childAt(0).type()).to.equal('h2')
  })

  it(`TweetHeader > div:${styles.metaContainer} > h2 text is name`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).childAt(0).text()).to.equal(sampleTweet.get('user').name)
  })

  it(`TweetHeader > div:${styles.metaContainer} nth-child(1) is <h3>`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).childAt(1).type()).to.equal('h3')
  })

  it(`TweetHeader > div:${styles.metaContainer} > h3 text is screen_name`, function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).childAt(1).text()).to.equal(`@${sampleTweet.get('user').screen_name}`)
  })
})
