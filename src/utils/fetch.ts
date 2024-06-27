interface IFetchData {
  url: string
  method?: string
  body?: {}
  headers?: HeadersInit
  responseType?: 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer'
  params?: {}
  
}
export const fetchData = async ({
  url,
  method,
  body,
  headers,
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
      body: JSON.stringify(body),
      headers,
      cache: 'no-cache',
    })
    const data = await response[responseType]()
    return data
  } catch (error) {
    return false
  }
}
