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

export const signin = async ({ email, password }: ISigninRequest) => {
  const response = await fetchData({
    url: 'auth/signin',
    method: 'POST',
    body: { email, password },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status === 200) {
    const cookieOPT = {
      maxAge: 20 * 60 * 60,
    }
    setCookie('token', response.data.token, cookieOPT)
    setCookie('username', response.data.username, cookieOPT)
    setCookie('profile_img', response.data.imageURL, cookieOPT)
    setCookie('profile_role', response.data.role.label, cookieOPT)

    return response
  } else {
    return false
  }
}
