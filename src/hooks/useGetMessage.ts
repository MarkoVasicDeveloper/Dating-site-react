import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiRequest, type ApiResponse } from '../api/apiRequest'
import { unreadedMessage, userData } from '../redux/user/userSlice'

export function useGetMessage (id: number, role: 'lady' | 'gentleman' | 'gentlemanPremium' | 'gentlemanVip' | 'administrator'): void {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id === undefined || role === undefined) return
    const messageResponse = async (): Promise<ApiResponse> => await apiRequest(`api/${id}/${role}`, 'get', null, role)

    messageResponse()
      .then((res) => {
        dispatch(userData({ message: res.data }))
        res.data.forEach((message: { unreadMessage: [] }) => {
          if (message.unreadMessage !== null) dispatch(unreadedMessage(message.unreadMessage))
        })
      })
      .catch(() => { navigate('/', { replace: true }) })
  }, [])
}
