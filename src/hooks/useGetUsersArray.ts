import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/apiRequest'
import { selectUserId, selectUserRole } from '../redux/user/userSlice'
import { setUsersArray } from '../redux/users/usersSlice'
import { useTypedSelector } from './useTypedSelector'

export function useGetUsersArray (page: number): void {
  const dispatch = useDispatch()
  const userId = useTypedSelector(selectUserId)
  const userRole = useTypedSelector(selectUserRole)
  const navigate = useNavigate()

  useEffect(() => {
    const query = userRole === 'gentleman' ? 'allLady' : 'allGentleman'
    const users = async (): Promise<any> => await apiRequest(`/api/get/${query}/${page}/${userId}`, 'get', null, userRole)

    users()
      .then((res) => {
        if (res.status === 'login') { navigate('/', { replace: true }); return }
        dispatch(setUsersArray(res.data))
      })
      .catch((error) => { navigate('/', { replace: true }); console.log(error) })
  }, [page])
}
