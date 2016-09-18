import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import TweetFooter from '../../../src/components/tweet-footer'
import styles from '../../../src/components/tweet-footer.css'
import sampleTweetlist from '../../utils/sample-tweetlist'

const sampleTweet = sampleTweetlist.first()

function setup(retweetCount = null, tweetId = null) {
  return {
    wrapper: shallow(
      <TweetFooter
        retweetCount={retweetCount || sampleTweet.get('retweet_count')}
        tweedId={tweetId || sampleTweet.get('id_str')}
      />
    )
  }
}

describe('<TweetFooter />', function () {
  it('TweetFooter is <footer>', function () {
    const {wrapper} = setup()
    expect(wrapper.type()).to.equal('footer')
  })

  it(`TweetFooter class is ${styles.tweetFooter}`, function () {
    const {wrapper} = setup()
    expect(wrapper.render().find(`.${styles.tweetFooter}`)).to.have.length(1)
  })

  it('TweetFooter has 1 child node', function () {
    const {wrapper} = setup()
    expect(wrapper.children()).to.have.length(1)
  })

  it('TweetFooter nth-child(0) is <a>', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).type()).to.equal('a')
  })

  it('TweetFooter > a has 3 child nodes', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).children()).to.have.length(3)
  })

  it('TweetFooter > a nth-child(0) is <RetweetIcon />', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).childAt(0).name()).to.equal('RetweetIcon')
  })

  it('TweetFooter > a nth-child(1) is " "', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).childAt(1).text()).to.equal(' ')
  })

  it('TweetFooter > a nth-child(1) is retweet_count', function () {
    const {wrapper} = setup()
    expect(
      parseInt(wrapper.childAt(0).childAt(2).text(), 10)
    ).to.equal(sampleTweet.get('retweet_count'))
  })
})
