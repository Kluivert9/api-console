import React from 'react'
import Loader from '../Loader'

export default function Button({type, name, status, click = null}) {  // active, disabled, loading
  return (
    <button type={type}
            className="button"
            disabled={status === 'disabled'}
            onClick={click}
    >
      {status === 'loading' ? <Loader /> : name}
    </button>
  )
}
