import initialState from './initial-state'

const prefix = 'app'
export const COMPLETE_TIMER = `${prefix}/COMPLETE_TIMER`
export const GET_TWEETS = `${prefix}/GET_TWEETS`
export const SET_SEARCH_QUERY = `${prefix}/SET_SEARCH_QUERY`
export const START_TIMER = `${prefix}/START_TIMER`

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TWEETS:
      if (action.error) {
        let error = action.error

        if (error instanceof Error) {
          error = error.message
        }

        return {
          ...state,
          isLoading: false,
          lastUpdated: Date.now(),
          error
        }
      }

      if (action.payload) {
        return {
          ...state,
          error: null,
          isLoading: false,
          lastUpdated: Date.now()
        }
      }

      return {
        ...state,
        isLoading: true
      }
    case COMPLETE_TIMER:
      return {
        ...state,
        timer: null
      }
    case START_TIMER:
      if (!action.payload || !action.payload.timer) {
        throw new Error('START_TIMER expects payload.timer')
      }

      return {
        ...state,
        timer: action.payload.timer
      }
    case SET_SEARCH_QUERY:
      if (!action.payload ||
        (!action.payload.query && action.payload.query !== '')
      ) {
        throw new Error('SET_SEARCH_QUERY expects payload.query')
      }

      if (typeof action.payload.query === 'object') {
        throw new Error('SET_SEARCH_QUERY payload.query cannot be an object')
      }

      if (state.searchQuery !== action.payload.query) {
        return {
          ...state,
          searchQuery: action.payload.query || ''
        }
      }

      return state
    default:
      return state
  }
}
