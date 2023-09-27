import './index.scss'
import type { IRoot } from '@/app/dashboard/quotes/requests/quoteList'
import { CButton } from '../CButton'

interface IProps {
  quote: IRoot
}

export const QuoteRequestItem = ({ quote }: IProps) => {
  const QUOTE_STATUS: { [key: string]: string } = {
    pending: 'Por revisar',
    approved: 'Aprobado',
    rejected: 'Rechazado',
  }

  const formattedDate = (date: string) =>
    date.split('T')[0].split('-').reverse().join('/')

  return (
    <div
      key={quote.id}
      className="quotes-container__item"
      data-status={quote.status}
    >
      <div className="status-info">
        <span>{QUOTE_STATUS[quote.status]}</span>
        <span>{formattedDate(quote.created_at)}</span>
      </div>
      <h4>{quote.client.company_name}</h4>
      <span>{quote.client.no}</span>
      <div className="action">
        <span>{quote.status !== 'pending' && quote.updated_at}</span>

        <CButton
          onClick={() => console.log('Ver')}
          className="quote-container__item__button"
        >
          Ver
        </CButton>
      </div>
    </div>
  )
}
