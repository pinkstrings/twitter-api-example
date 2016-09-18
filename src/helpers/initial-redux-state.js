/* eslint-disable global-require */
/**
 * for calling the initialState, mostly from mocha
 */
export default {
  app: require('../../src/redux/modules/app/initial-state'),
  entities: require('../../src/redux/modules/entities/initial-state')
}
