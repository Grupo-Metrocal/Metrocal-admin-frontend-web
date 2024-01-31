import { cookies } from 'next/headers'

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const cookieStore = cookies()
  cookieStore.set(name, value, {
    expires: date,
    sameSite: 'lax',
    path: '/',
  })
}

export const getCookie = (name: string, defaultValue: string | null = null) => {
  const cookieStore = cookies()
  const cookieValue = cookieStore.get(name)?.value

  // Verifica si la cookie se encontró
  if (cookieValue) {
    return cookieValue
  } else {
    // Si la cookie no se encontró, devuelve un valor por defecto o null
    return defaultValue
  }
}

export const removeCookie = (name: string) => {
  const cookieStore = cookies()
  cookieStore.delete(name)
}

export const isAuth = () => {
  const cookieChecked = getCookie('token')
  if (cookieChecked) {
    return cookieChecked
  }

  return false
}
export const getUserNameAuth = () => {
  const cookieChecked = getCookie('username')
  if (cookieChecked) {
    return cookieChecked
  }

  return false
}
