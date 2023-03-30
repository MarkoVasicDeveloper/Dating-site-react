import { apiRequest, type ApiResponse } from '../api/apiRequest'
import { useEffect } from 'react'
import { userData, type User } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export function useGetConversation (user: User): void {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.conversationRequest === null) return
    if (user.conversationRequest?.length > 0) {
      user.conversationRequest.forEach((req: { id: number, username: string }) => {
        if (req.id === 0) return
        const users = async (): Promise<ApiResponse> => { return await apiRequest(`api/get/${user.role === 'lady' ? 'gentleman' : 'lady'}/${req.id}`, 'get', null, user.role) }

        users()
          .then((res) => {
            if (res.status === 'error') { navigate('/', { replace: true }); return }
            if (Array.isArray(res.data)) return dispatch(userData({ conversationsWithUsers: res.data }))
            dispatch(userData({ conversationsWithUsers: [res.data] }))
          })
          .catch(() => { navigate('/', { replace: true }) })
      })
    }
    user.conversationRequest?.filter((request: any) => request !== null)
  }, [user.conversationRequest])
}
