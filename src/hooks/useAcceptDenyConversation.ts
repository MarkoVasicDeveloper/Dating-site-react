import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/apiRequest'
import { type User, setRequestConversation } from '../redux/user/userSlice'

interface UseAcceptDenyConversationProps {
  user: User
  conversation: string | any
  index: number
}

export function useAcceptDenyConversation (
  { ...props }: UseAcceptDenyConversationProps): { hide: boolean, sendAcceptDenyRequest: (accept: boolean) => Promise<void> } {
  const dispatch = useDispatch()

  const [hide, setHide] = useState(false)
  const navigate = useNavigate()

  const sendAcceptDenyRequest = useCallback(
    async (accept: boolean) => {
      const url = accept ? 'api/acceptConversation' : 'api/deleteConversation'
      const method = accept ? 'post' : 'delete'
      const requestBody = {
        id: props.user.id,
        username: props.user.username,
        lady: props.user.role === 'lady',
        userId: props.user.role === 'lady' ? props.conversation.gentlemanId : props.conversation.ladyId,
        userUsername: props.conversation.username
      }
      await apiRequest(url, method, requestBody, props.user.role)
        .then((res) => {
          if (res.status !== 'error') setHide(!hide);
          dispatch(setRequestConversation({ username: props.conversation.username }));
        })
        .catch((error) => { navigate('/', { replace: true }); console.log(error) });
    },
    []
  )

  return { hide, sendAcceptDenyRequest }
}
