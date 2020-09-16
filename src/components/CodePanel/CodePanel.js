import React, {useEffect, useRef, useState} from 'react'

export default function CodePanel(props) {
  const {
    errorStatus,
    label,
    onChange = null,
    inputValue,
    disabled = false,
    delta,
    codePanel,
    ResizingInProcess
  } = props

  const [panelWidth, setPanelWidth] = useState(0)
  const panelRef = useRef()

  useEffect(() => {
    if (delta) {
      if (codePanel == 'left') {
        panelRef.current.style.width = (panelWidth - delta) + 'px'
      } else {
        panelRef.current.style.width = (panelWidth + delta) + 'px'
      }
    }
  }, [delta])

  useEffect(() => {
    if (!ResizingInProcess) {
      setPanelWidth(panelRef.current.offsetWidth)
    }
  }, [ResizingInProcess])

  return (
    <div ref={panelRef} className={errorStatus ? "console-body__panel console-body__panel_error" : "console-body__panel"}>
      <span className="console-body__label">{label}</span>
      <textarea
        onChange={onChange}
        value={inputValue}
        disabled={disabled}
      />
    </div>
  )
}
