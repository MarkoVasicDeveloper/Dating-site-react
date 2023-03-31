import './conversationRequest.scss'
import { faFaceKissBeam, faFaceRollingEyes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserInfo } from './userInfo/userInfo'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { type Gentleman, type Lady, selectUsersPhoto } from '../../../redux/user/userSlice'

interface RequestProps {
  conversationsWithUsers: Record<string, any>
}

export function ConversationRequest ({ conversationsWithUsers }: RequestProps): JSX.Element {
  const userPhoto = useTypedSelector(selectUsersPhoto)

  return (
        <section>
            {
                conversationsWithUsers === undefined || conversationsWithUsers.length === 0
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
