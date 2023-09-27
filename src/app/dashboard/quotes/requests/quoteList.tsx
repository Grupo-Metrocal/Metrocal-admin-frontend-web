'use client'
import './index.scss'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetch'
import { QuoteRequestItem } from '@/components/QuoteRequestItem'

export interface IRoot {
  id: number
  status: string
  general_discount: number
  tax: number
  price: number
  created_at: string
  updated_at: any
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
  no: string
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
        <RendererQuoteList quotes={quotesPending} />
      </div>
      <div className="quotes-container__section quotes-container__section--waiting">
        <h3 data-status="waiting">En espera de aprobación</h3>
        <RendererQuoteList quotes={quotesWaiting} />
      </div>
      <div className="quotes-container__section quotes-container__section--done">
        <h3 data-status="done">Aprobadas</h3>
        <RendererQuoteList quotes={quotesDone} />
      </div>
    </div>
  )
}

const RendererQuoteList = ({ quotes }: { quotes: IRoot[] }) => {
  return (
    <div className="quotes-container__list">
      {quotes.length <= 0 ? (
        <div className="quotes-container__empty">No hay cotizaciones</div>
      ) : (
        quotes.map((quote) => <QuoteRequestItem key={quote.id} quote={quote} />)
      )}
    </div>
  )
}
