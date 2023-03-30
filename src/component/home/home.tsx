/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetConversation } from '../../hooks/useGetConversation'
import { useGetMessage } from '../../hooks/useGetMessage'
import { useGetUser } from '../../hooks/useGetUser'
// import { apiRequest, type ApiResponse } from '../../api/apiRequest'
// import { useTypedSelector } from '../../hooks/useTypedSelector'
// import { selectUser } from '../../redux/user/userSlice'
// import { Button } from '../layout/button/button'
import { faUser, faSearch, faGift, faMessage, faLink } from '@fortawesome/free-solid-svg-icons'
import './home.scss'
// import { library } from '@fortawesome/fontawesome-svg-core'
import { AccountButton } from './accountButton/accountButton'
import { useState } from 'react'
import { Button } from '../layout/button/button'
import { Modal } from '../modal/modal'
import { ConversationRequest } from './conversationRequest/conversationRequest'
// import { Main } from './main/main'
// import { Modal } from '../modal/modal'
// import { Account } from './account/account'
// import { apiRequest } from '../../api/apiRequest'
// import { useNavigate } from 'react-router-dom'
// import { ConversationRequest } from './conversationRequest/conversationRequest'

// library.add(faUser, faSearch, faGift, faMessage)

export function Home (): JSX.Element {
  const user = useGetUser()
  useGetConversation(user)
  useGetMessage(user.id, user.role)

  const [openAccount, setOpenAccount] = useState(false)
  // const [unreadedMesssage, setUnreadedMessage] = useState(0)
  // const [conversationRequest, setConversationRequest] = useState(0) as any
  // const [conversation, setConversation] = useState()
  const [openConversationRequest, setOpenConversationRequest] = useState(false)
  // const [requestInfo, setRequestInfo] = useState([]) as any

  // const navigate = useNavigate()

  // function removeRequest (index: number): void {
  //   setConversationRequest((prev: number) => prev - 1)
  //   requestInfo.splice(index, 1)
  // }

  return (
      <section id="home">
        <div className="bar">
          <div className="nav">
            <nav>
              <AccountButton title={user.username} icon={<FontAwesomeIcon icon={faUser} />} onClick={() => { setOpenAccount(!openAccount) }} />
              <div className="otherButtons">
                <button onClick={() => { console.log(user) }} >sss</button>
                <Button titleFusnote="Pretrazi" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faSearch} />} />
                <Button titleFusnote="Posalji poklon" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faGift} />} />
                {/* <div className={unreadedMesssage === 0 ? 'hidden' : 'notification'}> */}
                  {/* <span>{unreadedMesssage}</span> */}
                  <Button titleFusnote="Poruke" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faMessage} />} />
                {/* </div> */}
                <div className={user.conversationRequest === null ? 'hidden' : 'notification'}>
                  <span>{user.conversationRequest?.length}</span>
                  <Button titleFusnote="Zahtevi za dopisivanje" implementClass="iconButtons" onClickFunction={() => { setOpenConversationRequest(!openConversationRequest) }} title={<FontAwesomeIcon icon={faLink} />} />
                </div>
              </div>
            </nav>
          </div>
          <div className="bar-content"></div>
        </div>
        <div className="main">
          {/* <Main /> */}
          {/* <Modal open={openAccount} close={() => { setOpenAccount(!openAccount) }} >
            <Account />
          </Modal> */}
          <Modal open={openConversationRequest} close={() => { setOpenConversationRequest(!openConversationRequest) }}>
            <ConversationRequest removeRequest={undefined} conversationsWithUsers={user.conversationsWithUsers}/>
          </Modal>
        </div>
      </section>
  )
}
