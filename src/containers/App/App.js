import React, {useEffect} from 'react'
import {Switch, Route} from "react-router-dom"
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {successAuth} from '../../store/actions/auth'
import AuthPage from '../AuthPage'
import ConsolePage from '../ConsolePage'
import Page404 from '../../components/Page404'
import {checkSession} from '../../lib/services'

function App({setAuthData, history}) {
  useEffect(() => {
    checkSession().then(res => {
      if (res.status) {
        setAuthData(res.login, res.subLogin)
        history.push('/')
      } else {
        history.push('/auth')
      }
    })
  }, [])

  return (
    <Switch>
      <Route path="/" exact component={ConsolePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="*" component={Page404}/>
    </Switch>
  )
}

function mapDispatchToProps(dispatch) {
  return{
    setAuthData: (login, subLogin) => dispatch(successAuth(login, subLogin))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(App))
