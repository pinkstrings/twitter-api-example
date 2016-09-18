import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import {Map} from 'immutable'
import Tweet from '../../../src/components/tweet'
import styles from '../../../src/components/tweet.css'
import sampleTweet from '../../utils/sample-tweet'

function setup() {
  return {
    wrapper: mount(
      <Tweet tweet={sampleTweet} />
    )
  }
}

describe('<Tweet />', function () {
  it('Tweet props.tweet instanceOf Immutable.Map', function () {
    const {wrapper} = setup()
    expect(wrapper.props().tweet).to.be.an.instanceOf(Map)
    expect(wrapper.props().tweet.get).to.be.a('function')
  })

  it(`Tweet class is ${styles.tweet}`, function () {
    const {wrapper} = setup()
    expect(wrapper.render().find(`.${styles.tweet}`)).to.have.length(1)
  })

  it('Tweet has 3 child nodes', function () {
    const {wrapper} = setup()
    expect(wrapper.children()).to.have.length(3)
  })

  it('Tweet nth-child(0) instanceOf TweetHeader', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(0).name()).to.equal('TweetHeader')
  })

  it('Tweet nth-child(1) instanceOf TweetContent', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(1).name()).to.equal('TweetContent')
  })

  it('Tweet nth-child(2) instanceOf TweetFooter', function () {
    const {wrapper} = setup()
    expect(wrapper.childAt(2).name()).to.equal('TweetFooter')
  })

  it('Tweet updates when !props.tweet.equals(nextProps.tweet)', function () {
    const {wrapper} = setup()
    expect(wrapper.html()).to.not.equal(
      mount(<Tweet tweet={sampleTweet.set('id_str', 'foo')} />).html()
    )
  })
  // it(`<header> has class ${styles.header}`, function () {
  //   return expect(wrapper.children('header').hasClass(styles.header)).to.be.true
  // })
  //
  // it('<header> has 2 child nodes', function () {
  //   expect(wrapper.children('header').children()).to.have.length(2)
  // })
  //
  // it('<header> > <img> src is set correctly', function () {
  //   expect(wrapper.find('header > img')).to.have.length(1)
  //   expect(wrapper.find('header > img').prop('src')).to.equal(sampleTweet.get('user').profile_image_url)
  // })
  //
  // it('<header> > <div> > <h2> is the profile name', function () {
  //   expect(wrapper.find('header > div > h2')).to.have.length(1)
  //   expect(wrapper.find('header > div > h2').text()).to.equal(sampleTweet.get('user').name)
  // })
  //
  // it('<header> > <div> > <h3> is the screen name', function () {
  //   expect(wrapper.find('header > div > h3')).to.have.length(1)
  //   expect(wrapper.find('header > div > h3').text()).to.equal(`@${sampleTweet.get('user').screen_name}`)
  // })
  //
  // it('only 1 <p class="tweet-content"> node', function () {
  //   expect(wrapper.find('p.tweet-content')).to.have.length(1)
  // })
  //
  // it('<p class="tweet-content"> contains tweet text', function () {
  //   expect(wrapper.find('p.tweet-content')).to.have.length(1)
  //   expect(wrapper.find('p.tweet-content').text()).to.equal(sampleTweet.get('text'))
  // })
  //
  // it('<footer> has 1 child node', function () {
  //   expect(wrapper.find('footer').children()).to.have.length(1)
  // })
  //
  // it('<footer> > <p> contains retweet count', function () {
  //   expect(wrapper.find('footer > p')).to.have.length(1)
  //   expect(wrapper.find('footer > p').text()).to.equal(`Retweets: ${sampleTweet.get('retweet_count')}`)
  // })
})
