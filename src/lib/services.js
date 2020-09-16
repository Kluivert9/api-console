import Sendsay from 'sendsay-api'

const sendsay = new Sendsay()

export async function checkSession() {
  const session = localStorage.getItem('session')
  const login = localStorage.getItem('login')
  const subLogin = localStorage.getItem('subLogin')
  let status = true

  if (session === null) {
    status = false
  } else {
    await sendsay.request({action: 'pong', session})
      .then(res => {
        status = true
      })
      .catch(err => {
        status = false
      })
  }

  return {status, login, subLogin}
}

export async function auth(login, sublogin = '', passwd) {
  let status = true
  let session = ''
  let errorMsg = ''

  await sendsay.request({action: 'login', login, passwd, sublogin})
    .then(res => {
      session = res.session
      localStorage.setItem('session', session)
      localStorage.setItem('login', login)
      localStorage.setItem('subLogin', sublogin)
    })
    .catch(e => {
      status = false
      errorMsg = JSON.stringify({id: e.id, explain: e.explain})
    })

  return {status, login, sublogin, errorMsg}
}

export function logOut() {
  const session = localStorage.getItem('session')

  sendsay.request({action: 'logout', session})
    .then(res => {
      localStorage.removeItem('session')
      localStorage.removeItem('login')
      localStorage.removeItem('subLogin')
    })
    .catch(e => {
      console.log('error: ', e)
    })
}

export async function makeRequest(str) {
  const request = JSON.parse(str)
  request.session = localStorage.getItem('session')
  let errorStatus = false
  let answer = {}

  await sendsay.request(request)
    .then(res => {
      answer = res
    })
    .catch(e => {
      answer = e
      errorStatus = true
    })

  return {answer, errorStatus}
}
