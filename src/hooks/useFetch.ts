import { useState, useEffect } from 'react'

interface IUseFetch {
  url: string
  options?: RequestInit
  body?: BodyInit
}

export const useFetch = ({ url, options, body }: IUseFetch) => {
  const [response, setResponse] = useState<Response | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(url, {
      method: 'GET',
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
  }, [url, options, body])

  return { response, error, isLoading }
}
