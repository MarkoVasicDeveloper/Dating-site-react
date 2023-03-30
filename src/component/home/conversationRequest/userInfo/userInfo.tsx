/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../../layout/button/button'
import { useState } from 'react'
import './userInfo.scss'
import { Modal } from '../../../modal/modal'
import { Profile } from '../profile/profile'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { type Gentleman, type Lady, selectUser } from '../../../../redux/user/userSlice'
import { useAcceptDenyConversation } from '../../../../hooks/useAcceptDenyConversation'

interface UserInfoProps {
  conversation: Lady | Gentleman | any
  usersPhotos: string
  index: number
  removeRequest: (index: number) => void
}

export function UserInfo ({ conversation, usersPhotos, index, removeRequest }: UserInfoProps): JSX.Element {
  const user = useTypedSelector(selectUser)

  const { hide, sendAcceptDenyRequest } = useAcceptDenyConversation({ user, conversation, removeRequest, index })
  const [profile, setProfile] = useState(false)

  return (
        <div className={hide ? 'hide' : 'user-request'}>
            <div className="user-request-img">
                <img src={`${usersPhotos}/${conversation.username}/${user.role === 'lady' ? conversation.photosGentlemen[0]?.path : conversation.photosLadies[0]?.path}`} alt={conversation.username} />
            </div>
            <div className="user-request-info">
                <div>
                    <span>{conversation.username} </span>
                    <span>{new Date().getFullYear() - Number(conversation.dateOfBirth.slice(-4))}</span>
                </div>
                <div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faHouseFlag} />
                            <span>{conversation.city}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSchool} />
                            <span>{user.role === 'lady' ? conversation.gentlemanAbouts[0]?.educations : conversation.ladyAbouts[0]?.educations}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faHeartCircleBolt} />
                            <span>{user.role === 'lady' ? conversation.gentlemanAbouts[0]?.maritalStatus : conversation.ladyAbouts[0]?.maritalStatus}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserAstronaut} />
                            <span>{user.role === 'lady' ? conversation.gentlemanAbouts[0]?.profession : conversation.ladyAbouts[0]?.profession}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="options">
                <div>
                    <Button implementClass="danger-button" title={'ODBI'} onClickFunction={async () => { await sendAcceptDenyRequest(false) }} />
                    <Button implementClass="safe" title={'Vidi profil'} onClickFunction={() => { setProfile(!profile) }} />
                </div>
                <div>
                    <Button type='submit' title={'Prihvati'} onClickFunction={async () => { await sendAcceptDenyRequest(true) }} />
                </div>
            </div>
            <Modal open={profile} close={() => { setProfile(!profile) }} >
                <Profile user={conversation} />
            </Modal>
        </div>
  )
}
