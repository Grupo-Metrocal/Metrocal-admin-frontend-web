'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { QuoteList } from './quoteList'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetch'
import { useLoading } from '@/hooks/useLoading'
import { PaginationFooter } from './components/paginationFooter'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'

export interface IRoot {
  id: number
  status: string
  general_discount: number
  tax: number
  price: number
  created_at: string
  updated_at: any
  no?: string
  equipment_quote_request: IEquipmentQuoteRequest[]
  client: IClient
}

export interface IEquipmentQuoteRequest {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: boolean
  calibration_method: string
  additional_remarks: string
  discount: number
}

export interface IClient {
  id: number
  company_name: string
  phone: string
  address: string
  no_ruc: string
  email: string
  requested_by: string
  created_at: string
}

const fetchQuotes = async ({
  limit,
  offset,
}: {
  limit: number
  offset: number
}) => {
  const response = await fetchData({
    // url: `quotes/request/all?limit=${limit}&offset=${offset}`,
    url: `quotes`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
  return response
}

export default function Page() {
  const [quotesPending, setQuotesPending] = useState<IRoot[]>([])
  const [quotesWaiting, setQuotesWaiting] = useState<IRoot[]>([])
  const [quotesDone, setQuotesDone] = useState<IRoot[]>([])
  const { loading, toggleLoading } = useLoading()
  const [total_pages, setTotalPages] = useState(0)
  const [current_page, setCurrentPage] = useState(0)

  const handleNextPage = () => {
    if (current_page + 1 > total_pages) {
      toast('No hay más cotizaciones pendientes')
    } else {
      toast('Cargando más cotizaciones pendientes')
      setCurrentPage(current_page + 1)
    }
  }

  const handleContainQuotes = (
    state: IRoot[],
    setState: any,
    data: IRoot[],
  ) => {
    const quotes = [...state, ...data]
    const uniqueQuotes = quotes.filter(
      (quote, index, self) =>
        index === self.findIndex((q) => q.id === quote.id),
    )

    setState(uniqueQuotes)
  }

  useEffect(() => {
    toggleLoading()

    const getQuotes = async () => {
      const response = await fetchQuotes({ limit: 5, offset: current_page })

      if (response.success) {
        setTotalPages(response.total_pages)

        handleContainQuotes(
          quotesPending,
          setQuotesPending,
          response.data.filter((quote: IRoot) => quote.status === 'pending'),
        )

        handleContainQuotes(
          quotesWaiting,
          setQuotesWaiting,
          response.data.filter((quote: IRoot) => quote.status === 'waiting'),
        )

        handleContainQuotes(
          quotesDone,
          setQuotesDone,
          response.data.filter((quote: IRoot) => quote.status === 'done'),
        )
      }
    }

    getQuotes().finally(() => toggleLoading())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_page])

  return (
    <LayoutPage
      title="Cotizaciones / solicitudes"
      // Footer={() => <PaginationFooter onClick={handleNextPage} />}
    >
      <QuoteList
        quotesPending={quotesPending}
        quotesWaiting={quotesWaiting}
        quotesDone={quotesDone}
        loading={loading}
      />
    </LayoutPage>
  )
}
