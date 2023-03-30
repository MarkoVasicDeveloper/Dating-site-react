// import { faCalendarDays, faHouseFlag } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from 'react'
// import { Gallery } from "../../main/showUser/gallery/gallery";
import './profile.scss'

export function Profile ({ userData }: any): JSX.Element {
  useEffect(() => {
    console.log(userData)
  }, [])

  return (
        <section id="profile-section">
            <div className="title">
                <h2>{userData.username}</h2>
                {/* <span>{new Date().getFullYear() - userData.dateOfBirth.slice(-4)}</span> */}
            </div>

            <div className="profile-galery">
                {/* <Gallery photos={[]} username={userData.username} path={""} zIndex={0} /> */}
            </div>

            <div className="basic-info">
                <h3>Osnovne informacije:</h3>
                <div>
                    <div>
                        {/* {userData.city ? <FontAwesomeIcon icon={faHouseFlag} /> : ''} */}
                        <span>Zivi u </span>
                        <span>{userData.city}</span>
                    </div>
                    <div>
                        {/* {userData.city ? <FontAwesomeIcon icon={faCalendarDays} /> : ''} */}
                        <span>Ima </span>
                        <span>{new Date().getFullYear() - userData.dateOfBirth.slice(-4)} godina</span>
                    </div>

                    <div>
                        {/* {userData.city ? <FontAwesomeIcon icon={faHouseFlag} /> : ''} */}
                        <span>Bracno stanje </span>
                        {/* <span>{user.role === 'lady' ? }</span> */}
                    </div>
                    <div>
                        {/* {userData.city ? <FontAwesomeIcon icon={faHouseFlag} /> : ''} */}
                        <span>{userData.city}</span>
                    </div>
                </div>
            </div>
        </section>
  )
}
