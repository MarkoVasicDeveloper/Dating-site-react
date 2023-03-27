import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useInputText } from '../../hooks/useInputText'
import { useLoginCheck } from '../../hooks/useLoginCheck'

import { Button } from '../layout/button/button'
import { Input } from '../layout/input/input'

import { Modal } from '../modal/modal'
import { ResetPassword } from '../resetPassword/resetPassword'

import './login.scss'

export function LogIn (): JSX.Element {
  const navigate = useNavigate()

  const { data, edit } = useInputText({})
  const { sendData, message } = useLoginCheck()

  const [disabledButton, setDisabledButton] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (data?.username?.length >= 3 && data.password?.length >= 6 && data?.role !== undefined) { setDisabledButton(false); return }
    setDisabledButton(true)
  }, [data])

  return (
        <>
        <section id='login-page'>
            <h1 id='title'>Dzentleman i dama</h1>
            <form>
                <h2>Log in</h2>
                <div className="message">
                    <span className='important-message'>{message}</span>
                </div>
                <Input required id='username' name='username' title='Korisnicko ime:' onChangeInput={edit} />
                <Input required id='password' name='password' title='Lozinka:' type='password' onChangeInput={edit} />
                <div className='radio-inputs'>
                    <Input required id='lady' name='role' title='Dama:' type='radio' footnoteTitle='Izaberite ulogu!' onChangeInput={edit}/>
                    <Input required id='gentleman' name='role' title='Dzentlman:' type='radio' footnoteTitle='Izaberite ulogu!' onChangeInput={edit}/>
                </div>
                <div className="submit">
                    <Button title={'Zaboravili ste lozinku?'} implementClass='linkButton' onClickFunction={() => { setOpenModal(true) }} />
                    <Button title={'Prijavi se'} type = 'submit' onClickFunction={(event: React.ChangeEvent) => { sendData(data, event) } } disabled = {disabledButton} />
                </div>
                <Button title={'Nemate nalog?'} onClickFunction={() => { navigate('/singup') }} implementClass='createAccauntButton' />
            </form>
        </section>
        <Modal open={openModal} close={() => { setOpenModal(false) }} >
            <ResetPassword />
        </Modal>
        </>
  )
}
