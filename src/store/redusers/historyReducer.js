import {
  ADD_REQUEST_HISTORY,
  ADD_ALL_REQUEST_HISTORY,
  REMOVE_HISTORY,
  REMOVE_HISTORY_ITEM
} from '../actions/actionTypes'
import {deepEqual} from '../../lib/halpers'
import {HISTORY_COUNT} from '../../lib/constants'

const initialState = {
  historyItems: []
}

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REQUEST_HISTORY:
      let newHistoryItems = state.historyItems.filter(item => !deepEqual(item, action.payload))

      if (newHistoryItems.length === HISTORY_COUNT) {
        newHistoryItems = newHistoryItems.slice(0, HISTORY_COUNT - 1)
      }

      return {
        historyItems: [action.payload, ...newHistoryItems]
      }
    case ADD_ALL_REQUEST_HISTORY:
      return {
        historyItems: action.payload
      }
    case REMOVE_HISTORY:
      return {
        historyItems: []
      }
    case REMOVE_HISTORY_ITEM:
      return {
        historyItems: state.historyItems.filter((item, id) => id !== action.payload)
      }
    default:
      return state
  }
}
