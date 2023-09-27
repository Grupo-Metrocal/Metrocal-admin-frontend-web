interface IFetchData {
  url: string
  method?: string
  body?: {}
  headers?: HeadersInit
}
export const fetchData = async ({ url, method, body, headers }: IFetchData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body: JSON.stringify(body),
      headers,
      cache: 'no-cache',
    })
    const data = await response.json()
    return data
  } catch (error) {
    return false
  }
}
