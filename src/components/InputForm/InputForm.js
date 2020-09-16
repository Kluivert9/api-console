import React from 'react'

export default function InputForm({name, isValid, label, type, textInput, value, optional = null}) {
  return (
    <>
      <label
        htmlFor={name}
        className={isValid ? "auth-form__label" : "auth-form__label auth-form__label_error"}>
        {label}
      </label>
      {optional && <span className="auth-form__optional">{optional}</span>}
      <input
        type={type}
        id={name}
        onChange={textInput}
        value={value}
        className={isValid ? "auth-form__input" : "auth-form__input auth-form__input_error"}/>
    </>
  )
}
