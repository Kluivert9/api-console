import {SUCCESS_AUTH} from '../actions/actionTypes'

const initialState = {
  login: '',
  subLogin: ''
};

export default function authReducer(state = initialState, action) {
  if (action.type === SUCCESS_AUTH) {
    return {
      login: action.login,
      subLogin: action.subLogin
    }
  }

  return state
}
