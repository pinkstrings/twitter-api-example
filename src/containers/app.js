import {connect} from 'react-redux'
import {List} from 'immutable'
import React, {Component, PropTypes} from 'react'

import * as appActions from '../redux/modules/app/actions'
import SearchField from '../components/search-field'
import styles from './app.css'
import Tweet from '../components/tweet'
import tweetStyles from '../components/tweet.css'
import Updated from '../components/updated'

/**
 * map redux-state to App props
 * @param  {object} redux state
 * @return {object} props from state
 */
export const mapStateToProps = (state) => ({
  error: state.app.error,
  isLoading: state.app.isLoading,
  lastUpdated: state.app.lastUpdated,
  searchQuery: state.app.searchQuery,
  tweets: state.entities.tweets
})

/**
 * map redux-dispatch to App props
 * @param  {function} dispatch
 * @return {object} props from dispatch and actions
 */
export const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setSearchQuery: appActions.setSearchQuery,
  startTimer: appActions.startTimer
})

/**
 * Top-level App component
 */
export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    searchQuery: PropTypes.string,
    setSearchQuery: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    tweets: PropTypes.instanceOf(List).isRequired
  }

  componentDidMount() {
    // start the timer on App.mount
    this.props.dispatch(this.props.startTimer())
  }

  shouldComponentUpdate(nextProps) {
    return this.props.error !== nextProps.error
      || this.props.isLoading !== nextProps.isLoading
      || this.props.lastUpdated !== nextProps.lastUpdated
      || this.props.searchQuery !== nextProps.searchQuery
      || !this.props.tweets.equals(nextProps.tweets)
  }

  /**
   * for wrapping the content
   * @param  {node} nodes to be wrapped
   * @return {node}
   */
  getAppWrapper = (children) => {
    const {
      isLoading,
      lastUpdated,
      searchQuery
    } = this.props

    return (
      <div className={styles.wrapper}>
        <Updated isLoading={isLoading} time={new Date(lastUpdated)} />

        <div id='app-container' className={styles.appContainer}>
          <SearchField onChange={this.handleSearchQueryEdit} value={searchQuery || ''} />

          <ul className={styles.tweetList}>
            {children}
          </ul>
        </div>
      </div>
    )
  }

  /**
   * called when the <input> is changed
   * @param  {SyntheticEvent} event
   */
  handleSearchQueryEdit = (event) => {
    event.preventDefault()
    const query = event.nativeEvent.target.value

    if (query !== this.props.searchQuery) {
      this.props.dispatch(this.props.setSearchQuery(query))
    }
  }

  /**
   * filter the Tweets List by searchQuery
   * @return {Immutable.List} filtered Tweets
   */
  filterTweetsBySearchQuery = () => {
    if (!this.props.searchQuery) return this.props.tweets

    return this.props.tweets
      .filter((tweet) => tweet
        .get('text').toLowerCase()
        .includes(this.props.searchQuery.toLowerCase())
      )
  }

  render() {
    const {error} = this.props

    if (error) {
      return this.getAppWrapper(
        <li className={tweetStyles.tweet} style={{textAlign: 'center'}}>
          <strong>Error: </strong> {error}
        </li>
      )
    }

    // get filtered tweets
    const tweets = this.filterTweetsBySearchQuery()

    // if no tweets or no passed the filter
    if (!tweets.size) {
      return this.getAppWrapper(
        <li className={tweetStyles.tweet} style={{textAlign: 'center'}}>No tweets found.</li>
      )
    }

    // render the tweets
    return this.getAppWrapper(
      tweets.map((tweet) => <Tweet key={tweet.get('id_str')} tweet={tweet} />)
    )
  }
}

// connect the redux store to the App
export default connect(mapStateToProps, mapDispatchToProps)(App)
