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
import { DetailClientQuote } from './components/detailsQuote'
import { IQuote } from '@/app/dashboard/activities/interface/quote'
import { useForm } from '@/hooks/useForm'

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

const getQuoteClient = async (id: string, page: number, limit: number) => {
  return await fetchData({
    url: `quotes/request/client/${id}/all/${page}/${limit}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export default function Page({ params }: IProps) {
  const { id } = params
  const [client, setClient] = useState<IClient>({} as IClient)
  const [quotes, setQuotes] = useState<IQuote[]>([] as IQuote[])
  const [quoteInformation, setQuoteInformation] = useState<any>({
    totalInvoice: 0,
    quoteRejected: 0,
  })
  const [loadingClient, setLoadingClient] = useState<boolean>(true)
  const [loadingQuotes, setLoadingQuotes] = useState<boolean>(true)
  const { values, handleInputChange } = useForm({
    search: '',
  })

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pagination, setPagination] = useState<any>({
    current_page: 0,
    total_pages: 0,
    total_data: 0,
  })

  useEffect(() => {
    toast.loading('Cargando información del cliente')

    getInformationClient(id)
      .then((response) => {
        if (!response.success) {
          return toast.error('No se pudo cargar la información del cliente')
        }

        setClient(response.data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        toast.dismiss()
        setLoadingClient(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    getQuoteClient(id, currentPage, 5)
      .then((response) => {
        if (!response.success) {
          return toast.error(
            'No se pudieron cargar las cotizaciones del cliente',
          )
        }

        setQuotes(response.data.paginationDataQuotes)
        setQuoteInformation({
          totalInvoice: response.data.totalInvoice,
          quoteRejected: response.data.quoteRejected,
        })
        setPagination({
          current_page: response.current_page,
          total_pages: response.total_pages,
          total_data: response.total_data,
        })
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoadingQuotes(false)
      })
  }, [id, currentPage])

  return (
    <LayoutPage title="Detalles del cliente">
      {loadingClient ? (
        <div className="w-full flex justify-center h-[300px] items-center">
          <Spinner />
        </div>
      ) : (
        <div className="client-info-container">
          <ClientRenderer client={client} />
          <DetailClientQuote
            quoteInformation={quoteInformation}
            searchValue={values.search}
            quotes={quotes}
            handleSearchQuotes={handleInputChange}
            currentPage={currentPage}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            loading={loadingQuotes}
          />
        </div>
      )}
    </LayoutPage>
  )
}
