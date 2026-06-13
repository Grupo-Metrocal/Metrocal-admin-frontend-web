'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { QuoteRequestItem } from '@/components/QuoteRequestItem'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { Spinner } from '@/components/Spinner'
import { PenLine, Info } from 'lucide-react'
import type { IRoot } from './page'

type TQuotesProps = {
  quotesWaiting: IRoot[]
  loading: boolean
}

export const QuoteList = ({ quotesWaiting, loading }: TQuotesProps) => {
  const router = useRouter()

  const handleNavigationUpdQuote = (id: number) =>
    router.push(`/dashboard/quotes/requests/${id}?increase=true`)

  const handleNavigationView = (id: number) =>
    router.push(`/dashboard/quotes/view/${id}`)

  const handleRememberQuote = async (id: number) => {
    toast.loading('Enviando recordatorio...')
    const response = await fetchData({
      url: `quotes/request/${id}/remember`,
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    })
    toast.dismiss()
    if (response.success) {
      toast.success('Recordatorio enviado al cliente')
    } else {
      toast.error('No se pudo enviar el recordatorio', {
        description: response.message || response.details,
      })
    }
  }

  return (
    <div className="modify-board">

      {/* Header */}
      <div className="modify-board__header">
        <div className="modify-board__header-icon">
          <PenLine size={18} />
        </div>
        <div>
          <h1 className="modify-board__header-title">Solicitudes de Modificación</h1>
          <p className="modify-board__header-sub">
            Cotizaciones que el cliente ha solicitado revisar o modificar
          </p>
        </div>
        {quotesWaiting.length > 0 && (
          <span className="modify-board__count-pill">
            {quotesWaiting.length} pendiente{quotesWaiting.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Info note */}
      <div className="modify-board__info">
        <Info size={14} className="modify-board__info-icon" />
        <p>
          Estas cotizaciones tienen un mensaje del cliente solicitando cambios. Revísalas y aplica las modificaciones necesarias antes de reenviar.
        </p>
      </div>

      {/* Grid of cards */}
      <div className="modify-board__section">
        {!loading ? (
          <div className="modify-board__loading">
            <Spinner />
          </div>
        ) : quotesWaiting.length === 0 ? (
          <div className="modify-board__empty">
            <PenLine size={32} className="modify-board__empty-icon" />
            <p className="modify-board__empty-title">Sin solicitudes pendientes</p>
            <p className="modify-board__empty-sub">
              No hay cotizaciones con solicitudes de modificación en este momento
            </p>
          </div>
        ) : (
          <div className="modify-board__grid">
            {quotesWaiting.map((quote) => (
              <QuoteRequestItem
                key={quote.id}
                quote={quote}
                onClick={handleRememberQuote}
                onClickContent={handleNavigationView}
                onClickModify={handleNavigationUpdQuote}
                className="cursor-pointer"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
