import cookieSession from 'cookie-session'
import express from 'express'

import config from '../config'
import getLatestTweets from './tweets/get-latest-tweets'

// instantiate the API server
const app = express()

// setup cookies with a secret
app.use(cookieSession({secret: 'h3ll0h3h31smy4w3s0m3s3cr3t'}))

// handle /api requests
app.use(async (req, res) => {
  try {
    // split the urls
    const splittedUrlPath = req.url.split('?')[0].split('/').slice(1)

    // listen only on the /api/tweets url
    // 404 all others
    if (splittedUrlPath.length !== 1 || splittedUrlPath[0] !== 'tweets') {
      throw new Error(404)
    }

    // only allow the GET HTTP method
    // 405 all others
    if (req.method !== 'GET') {
      throw new Error(405)
    }

    // get some tweets
    const tweets = await getLatestTweets()

    // return the tweets
    return res.status(200).json(tweets)
  } catch (error) {
    // if error.message is a number (ex. 404, 405, etc)
    if (Number.isInteger(parseInt(error.message, 10))) {
      return res.status(parseInt(error.message, 10)).end()
    }

    // send unhandled error.message to client
    return res.status(500).send(error.message)
  }
})

// start listening
if (config.apiPort) {
  /* eslint-disable no-console */
  app.listen(config.apiPort, (err) => {
    if (err) console.error(err)

    console.info('----\n==> 🌎  API is running on port %s', config.apiPort)
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
  /* eslint-enable no-console */
}

export default app
