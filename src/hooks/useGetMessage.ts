import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiRequest, type ApiResponse } from '../api/apiRequest'
import { userData } from '../redux/user/userSlice'

export function useGetMessage (id: number, role: 'lady' | 'gentleman' | 'gentlemanPremium' | 'gentlemanVip' | 'administrator'): void {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id === undefined || role === undefined) return
    const messageResponse = async (): Promise<ApiResponse> => await apiRequest(`api/${id}/${role}`, 'get', null, role)

    messageResponse()
      .then((res) => {
        dispatch(userData({ message: res.data }))
      })
      .catch(() => { navigate('/', { replace: true }) })
    // messageResponse.data.forEach((user: { unreadMessage: [] }) => {
    //   if (user.unreadMessage) setUnreadedMessage((prev: number) => prev + user.unreadMessage.length)
    // })
  }, [])
}
