import React, {useState} from 'react'
import {withRouter} from 'react-router'
import MainPanel from '../MainPanel'
import HistoryPanel from '../HistoryPanel'
import CodePanel from '../../components/CodePanel'
import ResizePanel from '../../components/ResizePanel'
import Button from '../../components/Button'
import {connect} from 'react-redux'
import {addRequestHistory} from '../../store/actions/history'
import {
  insertRequest,
  checkRequest,
  formatRequest,
  insertAnswer
} from '../../store/actions/console'
import {validateJSON} from '../../lib/validation'
import {makeRequest} from '../../lib/services'
import {createHistoryItem} from '../../lib/halpers'

function ConsolePage(props) {
  const {
    insertRequest,
    checkRequest,
    request,
    requestErrorStatus,
    formatRequest,
    insertAnswer,
    answer,
    answerErrorStatus,
    history,
    addRequestHistory
  } = props

  const [statusButton, setStatusButton] = useState('oк') // active, disabled, loading
  const [delta, setDelta] = useState(0)
  const [ResizingInProcess, setResizingInProcess] = useState(false)

  function inputRequestHandler(e) {
    insertRequest(e.target.value, false)
    setStatusButton('ok')
  }

  function formatRequestHandler() {
    checkRequest()

    if (validateJSON(request)) {
      formatRequest()
    } else {
      setStatusButton('disabled')
    }
  }

  function submitRequestHandler() {
    checkRequest()

    if (validateJSON(request)) {
      setStatusButton('loading')

      makeRequest(request)
        .then(res => {
          if (res.answer.id === "error/auth/failed") {
            history.push('/auth')

            return
          }

          setStatusButton('ok')
          insertAnswer(res.answer, res.errorStatus)
          addRequestHistory(createHistoryItem(request, res.errorStatus))
        })
    } else {
      setStatusButton('disabled')
    }
  }

  function resizeHandler(e) {
    const startResizeCoords = e.pageX
    setResizingInProcess(true)
    document.onmousemove = e => {
      const delta = startResizeCoords - e.pageX
      setDelta(delta)
    }

    document.onmouseup = () => {
      setResizingInProcess(false)
      document.onmousemove = null
      document.onmouseup = null
    }
  }

  return (
    <div className="console-wrap">
      <div className="header">
        <MainPanel />
        <HistoryPanel />
      </div>
      <div className="console-body">
        <CodePanel
          errorStatus={requestErrorStatus}
          label="Запрос:"
          onChange={inputRequestHandler}
          inputValue={request}
          delta={delta}
          codePanel="left"
          ResizingInProcess={ResizingInProcess}
        />
        <ResizePanel
          resize={resizeHandler}
        />
        <CodePanel
          errorStatus={answerErrorStatus}
          label="Ответ:"
          inputValue={answer}
          disabled={true}
          delta={delta}
          codePanel="right"
          ResizingInProcess={ResizingInProcess}
        />
      </div>
      <div className="footer">
        <Button
          type="button"
          name="Отправить"
          status={statusButton}
          click={submitRequestHandler}
        />
        <p className="bottom-link">
          <a
            className="githubLink"
            target="_blank"
            href="https://github.com/Kluivert9/api-console">
            github.com/Kluivert9/api-console
          </a>
        </p>
        <p
          className="format"
          onClick={formatRequestHandler}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
          Форматировать
        </p>
      </div>
    </div>

  );
}

function mapStateToProps(state) {
  return {
    request: state.consoleReducer.requestField.request,
    requestErrorStatus: state.consoleReducer.requestField.errorStatus,
    answer: state.consoleReducer.answerField.answer,
    answerErrorStatus: state.consoleReducer.answerField.errorStatus
  }
}

function mapDispatchToProps(dispatch) {
  return{
    insertRequest: request => dispatch(insertRequest(request)),
    checkRequest: () => dispatch(checkRequest()),
    formatRequest: () => dispatch(formatRequest()),
    insertAnswer: (answer, errorStatus) => dispatch(insertAnswer(answer, errorStatus)),
    addRequestHistory: item => dispatch(addRequestHistory(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConsolePage))
