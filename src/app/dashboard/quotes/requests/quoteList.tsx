'use client'
import './index.scss'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetch'
import { QuoteRequestItem } from '@/components/QuoteRequestItem'
import { useRouter } from 'next/navigation'
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

const fetchQuotes = async () => {
  const response = await fetchData({
    url: 'quotes/request/all',
  })
  return response
}

export const QuoteList = () => {
  const [quotesPending, setQuotesPending] = useState<IRoot[]>([])
  const [quotesWaiting, setQuotesWaiting] = useState<IRoot[]>([])
  const [quotesDone, setQuotesDone] = useState<IRoot[]>([])

  const router = useRouter()

  const handleNavigation = (id: number) =>
    router.push(`/dashboard/quotes/requests/${id}`)

  const handleRememberQuote = async (id: number) => {
    toast.loading('Enviando recordatorio...')
    const response = await fetchData({
      url: `quotes/request/${id}/remember`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Haz enviado un recordatorio al cliente', {
        description:
          'Se ha enviado un correo al cliente para que revise la cotización',
      })
    } else {
      toast.error('No se pudo enviar el recordatorio', {
        description: response.message || response.details,
      })
    }
  }

  useEffect(() => {
    const getQuotes = async () => {
      const quotes = await fetchQuotes()

      setQuotesPending(
        quotes.filter((quote: IRoot) => quote.status === 'pending'),
      )
      setQuotesWaiting(
        quotes.filter((quote: IRoot) => quote.status === 'waiting'),
      )
      setQuotesDone(quotes.filter((quote: IRoot) => quote.status === 'done'))
    }

    getQuotes()
  }, [])

  return (
    <div className="quotes-container">
      <div className="quotes-container__section quotes-container__section--pending">
        <h3 data-status="pending">Pendientes de revisión</h3>
        <RendererQuoteList quotes={quotesPending} onClick={handleNavigation} />
      </div>
      <div className="quotes-container__section quotes-container__section--waiting">
        <h3 data-status="waiting">En espera de aprobación</h3>
        <RendererQuoteList
          quotes={quotesWaiting}
          onClick={handleRememberQuote}
        />
      </div>
      <div className="quotes-container__section quotes-container__section--done">
        <h3 data-status="done">Aprobadas</h3>
        <RendererQuoteList quotes={quotesDone} />
      </div>
    </div>
  )
}

interface IRendererQuoteList {
  quotes: IRoot[]
  onClick?: (id: number) => void
}
const RendererQuoteList = ({ quotes, onClick }: IRendererQuoteList) => {
  return (
    <div className="quotes-container__list">
      {quotes.length <= 0 ? (
        <div className="quotes-container__empty">No hay cotizaciones</div>
      ) : (
        quotes.map((quote) => (
          <QuoteRequestItem key={quote.id} quote={quote} onClick={onClick} />
        ))
      )}
    </div>
  )
}
