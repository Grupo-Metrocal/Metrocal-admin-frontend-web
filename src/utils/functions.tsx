import Link from 'next/link'
import { fetchData } from './fetch'
import { toast } from 'sonner'

type LinkingProps = {
  href: string
  children: React.ReactNode
}
export const Linking = ({ href, children }: LinkingProps) => {
  return <Link href={href}>{children}</Link>
}

export const deleteQuoteRequest = async (id: number) => {
  const response = await fetchData({
    url: `quotes/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response) {
    toast.success('Cotización eliminada')
    return true
  } else {
    toast.error('Error al eliminar cotización')
    return false
  }
}
