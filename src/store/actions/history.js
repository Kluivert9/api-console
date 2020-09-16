import {
  ADD_REQUEST_HISTORY,
  ADD_ALL_REQUEST_HISTORY,
  REMOVE_HISTORY,
  REMOVE_HISTORY_ITEM
} from './actionTypes'

export function addRequestHistory(historyItem) {
  return {
    type: ADD_REQUEST_HISTORY,
    payload: historyItem
  }
}

export function addAllRequestHistory(allHistory) {
  return {
    type: ADD_ALL_REQUEST_HISTORY,
    payload: allHistory
  }
}

export function removeHistory() {
  return {
    type: REMOVE_HISTORY
  }
}

export function removeHistoryItem(id) {
  return {
    type: REMOVE_HISTORY_ITEM,
    payload: id
  }
}
