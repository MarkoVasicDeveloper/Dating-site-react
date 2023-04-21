import { useEffect, useState } from "react"
import { useTypedSelector } from "./useTypedSelector";
import { selectUserRole } from "../redux/user/userSlice";
import { type ApiResponse, apiRequest } from "../api/apiRequest";
import { useNavigate } from "react-router-dom";

interface OnlineUsers {
  id: number
  username: string
}

export function useGetOnlineUsers (online: { current: string, users: OnlineUsers[] } | undefined): any[] {
  const userRole = useTypedSelector(selectUserRole);

  const navigate = useNavigate();

  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  const query = userRole === 'lady' ? 'gentleman' : 'lady';
  const key = userRole === 'lady' ? 'gentlemanId' : 'ladyId'

  useEffect(() => {
    if (online === undefined || online.users.length === 0) return;

    if (online.current === 'offline') {
      const remove = onlineUsers.filter(user => user[key] !== online.users[0].id);
      setOnlineUsers(remove);
      return;
    }

    const difference: OnlineUsers[] = online?.users.filter(x => !onlineUsers.includes(x));

    difference?.forEach(user => {
      const getUser = async function (): Promise<ApiResponse> {
        return await apiRequest(`api/get/${query}/${user.id}`, 'get', null, userRole)
      }
      getUser()
        .then((res) => {
          if (res.status === 'login') { navigate('/', { replace: true }); return }

          delete res.data.password;
          if (Array.isArray(res.data)) { setOnlineUsers((prev) => [...prev, ...res.data]); return };
          setOnlineUsers((prev) => [...prev, res.data]);
        })
        .catch(() => {
          navigate('/')
        })
    });
  }, [online]);

  return onlineUsers;
}
