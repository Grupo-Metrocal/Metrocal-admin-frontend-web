'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { QuoteRequestItem } from '@/components/QuoteRequestItem'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { Spinner } from '@/components/Spinner'
import { ClipboardList, Clock, CheckCircle2, FileText } from 'lucide-react'
import type { IRoot } from './page'

type TQuotesProps = {
  quotesPending: IRoot[]
  quotesWaiting: IRoot[]
  quotesDone: IRoot[]
  loading: boolean
}

const STATUS_COLUMNS = [
  {
    key: 'pending' as const,
    title: 'Pendientes de revisión',
    icon: <ClipboardList size={14} />,
    color: '#dc2626',
    bg: '#fef2f2',
    borderColor: '#fecaca',
  },
  {
    key: 'waiting' as const,
    title: 'En espera de aprobación',
    icon: <Clock size={14} />,
    color: '#d97706',
    bg: '#fffbeb',
    borderColor: '#fde68a',
  },
  {
    key: 'done' as const,
    title: 'Aprobadas',
    icon: <CheckCircle2 size={14} />,
    color: '#059669',
    bg: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
]

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

  const quotesMap = {
    pending: quotesPending,
    waiting: quotesWaiting,
    done: quotesDone,
  }

  const onClickMap = {
    pending: handleNavigationQuote,
    waiting: handleRememberQuote,
    done: undefined,
  }

  const onClickContentMap = {
    pending: handleNavigationQuote,
    waiting: handleNavigationView,
    done: handleNavigationView,
  }

  const useButtonMap = { pending: true, waiting: true, done: false }

  return (
    <div className="kanban">

      {/* Page header */}
      <div className="kanban__header">
        <div className="kanban__header-icon">
          <FileText size={18} />
        </div>
        <div>
          <h1 className="kanban__header-title">Solicitudes de Cotización</h1>
          <p className="kanban__header-sub">Gestiona el flujo de cotizaciones por estado</p>
        </div>
        <div className="kanban__header-total">
          <span className="kanban__total-pill">
            {quotesPending.length + quotesWaiting.length + quotesDone.length} total
          </span>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="kanban__board">
        {STATUS_COLUMNS.map((col) => {
          const quotes = quotesMap[col.key]
          return (
            <div key={col.key} className="kanban__col">
              {/* Column header */}
              <div
                className="kanban__col-header"
                style={{ borderColor: col.borderColor, background: col.bg }}
              >
                <span className="kanban__col-icon" style={{ color: col.color }}>
                  {col.icon}
                </span>
                <span className="kanban__col-title" style={{ color: col.color }}>
                  {col.title}
                </span>
                <span
                  className="kanban__col-count"
                  style={{ background: col.color }}
                >
                  {quotes.length}
                </span>
              </div>

              {/* Cards */}
              <div className="kanban__col-body">
                {!loading ? (
                  <div className="kanban__loading">
                    <Spinner />
                  </div>
                ) : quotes.length === 0 ? (
                  <div className="kanban__empty">
                    <span className="kanban__empty-icon" style={{ color: col.color }}>
                      {col.icon}
                    </span>
                    <p>Sin cotizaciones</p>
                  </div>
                ) : (
                  quotes.map((quote) => (
                    <QuoteRequestItem
                      key={quote.id}
                      quote={quote}
                      onClick={onClickMap[col.key]}
                      onClickContent={onClickContentMap[col.key]}
                      onClickModify={handleNavigationUpdQuote}
                      useButton={useButtonMap[col.key]}
                      className="cursor-pointer"
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
