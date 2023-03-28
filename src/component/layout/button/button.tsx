import { type ReactElement, useLayoutEffect, useState } from 'react'
import './button.scss'

interface ButtonProps {
  type?: 'submit' | 'button'
  title: any
  disabled?: boolean | undefined
  onClickFunction: any
  implementClass?: string
  titleFusnote?: string
  default?: boolean
}

export function Button (data: ButtonProps): ReactElement {
  const [implementClasses, setImplementClasses] = useState('')

  useLayoutEffect(() => {
    if (data.type === 'submit') { setImplementClasses((data.disabled ?? false) ? 'disabled' : 'succes-button'); return }
    if (data.implementClass != null) { setImplementClasses(data.implementClass); return }
    if (data.default ?? false) { setImplementClasses('default') }
  }, [data.disabled, data.default, data.implementClass, data.type])

  return (
        <button
            className = { implementClasses }
            type = { data.type ?? 'button' }
            disabled = { data.disabled }
            onClick = { data.onClickFunction }
            title = { data.titleFusnote }
        >{ data.title }</button>
  )
}
