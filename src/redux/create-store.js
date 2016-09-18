import {createStore as _createStore, applyMiddleware} from 'redux'
import {List, Map} from 'immutable'
import thunkMiddleware from 'redux-thunk'

export default function createStore(client, data = {}) {
  const middleware = [thunkMiddleware]
  const finalCreateStore = applyMiddleware(...middleware)(_createStore)
  const reducer = require('./modules/reducer') // eslint-disable-line global-require

  const finalState = {
    ...data,
    app: {
      ...data.app,
      client,
      isLoading: false,
      lastUpdated: Date.now()
    },
    entities: {
      ...data.entities,
      tweets: new List(data.entities.tweets)
        .map((tweet) => new Map(tweet))
    }
  }

  const store = finalCreateStore(reducer, finalState)
  return store
}
