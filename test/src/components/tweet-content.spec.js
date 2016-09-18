import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import TweetContent, {parseTweetText} from '../../../src/components/tweet-content'
import styles from '../../../src/components/tweet-content.css'
import sampleTweetlist from '../../utils/sample-tweetlist'

const sampleTweet = sampleTweetlist.first()

function setup(entities = null, text = null) {
  return {
    wrapper: shallow(
      <TweetContent
        entities={entities || sampleTweet.get('entities')}
        text={text || sampleTweet.get('text')}
      />
    )
  }
}

describe('<TweetContent />', function () {
  it('TweetContent is <div>', function () {
    const {wrapper} = setup()
    expect(wrapper.type()).to.equal('div')
  })

  it(`TweetContent class is ${styles.tweetContent}`, function () {
    const {wrapper} = setup()
    expect(wrapper.render().find(`.${styles.tweetContent}`)).to.have.length(1)
  })

  it('TweetContent html rendered correctly', function () {
    sampleTweetlist.forEach((tweet) => {
      const {wrapper} = setup(tweet.get('entities'), tweet.get('text'))

      const text = parseTweetText({
        entities: tweet.get('entities'),
        text: tweet.get('text')
      })

      expect(wrapper.html()).to.equal(`<div class="${styles.tweetContent}">${text}</div>`)
    })
  })
})
