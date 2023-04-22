import { useState } from "react";
import { formValidation } from "../misc/formValidation";

export function useFormValidation (onChange: any, field: string, dirty: boolean, required?: boolean, value?: string):
{ validation: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void, invalid: boolean, message: string } {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState('');

  function validation (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>): void {
    const result = formValidation(event.target.value, field, dirty, required);
    if (!result.valid) {
      setInvalid(true)
      setMessage(result.value)
      if (field === 'checkbox') { onChange({ value, checked: false }); return }
      onChange(event)
      return
    };

    setInvalid(false)
    setMessage('')
    if (field === 'checkbox') { onChange({ value, checked: true }); return }
    onChange(event)
  }
  return { validation, message, invalid }
}
