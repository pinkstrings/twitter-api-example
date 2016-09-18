import React, {PropTypes} from 'react'
import styles from './tweet-content.css'

/**
 * takes plain text from the tweet and enhances it with tweet entities
 * @param  {{entities: object, text: string}} props
 * @return {string}       unrendered html string
 */
export const parseTweetText = (props) => {
  let text = `<p>${props.text}</p>`

  if (props.entities) {
    if (props.entities.hashtags && props.entities.hashtags.length) {
      props.entities.hashtags.forEach((item) => {
        text = text.replace(`#${item.text}`, `<a target="_blank" href="http://twitter.com/hashtag/${item.text}">#${item.text}</a>`)
      })
    }

    if (props.entities.urls && props.entities.urls.length) {
      props.entities.urls.forEach((item) => {
        text = text.replace(item.url, `<a target="_blank" href="${item.expanded_url}">${item.display_url}</a>`)
      })
    }

    if (props.entities.media && props.entities.media.length) {
      props.entities.media.forEach((item) => {
        if (item.type === 'photo') {
          text = text.replace(item.url, `</p><p><img src="${item.media_url}" />`)
        }
      })
    }

    if (props.entities.user_mentions && props.entities.user_mentions.length) {
      props.entities.user_mentions.forEach((item) => {
        text = text.replace(
          `@${item.screen_name}`,
          `<a href="http://twitter.com/${item.screen_name}" target="_blank">@${item.screen_name}</a>`
        )
      })
    }
  }

  return text
}

/**
 * Displays tweet content in a Tweet.
 * @param {{entities: object, text: string}} props
 */
export default function TweetContent(props) {
  return (
    <div
      className={styles.tweetContent}
      dangerouslySetInnerHTML={{__html: parseTweetText(props)}}
    />
  )
}

TweetContent.propTypes = {
  entities: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}
