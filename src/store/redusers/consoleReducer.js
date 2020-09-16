import {
  FULL_SCREEN_TOGGLE,
  CHECK_REQUEST,
  INSERT_REQUEST,
  FORMAT_REQUEST,
  INSERT_ANSWER
} from '../actions/actionTypes'
import {validateJSON} from '../../lib/validation'

const initialState = {
  fullScreen: false,
  requestField: {
    request: '',
    errorStatus: false
  },
  answerField: {
    answer: '',
    errorStatus: false
  }
};

export default function consoleReducer(state = initialState, action) {
  switch (action.type) {
    case FULL_SCREEN_TOGGLE:
      return {
        ...state,
        fullScreen: !state.fullScreen
      }
    case CHECK_REQUEST:
      return {
        ...state,
        requestField: {
          ...state.requestField,
          errorStatus: !validateJSON(state.requestField.request)
        }
      }
    case INSERT_REQUEST:
      return {
        ...state,
        requestField: {
          errorStatus: action.status,
          request: action.request
        }
      }
    case FORMAT_REQUEST:
      return {
        ...state,
        requestField: {
          ...state.requestField,
          request: JSON.stringify(JSON.parse(state.requestField.request), null, 2)
        }
      }
    case INSERT_ANSWER:
      return {
        ...state,
        answerField: {
          answer: JSON.stringify(action.answer, null, 2),
          errorStatus: action.errorStatus
        }
      }
    default:
      return state
  }
}
