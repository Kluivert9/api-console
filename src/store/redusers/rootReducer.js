import {combineReducers} from 'redux'
import authReducer from './authReducer'
import consoleReducer from './consoleReducer'
import historyReducer from './historyReducer'

export default combineReducers({
  authReducer,
  consoleReducer,
  historyReducer
});
