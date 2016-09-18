import {combineReducers} from 'redux'

import app from './app/reducer'
import entities from './entities/reducer'

export default combineReducers({
  app,
  entities
})
