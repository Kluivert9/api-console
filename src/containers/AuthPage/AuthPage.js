import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import Logo from '../../components/Logo'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import {validateLogin, validatePassword} from '../../lib/validation'
import {auth} from '../../lib/services'
import {successAuth} from '../../store/actions/auth'

function AuthPage({setAuthData, history}) {
  const [login, setLogin] = useState({value: '', isValid: true})
  const [subLogin, setSubLogin] = useState('')
  const [password, setPassword] = useState({value: '', isValid: true})
  const [errorMsg, setErrorMsg] = useState('')
  const [statusForm, setStatusForm] = useState('oк') // ok, error
  const [statusButton, setStatusButton] = useState('oк') // active, disabled, loading

  useEffect(() => {
    if (login.isValid && password.isValid) {
      setStatusButton('ok')
    }
  }, [login.isValid, password.isValid])

  function loginInputHandler(e) {
    const {target: {value}} = e
    setLogin({value, isValid: true})
  }

  function subLoginInputHandler(e) {
    const {target: {value}} = e
    setSubLogin(value)
  }

  function passwordInputHandler(e) {
    const {target: {value}} = e
    setPassword({value, isValid: true})
  }

  function formSubmitHandler(e) {
    e.preventDefault()
    const loginValid = validateLogin(login.value.trim())
    const passValid = validatePassword(password.value.trim())

    setSubLogin(subLogin.trim())

    setLogin({
      value: login.value.trim(),
      isValid: loginValid
    })

    setPassword({
      value: password.value.trim(),
      isValid: passValid
    })

    if (loginValid && passValid) {
      setStatusButton('loading')
      auth(login.value, subLogin, password.value)
        .then(res => {
          if (res.status) {
            setAuthData(res.session, res.login, res.subLogin)
            history.push('/')
          } else {
            setErrorMsg(res.errorMsg)
            setStatusForm('error')
            setStatusButton('active')
          }
        })
    } else {
      setStatusButton('disabled')
    }
  }

  return (
      <div className="wrap">
        <div className="logo-wrap">
          <Logo />
        </div>
        <form
          className="auth-form"
          onSubmit={formSubmitHandler}
        >
          <div className="auth-form__title">API-консолька</div>
          {
            statusForm === 'error' && <div className="auth-form__warning">
                    <p><i className="fa fa-meh-o" aria-hidden="true"></i>  Вход не вышел</p>
                    <p className="auth-form__message">{errorMsg}</p>
                  </div>
          }
          <InputForm
            name="login"
            isValid={login.isValid}
            label="Логин"
            type="text"
            textInput={loginInputHandler}
            value={login.value}
          />
          <InputForm
            name="sub-login"
            isValid={true}
            label="Сублогин"
            type="text"
            textInput={subLoginInputHandler}
            value={subLogin}
            optional="Опционально"
          />
          <InputForm
            name="password"
            isValid={password.isValid}
            label="Пароль"
            type="password"
            textInput={passwordInputHandler}
            value={password.value}
          />
          <Button
            type="submit"
            status={statusButton}
            name="Войти"
          />
        </form>
        <p className="bottom-link">
          <a
            className="githubLink"
            target="_blank"
            href="https://github.com/Kluivert9/api-console">
            github.com/Kluivert9/api-console
          </a>
        </p>
      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return{
    setAuthData: (session, login, subLogin) => dispatch(successAuth(session, login, subLogin))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AuthPage))
