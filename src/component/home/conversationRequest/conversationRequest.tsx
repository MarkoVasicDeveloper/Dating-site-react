import './conversationRequest.scss'
import { faFaceKissBeam, faFaceRollingEyes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserInfo } from './userInfo/userInfo'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { type Gentleman, type Lady, selectUsersPhoto } from '../../../redux/user/userSlice'
import { useEffect } from 'react'

interface RequestProps {
  conversationsWithUsers: Record<string, any>
  removeRequest: any
}

export function ConversationRequest ({ conversationsWithUsers, removeRequest }: RequestProps): JSX.Element {
  const userPhoto = useTypedSelector(selectUsersPhoto)
  useEffect(() => { console.log(conversationsWithUsers) }, [])
  return (
        <section>
            {
                conversationsWithUsers === undefined
                  ? <div className='request-container'>
                        <h2>Nemate zahteva za povezivanje.</h2>
                        <span><FontAwesomeIcon icon={faFaceRollingEyes} /></span>
                    </div>
                  : <div className='request-container'>
                        <h2>Zahtevi za povezivanje! <span><FontAwesomeIcon icon={faFaceKissBeam} /></span></h2>
                        <div className="request">
                            {
                                conversationsWithUsers.map((conversation: Lady | Gentleman, index: number) => (
                                    <UserInfo
                                      key={index}
                                      removeRequest={removeRequest}
                                      index={index}
                                      conversation={conversation}
                                      usersPhotos={userPhoto} />
                                ))
                            }
                        </div>
                    </div>
            }
        </section>
  )
}
