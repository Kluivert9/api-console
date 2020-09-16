import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import Logo from '../../components/Logo'
import {logOut} from '../../lib/services'
import {fullScreenToggle} from '../../store/actions/console'

function MainPanel({login, subLogin, fullScreen, fullScreenToggle, history}) {
  function logOutHandler() {
    logOut()
    history.push('/auth')
  }

  function toggleFullScreenHandler() {
    fullScreenToggle()

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div className="action-panel">
      <div className="action-panel__left">
        <Logo />
        <div className="action-panel__title">API-консолька</div>
      </div>
      <div className="action-panel__right">
        <div className="action-panel__authorization-data">
          {login}
          {subLogin && <span className="action-panel__colon"> : </span>}
          {subLogin}
        </div>
        <div
          className="action-panel__logout"
          onClick={logOutHandler}
        >
          Выйти
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </div>
        <div
          className="action-panel__full-screen"
          onClick={toggleFullScreenHandler}
        >
          {fullScreen
            ? <i className="fa fa-compress" aria-hidden="true"></i>
            : <i className="fa fa-expand" aria-hidden="true"></i>
          }
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    login: state.authReducer.login,
    subLogin: state.authReducer.subLogin,
    fullScreen: state.consoleReducer.fullScreen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fullScreenToggle: () => dispatch(fullScreenToggle())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPanel))
