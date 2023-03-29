import { useEffect } from 'react'
import { apiRequest, type ApiResponse } from '../api/apiRequest'

export function useGetMessage (id: number, role: 'lady' | 'gentleman' | 'gentlemanPremium' | 'gentlemanVip' | 'administrator'): void {
  useEffect(() => {
    if (id === undefined || role === undefined) return
    const messageResponse = async (): Promise<ApiResponse> => await apiRequest(`api/${id}/${role}`, 'get', null, role)

    messageResponse()
      .then((res) => { console.log(res) })
      .catch((error) => { console.log(error) })
    // messageResponse.data.forEach((user: { unreadMessage: [] }) => {
    //   if (user.unreadMessage) setUnreadedMessage((prev: number) => prev + user.unreadMessage.length)
    // })
  }, [])
}
