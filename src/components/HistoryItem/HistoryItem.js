import React, {useRef} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Dropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function HistoryItem(props) {
  const {
    errorStatus,
    action,
    itemClick,
    removeItem,
    makeRequest,
    clipboardData
  } = props

  const itemRef = useRef()

  function addMessageCopy() {
    itemRef.current.classList.toggle('action-panel__text-copy_inner')
    setTimeout(() => itemRef.current.classList.toggle('action-panel__text-copy_inner'), 1500)
  }

  return (
    <div className="action-panel__history-item">
      <div
        className="action-panel__history-item-wrap"
        onClick={itemClick}
      >
        <div className={errorStatus ? "action-panel__circle action-panel__circle_error" : "action-panel__circle"}></div>
        <div className="action-panel__action-text-wrap">
          <div className="action-panel__text-copy" ref={itemRef}>Скопировано</div>
          {action}
        </div>
      </div>
        <Dropdown className="dropdown-component">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={makeRequest}
              className="dropdown-component__action"
            >Выполнить</Dropdown.Item>
            <CopyToClipboard text={clipboardData}>
              <Dropdown.Item
                className="dropdown-component__action"
                onClick={addMessageCopy}
              >Скопировать</Dropdown.Item>
            </CopyToClipboard>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={removeItem}
              className="dropdown-component__action-delete"
            >Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

const CustomToggle = React.forwardRef(({onClick}, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {e.preventDefault(); onClick(e)}}
  >
    <i className="fa fa-ellipsis-v action-panel__ellipsis" aria-hidden="true"></i>
  </a>
))
