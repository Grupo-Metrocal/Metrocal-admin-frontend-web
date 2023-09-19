interface IFetchData {
  url: string
  method: string
  body?: string
  headers?: HeadersInit
}
export const fetchData = async ({ url, method, body, headers }: IFetchData) => {
  const BASE_URL = process.env.BASE_URL
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body,
      headers,
    })
    const data = await response.json()
    return data
  } catch (error) {
    return false
  }
}
