import Link from 'next/link'
import { fetchData } from './fetch'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'

type LinkingProps = {
  href: string
  children: React.ReactNode
}
export const Linking = ({ href, children }: LinkingProps) => {
  return <Link href={href}>{children}</Link>
}

export const deleteQuoteRequest = async (id: number) => {
  toast.loading('Eliminando cotización', {
    description: 'Esto podria tardar unos segundos...',
  })
  const response = await fetchData({
    url: `quotes/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  toast.dismiss()

  if (response.success) {
    toast.success('Cotización eliminada')
  } else {
    toast.error(response.details)
  }

  return response
}

export const deleteUser = async (id: number, token: string) => {
  toast.loading('Eliminando usuario')
  const response = await fetchData({
    url: `users/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  toast.dismiss()

  if (response.success) {
    toast.success('Usuario eliminado')
    return true
  } else {
    toast.error('Error al eliminar usuario')
    return false
  }
}

export const assignRole = async ({
  idUser,
  idRole,
  token,
}: {
  idUser: number
  idRole: number
  token: string
}) => {
  toast.loading('Asignando rol')
  const response = await fetchData({
    url: `users/assign/${idUser}/role/${idRole}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  toast.dismiss()

  if (response.success) {
    toast.success('Rol asignado')
    return true
  } else {
    toast.error('Error al asignar rol')
    return false
  }
}

export const generateQuoteBasedOnCurrent = async (quoteID: number) => {
  return await fetchData({
    url: `quotes/generate/by-quote-id/${quoteID}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    }
  })
}
