import {SUCCESS_AUTH} from './actionTypes'

export function successAuth(login, subLogin = '') {
  return {
    type: SUCCESS_AUTH,
    login,
    subLogin
  }
}
