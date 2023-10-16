import { fetchData } from '@/utils/fetch'
import { setCookie } from 'cookies-next'

export interface ISigninResponse {
  username: string
  token: string
}

export type ISigninRequest = {
  email: string
  password: string
}

export const signin = async ({
  email,
  password,
}: ISigninRequest): Promise<ISigninResponse | boolean> => {
  const response = await fetchData({
    url: 'auth/signin',
    method: 'POST',
    body: { email, password },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.token) {
    setCookie('token', response.token)
    setCookie('username', response.username)
    return response
  } else {
    return false
  }
}
