/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'

export function useInputText (initialValue: Record<string, any>) {
  const [data, setData] = useState(initialValue)

  const edit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return { data, edit }
}
