import {expect} from 'chai'
import nock from 'nock'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import config from '../../../../../config'
import * as actions from '../../../../../src/redux/modules/app/actions'
import * as types from '../../../../../src/redux/modules/app/reducer'
import ApiClient from '../../../../../src/helpers/api-client'
import initialState from '../../../../../src/helpers/initial-redux-state'

import sampleTweetlist from '../../../../utils/sample-tweetlist'

const nockUrl = `http://${config.apiHost}:${config.apiPort}`
const mockStore = configureStore([thunkMiddleware])

describe('app actions', function () {
  afterEach(function () {
    nock.cleanAll()
  })

  describe('getTweets()', function () {
    it('handles status 200', function () {
      nock(nockUrl)
        .get('/tweets')
        .reply(200, sampleTweetlist.toJS(), {'Content-Type': 'application/json'})

      const nextState = {...initialState}
      nextState.app.client = new ApiClient()
      const store = mockStore(nextState)

      return store.dispatch(actions.getTweets())
        .then(() => {
          const expectedActions = store.getActions().slice(0, 2)

          expect(expectedActions[0]).to.deep.equal({type: types.GET_TWEETS})
          expect(expectedActions[1]).to.deep.equal({
            payload: {tweets: sampleTweetlist.toJS()},
            type: types.GET_TWEETS
          })
        })
    })

    it('handles status 404', function () {
      const errorMessage = 'Some error'
      nock(nockUrl)
        .get('/tweets')
        .reply(404, function (uri, requestBody) {
          return {
            response: {text: errorMessage}
          }
        })

      const nextState = {...initialState}
      nextState.app.client = new ApiClient()
      const store = mockStore(nextState)

      return store.dispatch(actions.getTweets())
        .then(() => {
          expect(store.getActions()[0]).to.deep.equal({
            type: types.GET_TWEETS
          })
          expect(store.getActions()[1]).to.deep.equal({
            type: types.GET_TWEETS,
            error: errorMessage
          })
        })
    })

    it('handles status 405', function () {
      const errorMessage = 'Some error'
      nock(nockUrl)
        .get('/tweets')
        .reply(405, function (uri, requestBody) {
          return {
            response: {text: errorMessage}
          }
        })

      const nextState = {...initialState}
      nextState.app.client = new ApiClient()
      const store = mockStore(nextState)

      return store.dispatch(actions.getTweets())
        .then(() => {
          expect(store.getActions()[0]).to.deep.equal({
            type: types.GET_TWEETS
          })
          expect(store.getActions()[1]).to.deep.equal({
            type: types.GET_TWEETS,
            error: errorMessage
          })
        })
    })

    it('handles status 500', function () {
      const errorMessage = 'Some error'
      nock(nockUrl)
        .get('/tweets')
        .reply(500, function (uri, requestBody) {
          return {
            response: {text: errorMessage}
          }
        })

      const nextState = {...initialState}
      nextState.app.client = new ApiClient()
      const store = mockStore(nextState)

      return store.dispatch(actions.getTweets())
        .then(() => {
          expect(store.getActions()[0]).to.deep.equal({
            type: types.GET_TWEETS
          })
          expect(store.getActions()[1]).to.deep.equal({
            type: types.GET_TWEETS,
            error: errorMessage
          })
        })
    })
  })

  it('setSearchQuery()', function () {
    const query = 'somequery'

    expect(actions.setSearchQuery(query)).to.deep.equal({
      payload: {query},
      type: types.SET_SEARCH_QUERY
    })
  })
})
