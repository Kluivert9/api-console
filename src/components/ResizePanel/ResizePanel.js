import React from 'react'

export default function ResizePanel({resize}) {
  return (
    <div
      className="console-body__resize-panel qwe"
      onMouseDown={resize}
    >
      <i
        className="fa fa-ellipsis-v console-body__ellipsis"
        aria-hidden="true"
      ></i>
    </div>
  )
}
