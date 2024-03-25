interface IFetchData {
  url: string
  method?: string
  body?: {}
  headers?: HeadersInit
  responseType?: 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer'
}
export const fetchData = async ({
  url,
  method,
  body,
  headers,
  responseType = 'json',
}: IFetchData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body: JSON.stringify(body),
      headers,
    })
    const data = await response[responseType]()
    return data
  } catch (error) {
    return false
  }
}
