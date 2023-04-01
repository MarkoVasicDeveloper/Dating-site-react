import { faArrowCircleLeft, faGift, faMessage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useGetUsersArray } from '../../../hooks/useGetUsersArray'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { selectUsersPhoto } from '../../../redux/user/userSlice'
import { selectUsersArray } from '../../../redux/users/usersSlice'
import { Button } from '../../layout/button/button'
import { Modal } from '../../modal/modal'
import './main.scss'
import { MessageRequest } from './messageRequest/messageRequest'
import { Shop } from './shop/shop'
import { ShowUser } from './showUser/showUser'

export function Main (): JSX.Element {
  const [page, setPage] = useState(1)

  const usersPhotosDestination = useTypedSelector(selectUsersPhoto)
  const usersArray = useTypedSelector(selectUsersArray)
  useGetUsersArray(page)

  const [display, setDisplay] = useState(0)
  const [end, setEnd] = useState(false)
  const [sendMessageReguest, setSendMessageRequest] = useState(false)
  const [shop, setShop] = useState(false)

  function displayUser (value: number): void {
    if (display + 2 === usersArray.length) setPage((prev: number) => prev + 1)
    if (value < 0 && display === 0) return
    if (value < 0 && display > 0) { setDisplay((prev: number) => prev - 1); return }
    if (usersArray.length - 1 === display) { setEnd(true); return }
    setDisplay((prev: number) => prev + 1)
  }

  const showUserProps = {
    path: usersPhotosDestination,
    usersArray,
    display,
    end
  }

  return (
        <>
            <div className="main-container">
                {
                    usersArray.length > 0
                      ? <div className="card">
                            <ShowUser {...showUserProps} zIndex={display % 2 === 0 ? 1 : 0} />
                            <ShowUser {...showUserProps} zIndex={(display + 1) % 2 === 0 ? 1 : 0}/>
                            <div className="user-info-button">
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faArrowCircleLeft} />} onClickFunction={() => { displayUser(-1) }} />
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faXmark} />} onClickFunction={() => { displayUser(1) }} />
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faMessage} />} onClickFunction={() => { setSendMessageRequest(!sendMessageReguest) }} />
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faGift} />} onClickFunction={() => { setShop(!shop) }} />
                            </div>
                        </div>
                      : <h1>Loading!</h1>
                }
            </div>
            <Modal open={sendMessageReguest} close={() => { setSendMessageRequest(!sendMessageReguest) }}>
                <MessageRequest destination={usersArray[display]} />
            </Modal>
            <Modal open={shop} close={() => { setShop(!shop) }} >
                <Shop />
            </Modal>
        </>
  )
}
