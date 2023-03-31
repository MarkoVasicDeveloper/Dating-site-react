/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-return-assign */
import { faChevronLeft, faChevronRight, faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useEffect, useState } from 'react'
import './gallery.scss'

interface GaleryProps {
  photos: any[]
  username: string
  city?: string
  path: string
  zIndex: number
  about?: {
    educations: string
    maritalStatus: string
    profession: string
  }
  years?: string
}

export function Gallery ({ photos, username, city, path, zIndex, about, years }: GaleryProps): JSX.Element {
  const galery = useRef(null) as any
  const img = useRef(null) as any
  const imgBar = useRef([]) as any
  const [currentImg, setCurrentImg] = useState(null) as any

  useEffect(() => {
    galery.current.style.transform = `translate(${currentImg * galery.current.offsetWidth}px)`
    if (img.current !== null) img.current.style.width = galery.current.offsetWidth / photos.length
    setCurrentImg(0)
  }, [zIndex])

  useEffect(() => {
    galery.current.style.transform = `translate(-${currentImg * galery.current.offsetWidth}px)`
    if (currentImg < 0) return
    imgBar.current.forEach((div: any) => {
      if (div !== null) div.classList.remove('active')
    })
    imgBar.current[currentImg]?.classList.add('active')
  }, [currentImg])

  function nextImg (value: number): void {
    if (zIndex === 0) return
    if (currentImg < 0 && value < 0) return setCurrentImg(0)
    if (currentImg === photos.length - 1 && value > 0) return
    if (value > 0) return setCurrentImg((prev: number) => prev + 1)
    setCurrentImg((prev: any) => prev - 1)
  }

  return (
        <>
            <div className="controls" style={{ zIndex: zIndex === 0 ? 0 : 2 }}>
                <span onClick={() => { nextImg(-1) }}><FontAwesomeIcon icon={faChevronLeft} /></span>
                <span onClick={() => { nextImg(1) }}><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>
            <div className="img-bar">
                {
                    photos?.map((photo, index) => (
                        <div ref={el => imgBar.current[index] = el} key={index} style={{ zIndex: zIndex === 0 ? 0 : 2 }}>{index + 1}</div>
                    ))
                }
            </div>
            <div className="galery" ref={galery}>
                {photos?.map((photo, index) => (
                    <img ref={img} key={index} src={`${path}/${username}/${photo.path}`} alt={username} />
                ))}
            </div>
            <div className="user-info">
                <div className="identity">
                    <span>{username}</span>
                    <span>{years}</span>
                </div>
                <div className="livesIn">
                    {city !== undefined ? <FontAwesomeIcon icon={faHouseFlag} /> : ''}
                    <span>{city}</span>
                </div>
                <div className="other">
                    <div>
                        {about?.educations !== undefined ? <FontAwesomeIcon icon={faSchool} /> : ''}
                        <span>{about?.educations}</span>
                    </div>
                    <div>
                        {about?.maritalStatus !== undefined ? <FontAwesomeIcon icon={faHeartCircleBolt} /> : ''}
                        <span>{about?.maritalStatus}</span>
                    </div>
                    <div>
                        {about?.profession !== undefined ? <FontAwesomeIcon icon={faUserAstronaut} /> : ''}
                        <span>{about?.profession}</span>
                    </div>
                </div>
            </div>
        </>
  )
}
