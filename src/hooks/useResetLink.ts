/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { apiRequest, type ApiResponse } from '../api/apiRequest'

export function useResetLink (data: Record<string, any>, initialValue: Record<string, any>) {
  const [message, setMessage] = useState(initialValue)

  const resetLink = () => {
    const getResetLink = async function (): Promise<ApiResponse> {
      return await apiRequest(`/resetLink/${data.email}/${data.role}`, 'get', '', data.role)
    }

    getResetLink()
      .then((res) => {
        if (res.data.status === 'error') { setMessage({ status: 'error', message: 'Pogresna mail adresa!' }); return }
        setMessage({ status: 'ok', message: 'Link za reset je poslat na Vas mail!' })
      })
      .catch(() => {
        setMessage({ status: 'error', message: 'Ups, imamo neku gresku!' })
      })
  }

  return { resetLink, message }
}
