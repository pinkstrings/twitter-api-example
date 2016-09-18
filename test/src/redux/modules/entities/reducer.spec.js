import {expect} from 'chai'

import initialState from '../../../../../src/redux/modules/entities/initial-state'
import reducer from '../../../../../src/redux/modules/entities/reducer'
import {GET_TWEETS} from '../../../../../src/redux/modules/app/reducer'
import sampleTweetlist from '../../../../utils/sample-tweetlist.js'

describe('entities reducer', function () {
  it('should return the initial state', function () {
    expect(reducer(undefined, {})).to.equal(initialState)
  })

  describe('GET_TWEETS', function () {
    it('do nothing on no action.payload', function () {
      const nextState = reducer(initialState, {type: GET_TWEETS})
      expect(nextState).to.deep.equal(initialState)
    })

    it('handle action.payload.tweets', function () {
      const nextState = reducer(initialState, {
        payload: {tweets: sampleTweetlist.toJS()},
        type: GET_TWEETS
      })

      expect(nextState.tweets).to.satisfy((item) => sampleTweetlist.equals(item))
    })
  })
})
