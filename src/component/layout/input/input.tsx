/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { formValidation } from '../../../misc/formValidation'
import './input.scss'

interface InputParam {
  onChangeInput: any
  type?: string
  name: any
  id: string
  required?: boolean
  title: string
  footnoteTitle?: string
  placeholder?: string
}

export function Input ({ onChangeInput, type, name, id, title, required, footnoteTitle, placeholder }: InputParam) {
  const [message, setMessage] = useState(' ')
  const [invalid, setInvalid] = useState(false)
  const [dirty, setDirty] = useState(false)

  function validation (
    event: React.ChangeEvent<HTMLInputElement> |
    React.FocusEvent<HTMLInputElement, Element>) {
    const validationResult = formValidation(event.target.value, name, dirty, required)

    if (!validationResult.valid) {
      setMessage(validationResult.value)
      setInvalid(true)
      onChangeInput(event)
      return
    }

    setInvalid(false)
    setMessage('')
    onChangeInput(event)
  }

  return (
        <div className={ type === 'radio' ? 'input-div radio' : 'input-div'}>
            <label htmlFor={ id } title = { footnoteTitle }>{ title }</label>
            <input
                className={ invalid ? 'input-invalid' : 'default-input'}
                name = { name }
                type = { type ?? 'text'}
                onChange={(event) => { validation(event) }}
                id = { id }
                onFocus = {() => { setDirty(true) }}
                onBlur = {(event) => { validation(event) }}
                value = { type === 'radio' ? id : undefined }
                title = { footnoteTitle }
                placeholder = { placeholder }
            />
            <span className='invalid-input-message'>{message}</span>
        </div>
  )
}
