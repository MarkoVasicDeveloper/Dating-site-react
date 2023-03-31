import { faCalendarDays, faHeart, faHouseFlag, faTabletButton } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Gallery } from '../../main/showUser/gallery/gallery'
import './profile.scss'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { selectUserRole } from '../../../../redux/user/userSlice'
import { maritalStatus } from '../../../../misc/translate'
interface ProfileProps {
  userData: any
}

export function Profile ({ userData }: ProfileProps): JSX.Element {
  const userRole = useTypedSelector(selectUserRole)

  return (
        <section id="profile-section">
            <div className="title">
                <h2>{userData.username}</h2>
                <span>{new Date().getFullYear() - userData.dateOfBirth.slice(-4)}</span>
            </div>

            <div className="profile-galery">
                <Gallery photos={[]} username={userData.username} path={''} zIndex={0} />
            </div>

            <div className="basic-info">
                <h3>Osnovne informacije:</h3>
                <div>
                    <div>
                        {userData.city !== undefined ? <FontAwesomeIcon icon={faHouseFlag} /> : ''}
                        <span>Zivi u </span>
                        <span>{userData.city}</span>
                    </div>
                    <div>
                        {userData !== undefined ? <FontAwesomeIcon icon={faCalendarDays} /> : ''}
                        <span>Ima </span>
                        <span>{new Date().getFullYear() - userData.dateOfBirth.slice(-4)} godina</span>
                    </div>

                    <div>
                        {userData !== undefined ? <FontAwesomeIcon icon={faHeart} /> : ''}
                        <span>Bracno stanje </span>
                        <span>{userRole !== 'lady' ? maritalStatus[userData.ladyAbouts[0].maritalStatus] : maritalStatus[userData.gentlemanAbouts[0].maritalStatus]}</span>
                    </div>
                    <div>
                        {userData.lastLogIn !== undefined ? <FontAwesomeIcon icon={faTabletButton} /> : ''}
                        <span>Aktivan: </span>
                        <span>{userData.lastLogIn.slice(0, -5).replace('T', ' ')}</span>
                    </div>
                </div>
            </div>
            <div className="basic-info">
              <h3>Jos informacije:</h3>

              <div>
                <div>
                    {userData.ladyAbouts !== undefined || userData.gentlemanAbouts !== undefined ? <FontAwesomeIcon icon={faTabletButton} /> : ''}
                    <span>O sebi : </span>
                    <span>{userRole !== 'lady' ? userData.ladyAbouts[0].about : userData.gentlemanAbouts[0].about}</span>
                </div>

                <div>
                    {userData.ladyAbouts !== undefined || userData.gentlemanAbouts !== undefined ? <FontAwesomeIcon icon={faTabletButton} /> : ''}
                    <span>Zeli da upozna : </span>
                    <span>{userRole !== 'lady' ? userData.ladyAbouts[0].aboutThePerson : userData.gentlemanAbouts[0].aboutThePerson}</span>
                </div>
              </div>
            </div>
        </section>
  )
}
