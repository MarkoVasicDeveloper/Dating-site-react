import { useState } from 'react'

export function useInputText (initialValue: Record<string, any>): {
  data: Record<string, any>
  edit: (event: React.ChangeEvent<HTMLInputElement> | any) => void
} {
  const [data, setData] = useState(initialValue)

  const edit = (event: React.ChangeEvent<HTMLInputElement> | string): void => {
    if (typeof event === 'string') {
      setData({ ...data, [event]: '' });
      return;
    };

    setData({ ...data, [event.target.name]: event.target.value })
  };

  return { data, edit };
}
