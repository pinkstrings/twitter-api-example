import Twitter from 'twitter'

/**
 * gets the latest tweets from Salesforce's twitter feed
 * @param  {Number} [numberOfTweets=10] number of tweets to retreive
 * @return {Promise}
 */
export default function getLatestTweets(numberOfTweets = 10) {
  // check that numberOfTweets is a number between 1 and 20
  if (!Number.isInteger(numberOfTweets) || numberOfTweets < 1 || numberOfTweets > 20) {
    return Promise.reject(new Error('getLatestTweets expects first argument to be an integer between 1-20'))
  }

  return new Promise((resolve, reject) => {
    // check the 4 Twitter API credential environment variables
    if (
      typeof process.env.TWITTER_CONSUMER_KEY === 'undefined' ||
      process.env.TWITTER_CONSUMER_KEY.length < 2
    ) return reject(new Error('TWITTER_CONSUMER_KEY not set correctly in local environment'))

    if (
      typeof process.env.TWITTER_CONSUMER_SECRET === 'undefined' ||
      process.env.TWITTER_CONSUMER_SECRET.length < 2
    ) return reject(new Error('TWITTER_CONSUMER_SECRET not set correctly in local environment'))

    if (
      typeof process.env.TWITTER_ACCESS_TOKEN_KEY === 'undefined' ||
      process.env.TWITTER_ACCESS_TOKEN_KEY.length < 2
    ) return reject(new Error('TWITTER_ACCESS_TOKEN_KEY not set correctly in local environment'))

    if (
      typeof process.env.TWITTER_ACCESS_TOKEN_SECRET === 'undefined' ||
      process.env.TWITTER_ACCESS_TOKEN_SECRET.length < 2
    ) return reject(new Error('TWITTER_ACCESS_TOKEN_SECRET not set correctly in local environment'))

    // prepare the authorization credentials
    const twitterAuthParams = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }

    // prepare the query
    const queryParams = {
      count: numberOfTweets,
      screen_name: 'salesforce'
    }

    // instantiate the Twitter API client
    const client = new Twitter(twitterAuthParams)

    // run the query
    return client.get(
      'statuses/user_timeline',
      queryParams,
      (error, tweets, response) => {
        // could not connect to twitter
        if (error && error.code === 'ENOTFOUND') {
          return reject(new Error('Cannot connect to Twitter. Check your internet connection.'))
        }

        // could not authenticate with given credentials
        if (error && error instanceof Array && error[0].code === 32) {
          return reject(new Error('Authentication error. Please check your Twitter API credentials.'))
        }

        // other unhandled Error
        if (error && error instanceof Error) return reject(error)

        // other unhandled error
        if (error) return reject(new Error('An error occurred.'))

        // return the tweets
        return resolve(tweets)
      }
    )
  })
}
