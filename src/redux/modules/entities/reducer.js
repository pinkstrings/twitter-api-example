import {List, Map} from 'immutable'

import {GET_TWEETS} from '../app/reducer'
import initialState from './initial-state'

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TWEETS:
      if (action.payload && action.payload.tweets) {
        return {
          ...state,
          tweets: new List(action.payload.tweets).map((tweet) => new Map(tweet))
        }
      }

      return state
    default: return state
  }
}
