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

  if (response.status === 200) {
    setCookie('token', response.data.token)
    setCookie('username', response.data.username)
    return response
  } else {
    return false
  }
}
