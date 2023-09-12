import { useState, useEffect } from 'react'

interface IUseFetch {
  url: string
  options?: RequestInit
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: BodyInit
}

export const useFetch = ({ url, options, method, body }: IUseFetch) => {
  const [response, setResponse] = useState<Response | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(url, {
      method,
      body,
      ...options,
    })
      .then((res) => {
        setResponse(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [url, options, method, body])

  return { response, error, isLoading }
}
