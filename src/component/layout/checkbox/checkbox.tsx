import { useState } from 'react'
import './checkbox.scss'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface checkboxInput {
  id: string
  onChange: any
  value: string
  title: string
  required?: boolean
  implementClass?: string
}

export function Checkbox ({ id, onChange, value, title, required, implementClass }: checkboxInput): JSX.Element {
  const [dirty, setDirty] = useState(false)

  const { validation, message } = useFormValidation(onChange, 'checkbox', dirty, required, value);

  return (
        <div className="checkbox-container">
            <input
                className='checkedbox'
                type="checkbox"
                name={id}
                id={id}
                value={value}
                onChange={(e) => { validation(e) }}
                required={required}
                onFocus = {() => { setDirty(true) }}
            />
            <label className={implementClass} htmlFor={id}>{title}</label>
            <div><span className='invalid-input-message'>{message}</span></div>
        </div>
  )
}
