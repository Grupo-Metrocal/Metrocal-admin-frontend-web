import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { RegisterQuoteList } from './component/RegisterList'
import { RecentQuotes } from './component/RecentQuotes'
import { RecentActivities } from './component/RecentActivities'

export default function Page() {
  return (
    <LayoutPage title="Cotizaciones / registros">

      {/* Top row: activity feed (left) + chart (right) */}
      <div className="rec-top">
        <div className="rec-top__activities">
          <RecentActivities />
        </div>
        <div className="rec-top__chart">
          <RecentQuotes />
        </div>
      </div>

      {/* Table section */}
      <div className="rec-table">
        <div className="rec-table__head">
          <div className="rec-table__head-dot" />
          <div>
            <h2 className="rec-table__head-title">Historial de Cotizaciones</h2>
            <p className="rec-table__head-sub">
              Búsqueda, filtros y acciones sobre todas las cotizaciones registradas
            </p>
          </div>
        </div>
        <div className="rec-table__body">
          <RegisterQuoteList />
        </div>
      </div>

    </LayoutPage>
  )
}
