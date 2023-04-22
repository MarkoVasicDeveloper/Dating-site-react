import { useFormValidation } from '../../../hooks/useFormValidation'
import './textarea.scss'
import { useState } from 'react'

interface textareaProps {
  title: string
  id: string
  required?: boolean
  onChange: any
}

export function Textarea ({ title, id, required, onChange }: textareaProps): JSX.Element {
  const [dirty, setDirty] = useState(false);

  const { validation, message, invalid } = useFormValidation(onChange, 'textarea', dirty, required);

  return (
        <div className='textarea-container'>
            <label htmlFor={id}>{title}</label>
            <textarea
                onChange={(e) => { validation(e) }}
                required={required}
                className={invalid ? 'input-invalid' : 'default-input' }
                name={id}
                id={id}
                rows={6}
                minLength={50}
                onFocus = {() => { setDirty(true) }}
                onBlur = {(e) => { validation(e) }}
            />
            <div>
                <span className='invalid-input-message'>{message}</span>
            </div>
        </div>
  )
}
