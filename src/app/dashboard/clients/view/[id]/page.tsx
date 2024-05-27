'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface IProps {
  params: {
    id: string
  }
}

const getInformationClient = async (id: string) => {
  return await fetchData({
    url: `clients/information/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}
export default function Page({ params }: IProps) {
  const { id } = params
  const [client, setClient] = useState<any>({})

  useEffect(() => {
    toast.loading('Cargando información del cliente')

    getInformationClient(id)
      .then((response) => {
        if (!response.success) {
          return toast.error(response.message)
        }

        setClient(response.data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        toast.dismiss()
      })
  }, [id])

  return (
    <LayoutPage title="Detalles del cliente">
      <div></div>
    </LayoutPage>
  )
}
