import React, {PropTypes} from 'react'

import RetweetIcon from './retweet-icon'
import styles from './tweet-footer.css'

/**
 * Displays number of retweets in a Tweet
 * @param {{retweetCount: number, tweetId: string}} props
 */
export default function TweetFooter(props) {
  return (
    <footer className={styles.tweetFooter}>
      <a
        target='_blank'
        href={`https://twitter.com/intent/retweet?tweet_id=${props.tweetId}`}
        rel='noopener noreferrer'
      >
        <RetweetIcon /> {props.retweetCount}
      </a>
    </footer>
  )
}

TweetFooter.propTypes = {
  retweetCount: PropTypes.number.isRequired,
  tweetId: PropTypes.string.isRequired
}
