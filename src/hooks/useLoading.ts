import { useState } from 'react'

export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  const toggleLoading = () => {
    setLoading(!loading)
  }

  return { loading, toggleLoading }
}
