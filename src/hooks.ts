import { SetStateAction, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key)

    return item
      ? JSON.parse(item)
      : initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
