import { useState, useEffect } from 'react'

function getInitialValue(key, defaultValue, convertFromString) {
  const localStorageValue = localStorage.getItem(key)
  if (localStorageValue) {
    try {
      return convertFromString(localStorageValue)
    } catch {
      localStorage.removeItem(key)
    }
  }
  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}
export default function useLocalStorageState(
  key: string,
  defaultValue = '',
  { convertToString = JSON.stringify, convertFromString = JSON.parse } = {}
) {
  const [state, setState] = useState(() =>
    getInitialValue(key, defaultValue, convertFromString)
  )

  useEffect(() => {
    localStorage.setItem(key, convertToString(state))
  }, [key, state, convertToString])

  return [state, setState]
}
