import { useState } from 'react'
import { useTypedSelector } from './useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { selectUserRole } from '../redux/user/userSlice'
import { type ApiResponse, apiRequest } from '../api/apiRequest'

export function useSearch (): {
  array: never[]
  filteredArray: (arg: string) => void
} {
  const userRole = useTypedSelector(selectUserRole)

  const [array, setArray] = useState([])

  const navigate = useNavigate()

  function delay (cb: (text: string) => void, delay: number): (arg: string) => void {
    let timeout: string | number | NodeJS.Timeout | undefined

    return (arg: string) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => { cb(arg) }, delay)
    }
  };

  const filter = (text: string): void => {
    if (text === '') return
    const searchRequest = async (): Promise<ApiResponse> => await apiRequest(
      `api/search/${userRole === 'lady' ? 'gentleman' : 'lady'}/${text}/91`,
      'get',
      null,
      userRole
    )
    searchRequest()
      .then((res) => {
        if (res.status === 'error') { navigate('/', { replace: true }); return }
        setArray(res.data)
      })
      .catch(() => { navigate('/', { replace: true }) })
  }

  const filteredArray = delay((text: string) => { filter(text) }, 250)

  return { array, filteredArray }
}
