'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import './index.scss'
import { IClient } from '@/app/contactInformation'
import { Spinner } from '@/components/Spinner'
import { ClientRenderer } from './components/clients'

interface IProps {
  params: {
    id: string
  }
}

const getInformationClient = async (id: string) => {
  return await fetchData({
    url: `clients/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}
export default function Page({ params }: IProps) {
  const { id } = params
  const [client, setClient] = useState<IClient>({} as IClient)
  const [loading, setLoading] = useState<boolean>(true)

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
        setLoading(false)
      })
  }, [id])

  return (
    <LayoutPage title="Detalles del cliente">
      {loading ? (
        <div className="w-full flex justify-center h-[300px] items-center">
          <Spinner />
        </div>
      ) : (
        <div className="client-info-container">
          <ClientRenderer client={client} />
          <div className="information"></div>
        </div>
      )}
    </LayoutPage>
  )
}
