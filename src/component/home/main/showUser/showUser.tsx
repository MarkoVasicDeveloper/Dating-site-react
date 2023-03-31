import { useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { maritalStatus, schoolStatus } from '../../../../misc/translate'
import { selectUserRole } from '../../../../redux/user/userSlice'
import { Gallery } from './gallery/gallery'
import './showUser.scss'

interface ShowUserProps {
  path: string
  usersArray: any
  zIndex: number
  display: number
  end: boolean
}

export function ShowUser ({ path, usersArray, zIndex, display, end }: ShowUserProps): JSX.Element {
  const userRole = useTypedSelector(selectUserRole)

  const hide = useRef(null) as any
  const didMountRef = useRef(false)

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (end && display === usersArray.length) return
    if (zIndex === 1 && display === 0) { setIndex(display); return }
    if (zIndex === 1) { setIndex(display); return }

    const pause = setInterval(() => { setIndex(display + 1) }, 500)

    return () => { clearInterval(pause) }
  }, [display])

  useEffect(() => {
    if (end && display === usersArray.length) return
    if (zIndex === 1 && !didMountRef.current) {
      didMountRef.current = true
      return
    };
    if (zIndex === 0 && !didMountRef.current) {
      hide?.current.classList.remove('show')
      didMountRef.current = true
      return
    }

    if (zIndex === 1) {
      hide?.current.classList.remove('hideItAnimation')
    }
    if (zIndex === 0) {
      hide?.current.classList.add('hideItAnimation')
      hide?.current.classList.remove('show')
    }
  }, [zIndex])

  const about = userRole === 'lady' ? usersArray[index]?.gentlemanAbouts[0] : usersArray[index]?.ladyAbouts[0]

  const props = {
    zIndex,
    photos: userRole === 'lady' ? usersArray[index]?.photosGentlemen : usersArray[index]?.photosLadies,
    username: usersArray[index]?.username,
    city: usersArray[index]?.city,
    path,
    about: {
      educations: schoolStatus[about?.educations],
      maritalStatus: maritalStatus[about?.maritalStatus],
      profession: about?.profession
    },
    years: String(new Date().getFullYear() - usersArray[index]?.dateOfBirth.slice(-4))
  }

  return (
        <div ref={hide} className="card-container show">
            <Gallery {...props} />
        </div>
  )
}
