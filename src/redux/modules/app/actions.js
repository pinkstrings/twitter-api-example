import {
  COMPLETE_TIMER,
  GET_TWEETS,
  SET_SEARCH_QUERY,
  START_TIMER
} from './reducer'

export function getTweets() {
  return async (dispatch, getState) => {
    try {
      const {client} = getState().app

      dispatch({type: GET_TWEETS})
      const tweets = await client.get('/tweets')
      dispatch({payload: {tweets}, type: GET_TWEETS})

      dispatch(startTimer()) // eslint-disable-line no-use-before-define
    } catch (error) {
      dispatch({
        error: error.response.text,
        type: GET_TWEETS
      })
      dispatch(startTimer()) // eslint-disable-line no-use-before-define
    }
  }
}

export function timerCompleted() {
  return (dispatch, getState) => {
    dispatch({type: COMPLETE_TIMER})
    dispatch(getTweets())
  }
}

export function setSearchQuery(query) {
  return {
    payload: {query},
    type: SET_SEARCH_QUERY
  }
}

export function startTimer(duration = 60000) {
  return (dispatch, getState) => {
    let {timer} = getState().app

    if (timer) throw new Error('startTimer: timer already exists')

    timer = setTimeout(() => {
      dispatch(timerCompleted())
    }, duration)

    dispatch({
      payload: {timer},
      type: START_TIMER
    })
  }
}
