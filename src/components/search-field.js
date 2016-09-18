import React, {PropTypes} from 'react'
import styles from './search-field.css'

/**
 * The search field for searching tweets
 * @param {{onChange: function, value: string}} props
 */
export default function SearchField(props) {
  return (
    <input
      className={styles.searchField}
      name='search-query'
      placeholder='Search Tweets...'
      onChange={props.onChange}
      type='text'
      value={props.value}
    />
  )
}

SearchField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}
