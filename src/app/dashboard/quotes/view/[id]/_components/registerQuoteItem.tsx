import { IQuote } from '../../../requests/[id]/page'
import { formatDate } from '@/utils/formatDate'
import { Download, Calendar, MessageSquare, Tag } from 'lucide-react'
import { handleGeneratePDFromModifiedQuoteList } from '@/utils/downloadPDFromModifiedQuoteList'

interface IProps {
  quote: IQuote
  index: number
}

export const RegisterQuoteItem = ({ quote, index }: IProps) => {
  const versionLabel = `v${index + 1}`
  const hasMessage = !!quote.quote_modification_message

  return (
    <div className="qv__mod-item">
      <div className="qv__mod-item-header">
        <div className="qv__mod-item-version">
          <Tag size={11} />
          {versionLabel}
        </div>
        <span className="qv__mod-item-no">{quote.no}</span>
        <button
          className="qv__mod-item-dl"
          title="Descargar PDF"
          onClick={async () =>
            handleGeneratePDFromModifiedQuoteList({
              id: quote.id,
              no: quote.no,
              company_name: quote.client.company_name,
              index,
            })
          }
        >
          <Download size={13} />
        </button>
      </div>

      <div className="qv__mod-item-date">
        <Calendar size={11} />
        {formatDate(quote.updated_at)}
      </div>

      <div className={`qv__mod-item-msg${!hasMessage ? ' qv__mod-item-msg--empty' : ''}`}>
        <MessageSquare size={11} />
        <span>{quote.quote_modification_message || 'Sin mensaje de modificación'}</span>
      </div>
    </div>
  )
}
