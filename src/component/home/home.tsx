/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetConversation } from '../../hooks/useGetConversation'
import { useGetMessage } from '../../hooks/useGetMessage'
import { useGetUser } from '../../hooks/useGetUser'
import { faUser, faSearch, faGift, faMessage, faLink } from '@fortawesome/free-solid-svg-icons'
import './home.scss'
import { AccountButton } from './accountButton/accountButton'
import { useState } from 'react'
import { Button } from '../layout/button/button'
import { Modal } from '../modal/modal'
import { ConversationRequest } from './conversationRequest/conversationRequest'
import { Account } from './account/account'
import { Main } from './main/main'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectUserConversationRequest } from '../../redux/user/userSlice'
import { Search } from './main/search/search'

export function Home (): JSX.Element {
  const user = useGetUser()
  const conversationsWithUsers = useTypedSelector(selectUserConversationRequest)
  useGetConversation(user)
  useGetMessage(user.id, user.role)

  const [openAccount, setOpenAccount] = useState(false)
  const [openConversationRequest, setOpenConversationRequest] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  return (
      <section id="home">
        <div className="bar">
          <div className="nav">
            <nav>
              <AccountButton title={user.username} icon={<FontAwesomeIcon icon={faUser} />} onClick={() => { setOpenAccount(!openAccount) }} />
              <div className="otherButtons">
                <Button titleFusnote="Pretrazi" implementClass="iconButtons" onClickFunction={() => { setOpenSearch(!openSearch) }} title={<FontAwesomeIcon icon={faSearch} />} />
                <Button titleFusnote="Posalji poklon" implementClass="iconButtons" onClickFunction={() => { setOpenAccount(!openAccount) }} title={<FontAwesomeIcon icon={faGift} />} />
                {/* <div className={unreadedMesssage === 0 ? 'hidden' : 'notification'}> */}
                  {/* <span>{unreadedMesssage}</span> */}
                  <Button titleFusnote="Poruke" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faMessage} />} />
                {/* </div> */}
                <div className={conversationsWithUsers === undefined || conversationsWithUsers.length === 0 ? 'hidden' : 'notification'}>
                  <span>{conversationsWithUsers?.length}</span>
                  <Button titleFusnote="Zahtevi za dopisivanje" implementClass="iconButtons" onClickFunction={() => { setOpenConversationRequest(!openConversationRequest) }} title={<FontAwesomeIcon icon={faLink} />} />
                </div>
              </div>
            </nav>
          </div>
          <div className="bar-content"></div>
        </div>
        <div className="main">
          {
            openSearch ? <Search onClick={() => setOpenSearch(!openSearch)}/> : <Main />
          }
          <Modal open={openAccount} close={() => { setOpenAccount(!openAccount) }} >
            <Account />
          </Modal>
          <Modal open={openConversationRequest} close={() => { setOpenConversationRequest(!openConversationRequest) }}>
            <ConversationRequest conversationsWithUsers={conversationsWithUsers}/>
          </Modal>
        </div>
      </section>
  )
}
