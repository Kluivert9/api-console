import {
  FULL_SCREEN_TOGGLE,
  CHECK_REQUEST,
  INSERT_REQUEST,
  FORMAT_REQUEST,
  INSERT_ANSWER
} from './actionTypes'

export function fullScreenToggle() {
  return {
    type: FULL_SCREEN_TOGGLE
  }
}

export function checkRequest() {
  return {
    type: CHECK_REQUEST
  }
}

export function insertRequest(request, status) {
  return {
    type: INSERT_REQUEST,
    request,
    status
  }
}

export function formatRequest() {
  return {
    type: FORMAT_REQUEST
  }
}

export function insertAnswer(answer, errorStatus) {
  return {
    type: INSERT_ANSWER,
    answer,
    errorStatus
  }
}
