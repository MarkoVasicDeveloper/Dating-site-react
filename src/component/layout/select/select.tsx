import { useState } from 'react'
import './select.scss'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface selectOptions {
  title: string
  id: string
  options: string[] | number[] | Array<string | number>
  required?: boolean
  onChange: any
}

export function Select ({ title, id, options, required, onChange }: selectOptions): JSX.Element {
  const [dirty, setDirty] = useState(false)

  const { validation, message } = useFormValidation(onChange, 'select', dirty, required);

  return (
        <div className="select-container">
            <label htmlFor={id}>{title}</label>
            <select
                className="select-input"
                required={required}
                name={id}
                id={id}
                onChange={(e) => { validation(e) }}
                onFocus={() => { setDirty(true) }}
            >
                {
                    options.map((value: string | number, index: number) => <option className="option" key={index} value={value}>{value}</option>)
                }
            </select>
            <div>
                <span className="invalid-input-message">{message}</span>
            </div>
        </div>
  )
}
