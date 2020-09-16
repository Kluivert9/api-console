import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {addAllRequestHistory, addRequestHistory, removeHistory, removeHistoryItem} from '../../store/actions/history'
import HistoryItem from '../../components/HistoryItem'
import {insertAnswer, insertRequest} from '../../store/actions/console'
import {createHistoryItem, horizontalScroll} from '../../lib/halpers'
import {makeRequest} from '../../lib/services'

function HistoryPanel(props) {
  const {
    historyItems,
    addAllRequestHistory,
    insertRequest,
    removeHistory,
    removeHistoryItem,
    insertAnswer,
    addRequestHistory,
    history
  } = props

  const horizontalScrollRef = useRef()

  useEffect(() => {
    const history = localStorage.getItem('history') || '[]'
    addAllRequestHistory(JSON.parse(history))

    horizontalScrollRef.current.addEventListener('wheel', horizontalScroll)

    return () => {
      horizontalScrollRef.current.removeEventListener('wheel', horizontalScroll)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(historyItems))
  }, [historyItems])

  function insertHistoryRequestHandler(request) {
    insertRequest(JSON.stringify(request, null, 2), false)
  }

  function removeHistoryHandler() {
    removeHistory()
  }

  function removeHistoryItemHandler(id) {
    removeHistoryItem(id)
  }

  function makeRequestHandler(request) {
    insertHistoryRequestHandler(request)

    makeRequest(JSON.stringify(request))
      .then(res => {
        if (res.answer.id === "error/auth/failed") {
          history.push('/auth')

          return
        }

        insertAnswer(res.answer, res.errorStatus)
        addRequestHistory(createHistoryItem(JSON.stringify(request), res.errorStatus))
      })
  }

  const items = historyItems.map((item, idx) => {
    return (
      <HistoryItem
        key={item.id}
        errorStatus={item.errorStatus}
        action={item.action}
        itemClick={() => insertHistoryRequestHandler(item.body)}
        removeItem={() => removeHistoryItemHandler(idx)}
        makeRequest={() => makeRequestHandler(item.body)}
        clipboardData={JSON.stringify(item.body, null, 2)}
      />
    )
  })

  return (
    <div className="action-panel">
      <div className="action-panel__horizontal-scroll-wrap" id="horizontal-scroll" ref={horizontalScrollRef}>
        {items}
      </div>
      <div
        className="action-panel__close-history"
        onClick={removeHistoryHandler}
      >
        <div className="action-panel__joint"></div>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    historyItems: state.historyReducer.historyItems
  }
}

function mapDispatchToProps(dispatch) {
  return{
    insertRequest: request => dispatch(insertRequest(request)),
    addAllRequestHistory: (allHistory) => dispatch(addAllRequestHistory(allHistory)),
    removeHistory: () => dispatch(removeHistory()),
    removeHistoryItem: id => dispatch(removeHistoryItem(id)),
    insertAnswer: (answer, errorStatus) => dispatch(insertAnswer(answer, errorStatus)),
    addRequestHistory: item => dispatch(addRequestHistory(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HistoryPanel))
