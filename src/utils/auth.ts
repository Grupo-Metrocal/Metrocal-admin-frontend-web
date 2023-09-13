type ISigninResponse = {
  username: string
  token: string
}

type ISigninRequest = {
  email: string
  password: string
}

export const signin = async ({
  email,
  password,
}: ISigninRequest): Promise<ISigninResponse> => {
  const response = await fetch('http://localhost:3000/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!data.token) {
    return data.message
  }

  authenticate(data)
  return data
}

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}

const getCookie = (name: string) => {
  const cookie = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return cookie ? cookie[2] : null
}

const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`
}

export const isAuth = () => {
  const cookieChecked = getCookie('token')
  if (cookieChecked) {
    return cookieChecked
  }

  return false
}

export const authenticate = (data: ISigninResponse) => {
  setCookie('token', data.token, 7)
  setCookie('username', data.username, 7)
}

export const signout = () => {
  removeCookie('token')
  removeCookie('username')
}
