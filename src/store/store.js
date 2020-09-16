import {createStore} from 'redux'
import rootReducer from './redusers/rootReducer'

const store = createStore(rootReducer)

export default store
