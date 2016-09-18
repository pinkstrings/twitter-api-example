/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies */

// Bootstrap babel-register
require('babel-register')

// Ensure correct NODE_ENV
if (process.env.NODE_ENV !== 'test') {
  throw new Error('Running tests require NODE_ENV=test')
}

// Globals
global.__DEVELOPMENT__ = true
global.__SERVER__ = true
global.__CLIENT__ = false

// Set up chai
const chai = require('chai')

chai.use(require('chai-as-promised'))
chai.use(require('chai-enzyme')())

global.expect = chai.expect

// Set up jsdom
const jsdom = require('jsdom')

const document = jsdom.jsdom()

global.document = document
global.window = document.defaultView
global.navigator = {userAgent: 'node.js'}

// Hook for CSS Module imports enables using classes in tests
const hook = require('css-modules-require-hook')

hook({
  extensions: ['.css'],
  generateScopedName: '[local]__[hash:base64:4]'
})

// Load tests
const glob = require('glob')

glob.sync('./test/api/**/*.spec.js')
  .forEach(function (item) { !item.includes('api.spec.js') ? require(item) : null}) // eslint-disable-line
glob.sync('./test/api/api.spec.js').forEach(require)
glob.sync('./test/src/**/*.spec.js').forEach(require)
