import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiRequest, type ApiResponse } from '../api/apiRequest'
import { selectUser, type User, userData } from '../redux/user/userSlice'
import { useTypedSelector } from './useTypedSelector'

export function useGetUser (): User {
  const user = useTypedSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async function (): Promise<ApiResponse> {
      return await apiRequest(`api/get/${user.role}/${user.id}`, 'get', null, user.role)
    }
    getUser()
      .then((res) => {
        if (res.status === 'login') { navigate('/', { replace: true }); return }

        delete res.data.password
        delete res.data.gentlemanId || delete res.data.ladyId
        dispatch(userData(res.data))
      })
      .catch(() => {
        navigate('/')
      })
  }, [])

  return user
}
