import React, {PropTypes} from 'react'
import styles from './tweet-header.css'

/**
 * Displays information about the Tweet's user
 * @param {{name: string, profileImgUrl: string, screenName: string}} props
 */
export default function TweetHeader(props) {
  return (
    <header className={styles.tweetHeader} onClick={() => { window.open(`http://twitter.com/${props.screenName}`) }}>
      <div className={styles.imgContainer}>
        <img alt={props.name} src={props.profileImgUrl} />
      </div>
      <div className={styles.metaContainer}>
        <h2>{props.name}</h2>
        <h3>@{props.screenName}</h3>
      </div>
    </header>
  )
}

TweetHeader.propTypes = {
  name: PropTypes.string.isRequired,
  profileImgUrl: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired
}
