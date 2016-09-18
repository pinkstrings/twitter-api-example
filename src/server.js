import {Provider} from 'react-redux'
import Express from 'express'
import http from 'http'
import httpProxy from 'http-proxy'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'

import ApiClient from './helpers/api-client'
import config from '../config'
import ConnectedApp from './containers/app'
import createStore from './redux/create-store'
import getLatestTweets from '../api/tweets/get-latest-tweets'
import Html from './helpers/html'
import initialState from './helpers/initial-redux-state'

// instantiate the server
const app = new Express()
const server = new http.Server(app)

// Create proxy to API server
const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const proxy = httpProxy.createProxyServer({target: targetUrl})

// Use proxy to API server on /api route
app.use('/api', (req, res) => { proxy.web(req, res, {target: targetUrl}) })


// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error) // eslint-disable-line no-console
  }

  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'})
  }

  const json = {error: 'proxy_error', reason: error.message}
  res.end(JSON.stringify(json))
})

// static directory for serving assets
app.use(Express.static(path.join(__dirname, '../assets')))

// server-side rendering of the <App />
app.use(async (req, res) => {
  // instantiate the ApiClient with Express' request
  // object instead of superagent
  const client = new ApiClient(req)

  // setup preloadedState
  const preloadedState = {...initialState}

  try {
    // get the latest tweets and load them into the state
    preloadedState.entities.tweets = await getLatestTweets(10)
  } catch (error) {
    preloadedState.app.error = error instanceof Error
      ? error.message
      : error
  }

  // create the store with the Express request and
  // the fully-loaded preloadedState
  const store = createStore(client, preloadedState)
  global.navigator = {userAgent: req.headers['user-agent']}

  // render <App /> to a string to be sent to the client
  res.status(200).send('<!doctype html>\n' + // eslint-disable-line prefer-template
    ReactDOM.renderToString(
      <Html
        component={(
          <Provider store={store} key='provider'>
            <ConnectedApp />
          </Provider>
        )}
        store={store}
      />
    ))
})

// start listening to client requests
if (config.port) {
  /* eslint-disable no-console */
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
