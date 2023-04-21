import { apiRequest, type ApiResponse } from '../api/apiRequest'
import { useEffect } from 'react'
import { type User, setRequestConversation } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export function useGetConversation (user: User): void {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.conversationRequest === null) return
    if (user.conversationRequest?.length > 0) {
      user.conversationRequest.forEach((req: { id: number, username: string } | null) => {
        if (req === null) return
        const users = async (): Promise<ApiResponse> => { return await apiRequest(`api/get/${user.role === 'lady' ? 'gentleman' : 'lady'}/${req.id}`, 'get', null, user.role) }

        users()
          .then((res) => {
            if (res.status === 'error') { navigate('/', { replace: true }); return }
            if (Array.isArray(res.data)) return dispatch(setRequestConversation(res.data));
            dispatch(setRequestConversation([res.data]))
          })
          .catch(() => { navigate('/', { replace: true }) })
      })
    }
    user.conversationRequest?.filter((request: any) => request !== null)
  }, [user.conversationRequest])
}
