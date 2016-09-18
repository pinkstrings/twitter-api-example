import React, {PropTypes} from 'react'
import styles from './updated.css'

/**
 * converts a Date to a string like `1:23pm`
 * @param  {Date} time
 * @return {string} timeString
 */
export const formatTime = (time) => {
  let hours = time.getHours()
  let isPM = false

  if (hours >= 12) isPM = true
  if (hours > 12) hours -= 12

  let minutes = time.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`

  return `${hours}:${minutes}${isPM ? 'pm' : 'am'}`
}

/**
 * Displays the last time getTweets() was called or when
 * getTweets() is waiting on a request
 * @param {{isLoading: bool, time: Date}} props [description]
 */
export default function Updated(props) {
  // Display 'Updating...' if isLoading (ex. waiting on getTweets() request)
  if (props.isLoading) {
    return (
      <span
        className={styles.updated}
        children='Updating...'
      />
    )
  }

  return (
    <span
      className={styles.updated}
      children={`Last Update: ${formatTime(props.time)}`}
    />
  )
}

Updated.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  time: PropTypes.instanceOf(Date).isRequired
}
