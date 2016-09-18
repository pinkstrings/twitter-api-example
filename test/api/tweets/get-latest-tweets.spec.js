import {expect} from 'chai'

import getLatestTweets from '../../../api/tweets/get-latest-tweets'

const variablesToTest = [
  'TWITTER_CONSUMER_KEY',
  'TWITTER_CONSUMER_SECRET',
  'TWITTER_ACCESS_TOKEN_KEY',
  'TWITTER_ACCESS_TOKEN_SECRET'
]

describe('get-latest-tweets', function () {
  before(function checkEnvironmentVariables(done) { // eslint-disable-line consistent-return
    for (const envVarname of variablesToTest) {
      if (typeof process.env[envVarname] === 'undefined') {
        return done(new Error(`${envVarname} cannot be undefined in local environment`))
      }
    }

    done()
  })

  it('should return a Promise', function () {
    expect(getLatestTweets()).to.be.a('promise')
  })

  context('reject promise if env variables aren\'t set correctly', function () {
    let tempEnvVar

    variablesToTest.forEach(function (envVarname) {
      context(envVarname, function () {
        before(function () {
          tempEnvVar = process.env[envVarname]
          delete process.env[envVarname]
        })

        it(`reject promise if ${envVarname} is undefined`, function () {
          expect(getLatestTweets()).to.be.rejectedWith(Error)
        })

        it(`reject promise if ${envVarname}.length > 2`, function () {
          process.env[envVarname] = ' '
          expect(getLatestTweets()).to.be.rejectedWith(Error)
        })

        after(function () {
          process.env[envVarname] = tempEnvVar
          tempEnvVar = null
        })
      })
    })
  })

  it('should return 10 tweets by default', function () {
    expect(getLatestTweets()).to.eventually.have.length(10)
  })

  it('reject promise if first argument is not an int between 1-20', function () {
    expect(getLatestTweets(true)).to.be.rejectedWith(Error)
    expect(getLatestTweets(false)).to.be.rejectedWith(Error)
    expect(getLatestTweets(0)).to.be.rejectedWith(Error)
    expect(getLatestTweets(-1)).to.be.rejectedWith(Error)
    expect(getLatestTweets(21)).to.be.rejectedWith(Error)
    expect(getLatestTweets('foo')).to.be.rejectedWith(Error)
    expect(getLatestTweets({})).to.be.rejectedWith(Error)
    expect(getLatestTweets([])).to.be.rejectedWith(Error)
    expect(getLatestTweets(NaN)).to.be.rejectedWith(Error)
  })

  it('should return 1 tweet when called with 1 as the first argument', function () {
    expect(getLatestTweets(1)).to.eventually.have.length(1)
  })
})
