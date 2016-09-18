import pkg from './package.json'

const host = process.env.HOST || 'localhost'
const apiHost = process.env.APIHOST || 'localhost'

const port = parseInt(process.env.PORT, 10) || 8080
const apiPort = parseInt(process.env.APIPORT, 10) || 3030

export default {
  app: {
    title: pkg.name
  },
  apiHost,
  apiPort,
  host,
  port
}
