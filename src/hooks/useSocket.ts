/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useRef, useState } from "react";

import { type Socket, io } from 'socket.io-client';

import { useTypedSelector } from "./useTypedSelector";
import { useGetOnlineUsers } from "./useGetOnlineUsers";

import { selectUserRole, selectUserToken, setRecivedMessage } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export function useSocket (): {
  socket: Socket
  onlineUsers: any[]
  newUnreadedMessage: Record<string, any>
  clearMessage: (id: number) => void
  error: Record<string, any>
} {
  const dispatch = useDispatch();
  const token = useTypedSelector(selectUserToken)
  const userRole = useTypedSelector(selectUserRole)

  const [usersOnlineIds, setUsersOnlineIds] = useState<
  { current: 'offline' | 'online', users: any[] } | undefined>(undefined);

  const onlineUsers = useGetOnlineUsers(usersOnlineIds);

  const [error, setError] = useState({});
  const [newUnreadedMessage, setNewUnreadedMessage] = useState({}) as any;

  const { current: socket } = useRef(io(String(process.env.REACT_APP_SOCKET_URL), {
    extraHeaders: {
      token,
      lady: String(userRole === 'lady')
    },
    autoConnect: false
  }));

  function clearMessage (id: number): void {
    if (newUnreadedMessage[id] === undefined) return;
    const filterMessage = newUnreadedMessage[id];
    setNewUnreadedMessage(filterMessage);
  }

  useEffect(() => {
    socket.connect();
    socket.on('online', (value) => {
      if (Array.isArray(value)) { setUsersOnlineIds({ current: 'online', users: [...value] }); return };
      setUsersOnlineIds({ current: 'online', users: [value] });
    });
    socket.on('receveMessage', (value) => {
      dispatch(setRecivedMessage({
        date: new Date().toISOString(),
        from: value.id,
        message: value.message
      }));

      setNewUnreadedMessage((prev: Record<string, number>) => ({ ...prev, [value.id]: true }))
    });

    socket.on('error', (value) => { setError(value); console.log(value) });
    socket.on('offline', (value) => { setUsersOnlineIds({ current: 'offline', users: [value] }) });
    socket.emit('online');

    return () => {
      socket.off('online');
      socket.off('receveMessage');
      socket.off('error');
      socket.off('offline');
      socket.disconnect();
    }
  }, []);

  return { socket, onlineUsers, newUnreadedMessage, clearMessage, error };
}
