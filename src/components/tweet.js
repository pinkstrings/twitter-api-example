import {Map} from 'immutable'
import React, {Component, PropTypes} from 'react'

import styles from './tweet.css'
import TweetContent from './tweet-content'
import TweetFooter from './tweet-footer'
import TweetHeader from './tweet-header'

/**
 * main Tweet component
 */
export default class Tweet extends Component {
  static propTypes ={
    tweet: PropTypes.instanceOf(Map).isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.tweet.equals(nextProps.tweet)
  }

  render() {
    const {tweet} = this.props
    const {profile_image_url, name, screen_name} = tweet.get('user')

    /* eslint-disable camelcase */
    return (
      <li className={styles.tweet}>
        <TweetHeader
          name={name}
          profileImgUrl={profile_image_url}
          screenName={screen_name}
        />

        <TweetContent
          entities={tweet.get('entities')}
          text={tweet.get('text')}
        />

        <TweetFooter
          retweetCount={tweet.get('retweet_count')}
          tweetId={tweet.get('id_str')}
        />
      </li>
    )
  }
}
