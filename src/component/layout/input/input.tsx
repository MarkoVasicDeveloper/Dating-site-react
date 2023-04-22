import { useState } from 'react'
import './input.scss'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface InputParam {
  onChangeInput: any
  onEnter?: any
  type?: string
  name: any
  id: string
  required?: boolean
  title: string
  footnoteTitle?: string
  placeholder?: string
}

export function Input ({ onChangeInput, onEnter, type, name, id, title, required, footnoteTitle, placeholder }: InputParam): JSX.Element {
  const [dirty, setDirty] = useState(false)

  const { validation, message, invalid } = useFormValidation(onChangeInput, name, dirty, required);

  function setOnEnter (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).value = ''
      onChangeInput(name)
      onEnter();
    }
  }

  return (
        <div className={ type === 'radio' ? 'input-div radio' : 'input-div'}>
            <label htmlFor={ id } title = { footnoteTitle }>{ title }</label>
            <input
                className={ invalid ? 'input-invalid' : 'default-input'}
                name = { name }
                type = { type ?? 'text'}
                onChange={(event) => { validation(event) }}
                onKeyUp={(event) => { setOnEnter(event) }}
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
