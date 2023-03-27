/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { useInputText } from '../../hooks/useInputText'
import { useResetLink } from '../../hooks/useResetLink'
import { Button } from '../layout/button/button'
import { Input } from '../layout/input/input'
import './resetPassword.scss'

export function ResetPassword (): JSX.Element {
  const { data, edit } = useInputText({})
  const [disabled, setDisabled] = useState(true)
  const { resetLink, message } = useResetLink(data, { status: 'ok', message: '' })

  useEffect(() => {
    if (data.email !== undefined && data.email !== '' && data.role !== undefined) { setDisabled(false); return }
    setDisabled(true)
  }, [data])

  return (
      <div className="resetPasswordContainer">
          <h2>Resetuj lozinku</h2>
          <Input onChangeInput={edit} name={'email'} id={'email'} title={'Email:'} required />
          <div className='radio-inputs'>
              <Input required id='lady' name='role' title='Dama:' onChangeInput={edit} type='radio' footnoteTitle='Izaberite ulogu!'/>
              <Input required id='gentleman' name='role' title='Dzentlman:' onChangeInput={edit} type='radio' footnoteTitle='Izaberite ulogu!'/>
          </div>
          <span className={message.status === 'ok' ? 'succes-message' : 'invalid-input-message'} >{message.message}</span>
          <div className="submit-button">
              <Button type="submit" disabled = {disabled} title={'Posalji'} onClickFunction={resetLink} />
          </div>
      </div>
  )
}
