'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { QuoteRequestItem } from '@/components/QuoteRequestItem'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { Spinner } from '@/components/Spinner'
import type { IRoot } from './page'

type TQuotesProps = {
  quotesPending: IRoot[]
  quotesWaiting: IRoot[]
  quotesDone: IRoot[]
  loading: boolean
}
export const QuoteList = ({
  quotesPending,
  quotesWaiting,
  quotesDone,
  loading,
}: TQuotesProps) => {
  const router = useRouter()

  const handleNavigationQuote = (id: number) =>
    router.push(`/dashboard/quotes/requests/${id}?increase=false`)

  const handleNavigationUpdQuote = (id: number) =>
    router.push(`/dashboard/quotes/requests/${id}?increase=true`)

  const handleNavigationView = (id: number) => {
    router.push(`/dashboard/quotes/view/${id}`)
  }

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

  return (
    <div className="quotes-container">
      <div className="quotes-container__section quotes-container__section--pending">
        <h3 data-status="pending">Pendientes de revisión</h3>
        {loading ? (
          <RendererQuoteList
            quotes={quotesPending}
            onClick={handleNavigationQuote}
            onClickContent={handleNavigationQuote}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="quotes-container__section quotes-container__section--waiting">
        <h3 data-status="waiting">En espera de aprobación</h3>
        {loading ? (
          <RendererQuoteList
            quotes={quotesWaiting}
            onClick={handleRememberQuote}
            onClickContent={handleNavigationView}
            onClickModify={handleNavigationUpdQuote}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="quotes-container__section quotes-container__section--done">
        <h3 data-status="done">Aprobados</h3>
        {loading ? (
          <RendererQuoteList
            onClickContent={handleNavigationView}
            quotes={quotesDone}
            useButton={false}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

interface IRendererQuoteList {
  quotes: IRoot[]
  onClick?: (id: number) => void
  onClickContent?: (id: number) => void
  useButton?: boolean
  onClickModify?: (id: number) => void
}
const RendererQuoteList = ({
  quotes,
  onClick,
  onClickContent,
  useButton,
  onClickModify
}: IRendererQuoteList) => {
  return (
    <div className="quotes-container__list">
      {quotes.length <= 0 ? (
        <div className="quotes-container__empty">No hay cotizaciones</div>
      ) : (
        quotes.map((quote) => (
          <QuoteRequestItem
            key={quote.id}
            quote={quote}
            onClick={onClick}
            onClickContent={onClickContent}
            className="cursor-pointer"
            useButton={useButton}
            onClickModify={onClickModify}
          />
        ))
      )}
    </div>
  )
}
