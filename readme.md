# twitter-api-example
---

requirements: `node ^6.3.0, npm ^3.10.0`

This is an example of a Twitter API call using Node.js + React/Redux with Universal/Isomorphic rendering, ES6 + await/async via babel-register and webpack, testing with Mocha/Chai/Enzyme.


# Getting Started

#### Prepare your Twitter credentials

Get your [Twitter API credentials](https://apps.twitter.com/) ([Tokens from dev.twitter.com](https://dev.twitter.com/oauth/overview/application-owner-access-tokens))

Create a `.env` file in the project root with the Twitter API credentials:

```
TWITTER_CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_TOKEN_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

the `.env` file will be automatically loaded when you `npm start`, `npm test`, or `npm run build`

#### Install the minimum node dependencies

`NODE_ENV=production npm install`

#### Start the servers

`npm start`


#### Open your browser

`http://localhost:8080`

---

# Testing

#### Install dev dependencies
`NODE_ENV=development npm install`

#### eslint
`npm run lint`

#### mocha
`npm test`

---

# Building with Webpack

Make sure dev dependencies are installed

`npm run build`
