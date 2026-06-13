import './index.scss'
import type { IRoot } from '@/app/dashboard/quotes/requests/page'
import { formatDate } from '@/utils/formatDate'
import { Building2, Wrench, Bell, Eye, PenLine } from 'lucide-react'

interface IProps {
  quote: IRoot
  onClick?: (id: number) => void
  onClickContent?: (id: number) => void
  className?: string
  name_button?: string
  useButton?: boolean
  onClickModify?: (id: number) => void
}

export const QuoteRequestItem = ({
  quote,
  onClick,
  className,
  onClickContent,
  name_button,
  useButton = true,
  onClickModify,
}: IProps) => {
  const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
    pending:  { label: 'Por revisar',  color: '#dc2626', bg: '#fef2f2',  border: '#dc2626' },
    waiting:  { label: 'En espera',    color: '#d97706', bg: '#fffbeb',  border: '#f59e0b' },
    done:     { label: 'Aprobado',     color: '#059669', bg: '#ecfdf5',  border: '#10b981' },
    rejected: { label: 'Rechazado',    color: '#6b7280', bg: '#f9fafb',  border: '#d1d5db' },
  }

  const isModification = quote.quote_modification_status === 'pending'
  const config = STATUS_CONFIG[quote.status] ?? STATUS_CONFIG.pending

  const statusLabel = isModification ? 'Solicitud de modificación' : config.label
  const statusColor = isModification ? '#7c3aed' : config.color
  const statusBg    = isModification ? '#f5f3ff' : config.bg

  let services = 0
  quote.equipment_quote_request.forEach((item) => { services += item.count })

  const getButtonConfig = (): { label: string; icon: React.ReactNode; bg: string; fg: string; hoverBg: string } => {
    if (name_button) return { label: name_button, icon: null, bg: '#f1f5f9', fg: '#374151', hoverBg: '#e2e8f0' }
    if (isModification) return { label: 'Modificar', icon: <PenLine size={12} />, bg: '#f5f3ff', fg: '#7c3aed', hoverBg: '#ede9fe' }
    if (quote.status === 'pending') return { label: 'Revisar', icon: <Eye size={12} />, bg: '#fef2f2', fg: '#dc2626', hoverBg: '#fee2e2' }
    if (quote.status === 'waiting') return { label: 'Recordatorio', icon: <Bell size={12} />, bg: '#eff6ff', fg: '#2563eb', hoverBg: '#dbeafe' }
    return { label: '', icon: null, bg: '', fg: '', hoverBg: '' }
  }

  const btnCfg = getButtonConfig()

  return (
    <div
      className={`quote-card ${className ?? ''}`}
      data-status={isModification ? 'modification' : quote.status}
      onClick={() => onClickContent?.(quote.id)}
    >
      {/* Top row: badge + date */}
      <div className="quote-card__top">
        <span className="quote-card__badge" style={{ color: statusColor, background: statusBg }}>
          {statusLabel}
        </span>
        <span className="quote-card__date">{formatDate(quote.created_at)}</span>
      </div>

      {/* Company + quote number */}
      <div className="quote-card__body">
        <div className="quote-card__company-icon">
          <Building2 size={13} />
        </div>
        <div className="quote-card__company-info">
          <h4 className="quote-card__company-name">{quote.client.company_name}</h4>
          {quote.no && <span className="quote-card__no">#{quote.no}</span>}
        </div>
      </div>

      {/* Modification message */}
      {isModification && quote.quote_modification_message && (
        <p className="quote-card__message">"{quote.quote_modification_message}"</p>
      )}

      {/* Footer: services count + action button */}
      <div className="quote-card__footer">
        <span className="quote-card__services">
          <Wrench size={11} />
          {services} equipo{services !== 1 ? 's' : ''}
        </span>

        {useButton && btnCfg.label && (
          <button
            className="quote-card__btn"
            style={{ background: btnCfg.bg, color: btnCfg.fg }}
            onMouseEnter={(e) => { e.currentTarget.style.background = btnCfg.hoverBg }}
            onMouseLeave={(e) => { e.currentTarget.style.background = btnCfg.bg }}
            onClick={(e) => {
              e.stopPropagation()
              if (isModification) onClickModify?.(quote.id)
              else onClick?.(quote.id)
            }}
          >
            {btnCfg.icon}
            {btnCfg.label}
          </button>
        )}
      </div>
    </div>
  )
}
