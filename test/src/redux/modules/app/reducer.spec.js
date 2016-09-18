import {expect} from 'chai'

import initialState from '../../../../../src/redux/modules/app/initial-state'
import reducer, * as types from '../../../../../src/redux/modules/app/reducer'
import sampleTweetlist from '../../../../utils/sample-tweetlist.js'

describe('app reducer', function () {
  it('should return the initial state', function () {
    expect(reducer(undefined, {})).to.equal(initialState)
  })

  describe('GET_TWEETS', function () {
    it('handle no action.error or action.payload', function () {
      const nextState = reducer(initialState, {type: types.GET_TWEETS})
      expect(nextState.isLoading).to.equal(true)
      expect(nextState.error).to.equal(null)
      expect(nextState.lastUpdated).to.not.equal(null)
    })

    it('handle action.error (Error)', function () {
      const error = new Error('foobar')
      const nextState = reducer(initialState, {
        error,
        type: types.GET_TWEETS
      })
      expect(nextState.isLoading).to.equal(false)
      expect(nextState.lastUpdated).to.not.equal(initialState.lastUpdated)
      expect(nextState.error).to.equal(error.message)
    })

    it('handle action.error (string)', function () {
      const error = 'foobar'
      const nextState = reducer(initialState, {
        error,
        type: types.GET_TWEETS
      })
      expect(nextState.isLoading).to.equal(false)
      expect(nextState.lastUpdated).to.not.equal(initialState.lastUpdated)
      expect(nextState.error).to.equal(error)
    })

    it('handle action.payload (size = 5)', function () {
      const nextState = reducer(initialState, {
        payload: {tweets: sampleTweetlist},
        type: types.GET_TWEETS
      })
      expect(nextState.isLoading).to.equal(false)
      expect(nextState.lastUpdated).to.not.equal(initialState.lastUpdated)
      expect(nextState.error).to.equal(null)
    })
  })

  describe('COMPLETE_TIMER', function () {
    it('handle correctly', function () {
      const nextState = reducer({
        ...initialState,
        timer: 3
      }, {type: types.COMPLETE_TIMER})
      expect(nextState.timer).to.equal(null)
    })
  })

  describe('START_TIMER', function () {
    it('throw on no action.payload', function () {
      try {
        reducer({initialState}, {type: types.START_TIMER})
      } catch (error) {
        expect(error.message).to.equal('START_TIMER expects payload.timer')
      }
    })

    it('throw on no action.payload.timer', function () {
      try {
        reducer({initialState}, {
          payload: {},
          type: types.START_TIMER
        })
      } catch (error) {
        expect(error.message).to.equal('START_TIMER expects payload.timer')
      }
    })

    it('handle action.payload.timer', function () {
      const nextState = reducer(initialState, {
        payload: {timer: 3},
        type: types.START_TIMER
      })
      expect(nextState.timer).to.equal(3)
    })
  })

  describe('SET_SEARCH_QUERY', function () {
    it('throw on no action.payload', function () {
      try {
        reducer({initialState}, {type: types.SET_SEARCH_QUERY})
      } catch (error) {
        expect(error.message).to.equal('SET_SEARCH_QUERY expects payload.query')
      }
    })

    it('throw on no action.payload.query', function () {
      try {
        reducer({initialState}, {
          payload: {},
          type: types.SET_SEARCH_QUERY
        })
      } catch (error) {
        expect(error.message).to.equal('SET_SEARCH_QUERY expects payload.query')
      }
    })

    it('throw if action.payload.query is an object', function () {
      try {
        reducer({initialState}, {
          payload: {
            query: {
              foo: 'bar'
            }
          },
          type: types.SET_SEARCH_QUERY
        })
      } catch (error) {
        expect(error.message).to.equal('SET_SEARCH_QUERY payload.query cannot be an object')
      }
    })

    it('handle action.payload.query = random string', function () {
      const query = 'somerandomstring'
      const nextState = reducer(initialState, {
        payload: {query},
        type: types.SET_SEARCH_QUERY
      })
      expect(nextState.searchQuery).to.equal(query)
    })

    it('throw on action.payload.query === null', function () {
      const query = null
      try {
        reducer(initialState, {
          payload: {query},
          type: types.SET_SEARCH_QUERY
        })
      } catch (error) {
        expect(error.message).to.equal('SET_SEARCH_QUERY expects payload.query')
      }
    })

    it('handle action.payload.query === ""', function () {
      const query = ''
      const nextState = reducer(initialState, {
        payload: {query},
        type: types.SET_SEARCH_QUERY
      })
      expect(nextState.searchQuery).to.equal(query)
    })
  })
})
