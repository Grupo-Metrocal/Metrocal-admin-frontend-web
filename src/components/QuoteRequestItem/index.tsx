import './index.scss'
import type { IRoot } from '@/app/dashboard/quotes/requests/page'
import { CButton } from '../CButton'
import { formatDate } from '@/utils/formatDate'

interface IProps {
  quote: IRoot
  onClick?: (id: number) => void
  className?: string
}

export const QuoteRequestItem = ({ quote, onClick, className }: IProps) => {
  const QUOTE_STATUS: { [key: string]: string } = {
    pending: 'Por revisar',
    waiting: 'En espera',
    done: 'Aprobado',
    rejected: 'Rechazado',
  }

  return (
    <div
      key={quote.id}
      className={`quotes-container__item ${className}`}
      data-status={quote.status}
    >
      <div className="status-info">
        <span>{QUOTE_STATUS[quote.status]}</span>
        <span>{formatDate(quote.created_at)}</span>
      </div>
      <h4>{quote.client.company_name}</h4>
      <span>{quote.no || ''}</span>
      <div className="action">
        {/* <span>{quote.status !== 'pending' && quote.updated_at}</span> */}
        <span>Servicios: {quote.equipment_quote_request.length}</span>

        <CButton
          onClick={() => onClick && onClick(quote.id)}
          className="quote-container__item__button"
          style={{ boxShadow: 'none' }}
        >
          {quote.status === 'pending'
            ? 'Revisar'
            : quote.status === 'waiting'
            ? 'Enviar recordatorio'
            : quote.status === 'done'
            ? 'Asignar'
            : ''}
        </CButton>
      </div>
    </div>
  )
}
