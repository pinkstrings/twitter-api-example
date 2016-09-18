import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import ApiClient from './helpers/api-client'
import ConnectedApp from './containers/app'
import createStore from './redux/create-store'

// setup the ApiClient (uses superagent by default)
const client = new ApiClient()

// find the root DOM Element for the <App /> to
// be rendered into
const dest = document.getElementById('app-root')

// setup the redux store using the ApiClient
// and data passed from the server
const store = createStore(client, window.__data) // eslint-disable-line no-underscore-dangle

// render the <App /> to the DOM
ReactDOM.render(
  <Provider key='provider' store={store}>
    <ConnectedApp />
  </Provider>,
  dest
)
