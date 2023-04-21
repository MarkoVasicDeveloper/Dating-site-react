import { useDispatch } from "react-redux"
import { selectUserConversation, selectUserRole, setConversation } from "../redux/user/userSlice"
import { useTypedSelector } from "./useTypedSelector"
import { useNavigate } from "react-router-dom"
import { type ApiResponse, apiRequest } from "../api/apiRequest"
import { useEffect } from "react"

export function useGetConversationUserData (page: number): void {
  const conversation = useTypedSelector(selectUserConversation);
  const userRole = useTypedSelector(selectUserRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (conversation === null || conversation?.length === 0) return;
    conversation?.slice(page * 10, (page + 1) * 10).forEach((request: { id: number, username: string }) => {
      const query = userRole === 'lady' ? 'gentleman' : 'lady'
      const getUser = async function (): Promise<ApiResponse> {
        return await apiRequest(`api/get/${query}/${request.id}`, 'get', null, userRole);
      }
      getUser()
        .then((res) => {
          if (res.status === 'login') { navigate('/', { replace: true }); return }
          if (res.data.status === 'error') { return };

          delete res.data.password
          dispatch(setConversation(res.data))
        })
        .catch((error) => {
          console.log(error)
        })
    });
  }, [conversation, page]);
}
