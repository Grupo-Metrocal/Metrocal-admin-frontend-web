interface IFetchData {
  url: string
  method?: string
  body?: {} | FormData
  headers?: HeadersInit
  responseType?: 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer'
  params?: {}
}

export const fetchData = async ({
  url,
  method = 'GET',
  body,
  headers = {},
  responseType = 'json',
  params,
}: IFetchData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  if (params) {
    const query = new URLSearchParams(params).toString()
    url = `${url}?${query}`
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body:
        body instanceof FormData ? body : body ? JSON.stringify(body) : null,
      headers:
        body instanceof FormData
          ? headers
          : { ...headers, 'Content-Type': 'application/json' },
      cache: 'no-cache',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || `Error ${response.status}`)
    }

    return response[responseType]()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
