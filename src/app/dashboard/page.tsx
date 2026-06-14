'use client'
import './page.scss'
import { useCallback, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { fetchData } from '@/utils/fetch'
import { formatPrice } from '@/utils/formatPrice'
import { toast } from 'sonner'
import { BarChart } from '@/components/Charts/BarChart'
import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileCheck,
  Award,
  Users,
  FileX,
  RefreshCw,
  Clock,
  ChevronRight,
  Activity,
  BarChart2,
  AlertCircle,
  ClipboardList,
  UserCog,
  Target,
  CheckCircle2,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface IQuotationDetails {
  all_quotes: {
    current_invoice: number
    last_invoice: number
    current_number_quotes_generated: number
  }
  rejected_quotes: {
    number_quotes_rejected_by_client: number
    number_quotes_rejected_by_staff: number
    invoice_rejected_by_staff: number
    invoice_rejected_by_client: number
  }
  approved_quotes: {
    percentageChange: number
    approved_quote_invoice: number
    last_approved_quote_invoice: number
    approved_number_quotes: number
  }
}

interface ICertStats {
  certificates: { currentMonth: number; comparePreviousMonth: number }
  income: { currentMonth: number; comparePreviousMonth: number }
  pendingCertification: number
}

interface IFluctuation {
  month: string
  count: number
  totalRevenue: number
}

interface IMonthlyRequest {
  month: string
  count: string
}

interface IRecentActivity {
  id: number
  created_at: string
  approved_by: string
  company_name: string
  price: number
}

// ─── Auth header ──────────────────────────────────────────────────────────────

const auth = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getCookie('token')}`,
})

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiProps {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  label: string
  value: string
  trend?: number | null
  sub?: string
  href?: string
}

const KpiCard = ({ icon, iconBg, iconColor, label, value, trend, sub, href }: KpiProps) => {
  const hasTrend = trend !== undefined && trend !== null
  const isUp = (trend ?? 0) >= 0

  const inner = (
    <div className="dash__kpi">
      <div className="dash__kpi-top">
        <div className="dash__kpi-icon" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </div>
        {hasTrend && (
          <span className={`dash__kpi-trend dash__kpi-trend--${isUp ? 'up' : 'down'}`}>
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend!).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="dash__kpi-value">{value}</p>
      <p className="dash__kpi-label">{label}</p>
      {sub && <p className="dash__kpi-sub">{sub}</p>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="dash__kpi-link">
        {inner}
      </Link>
    )
  }
  return inner
}

// ─── Chart Card ───────────────────────────────────────────────────────────────

interface ChartCardProps {
  title: string
  subtitle: string
  dotColor: string
  children: React.ReactNode
}

const ChartCard = ({ title, subtitle, dotColor, children }: ChartCardProps) => (
  <div className="dash__chart-card">
    <div className="dash__chart-head">
      <span className="dash__chart-dot" style={{ background: dotColor }} />
      <div>
        <h3 className="dash__chart-title">{title}</h3>
        <p className="dash__chart-sub">{subtitle}</p>
      </div>
    </div>
    <div className="dash__chart-body">{children}</div>
  </div>
)

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<IQuotationDetails | null>(null)
  const [certStats, setCertStats] = useState<ICertStats | null>(null)
  const [fluctuation, setFluctuation] = useState<IFluctuation[]>([])
  const [monthlyReq, setMonthlyReq] = useState<IMonthlyRequest[]>([])
  const [activities, setActivities] = useState<IRecentActivity[]>([])
  const [totalClients, setTotalClients] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalServiceOrders, setTotalServiceOrders] = useState(0)
  const [activitiesReadyToCertify, setActivitiesReadyToCertify] = useState(0)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadAll = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true)
    else setLoading(true)

    try {
      const [q, c, f, m, a, cl, u, so, done] = await Promise.all([
        fetchData({ url: 'quotes/fetch-quotation-details', method: 'GET', headers: auth() }),
        fetchData({ url: 'activities/certified-activities/statistics', method: 'GET', headers: auth() }),
        fetchData({ url: 'quotes/get-fluctuation-statistic', method: 'GET', headers: auth() }),
        fetchData({ url: 'quotes/request/monthly/graphic/12', method: 'GET', headers: auth() }),
        fetchData({ url: 'activities/get-last-activities/5', method: 'GET', headers: auth() }),
        fetchData({ url: 'clients/1/1', method: 'GET', headers: auth() }),
        fetchData({ url: 'users', method: 'GET', headers: auth() }),
        fetchData({ url: 'activities/service-order/1/1', method: 'GET', headers: auth() }),
        fetchData({ url: 'activities/done', method: 'GET', headers: auth() }),
      ])

      if (q.success) setQuotes(q.data)
      if (c.success) setCertStats(c.data)
      if (f.success) setFluctuation(f.data ?? [])
      if (m.success) setMonthlyReq(m.data ?? [])
      if (a.success) setActivities(a.data ?? [])
      if (cl.success) setTotalClients(cl.total_data ?? cl.data?.length ?? 0)
      if (u.success) setTotalUsers(Array.isArray(u.data) ? u.data.length : 0)
      if (so.success) setTotalServiceOrders(so.total_data ?? so.data?.length ?? 0)
      if (done.success) setActivitiesReadyToCertify(Array.isArray(done.data) ? done.data.length : 0)
    } catch {
      toast.error('Error cargando el panel de control')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  // ── Derived ────────────────────────────────────────────────────────────────

  const billingTrend = quotes?.all_quotes.last_invoice
    ? Number(
        (
          ((quotes.all_quotes.current_invoice - quotes.all_quotes.last_invoice) /
            quotes.all_quotes.last_invoice) *
          100
        ).toFixed(2),
      )
    : null

  const rejectedTotal =
    (quotes?.rejected_quotes.number_quotes_rejected_by_client ?? 0) +
    (quotes?.rejected_quotes.number_quotes_rejected_by_staff ?? 0)

  const generated = quotes?.all_quotes.current_number_quotes_generated ?? 0
  const approved = quotes?.approved_quotes.approved_number_quotes ?? 0
  const conversionRate = generated > 0 ? Math.round((approved / generated) * 100) : 0

  // Funnel: pending = generated - approved - rejected (can't be negative)
  const pendingQuotes = Math.max(0, generated - approved - rejectedTotal)

  // ── Month label helpers ────────────────────────────────────────────────────

  const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const fluctLabel = (raw: string) => {
    const parts = raw.split('-')
    const m = parseInt(parts[1]) - 1
    return `${MONTHS[m] ?? raw} ${parts[0].slice(2)}`
  }

  const reqLabel = (raw: string) => {
    const d = new Date(raw)
    return `${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`
  }

  const fluctLabels = fluctuation.map((d) => fluctLabel(d.month))
  const fluctValues = fluctuation.map((d) => d.totalRevenue)
  const reqLabels = monthlyReq.map((d) => reqLabel(d.month))
  const reqValues = monthlyReq.map((d) => Number(d.count))

  const blueColors = fluctLabels.map((_, i) => {
    const alpha = 0.45 + (i / Math.max(fluctLabels.length - 1, 1)) * 0.5
    return `rgba(37, 99, 235, ${alpha.toFixed(2)})`
  })
  const purpleColors = reqLabels.map(() => 'rgba(124, 58, 237, 0.72)')

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // ── Loading ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="dash__loading">
        <div className="dash__loading-spinner" />
        <span>Cargando panel de control...</span>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="dash">

      {/* Top bar */}
      <div className="dash__topbar">
        <div className="dash__topbar-left">
          <h1 className="dash__topbar-title">Panel de control</h1>
          <p className="dash__topbar-date">{today}</p>
        </div>
        <button
          className={`dash__refresh${refreshing ? ' dash__refresh--active' : ''}`}
          onClick={() => loadAll(true)}
          title="Actualizar datos"
        >
          <RefreshCw size={15} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* ── KPI grid — Row 1: financiero ── */}
      <div className="dash__section-label">Resumen financiero del mes</div>
      <div className="dash__kpis">
        <KpiCard
          icon={<DollarSign size={17} />}
          iconBg="#dbeafe" iconColor="#2563eb"
          label="Facturación total"
          value={`$${formatPrice(quotes?.all_quotes.current_invoice ?? 0)}`}
          trend={billingTrend}
          sub={`Mes ant. $${formatPrice(quotes?.all_quotes.last_invoice ?? 0)}`}
          href="/dashboard/quotes/requests"
        />
        <KpiCard
          icon={<FileCheck size={17} />}
          iconBg="#dcfce7" iconColor="#16a34a"
          label="Cotizaciones aprobadas"
          value={String(approved)}
          trend={quotes?.approved_quotes.percentageChange ?? null}
          sub={`$${formatPrice(quotes?.approved_quotes.approved_quote_invoice ?? 0)} facturado`}
          href="/dashboard/quotes/requests"
        />
        <KpiCard
          icon={<Target size={17} />}
          iconBg="#fef3c7" iconColor="#d97706"
          label="Tasa de conversión"
          value={`${conversionRate}%`}
          sub={`${approved} aprobadas de ${generated} generadas`}
          href="/dashboard/quotes/requests"
        />
        <KpiCard
          icon={<FileX size={17} />}
          iconBg="#fee2e2" iconColor="#dc2626"
          label="Cotizaciones rechazadas"
          value={String(rejectedTotal)}
          sub={`Clientes ${quotes?.rejected_quotes.number_quotes_rejected_by_client ?? 0} · Staff ${quotes?.rejected_quotes.number_quotes_rejected_by_staff ?? 0}`}
          href="/dashboard/quotes/requests"
        />
        <KpiCard
          icon={<Activity size={17} />}
          iconBg="#f1f5f9" iconColor="#64748b"
          label="En proceso / Pendientes"
          value={String(pendingQuotes)}
          sub={`De ${generated} cotizaciones generadas`}
          href="/dashboard/quotes/requests"
        />
      </div>

      {/* ── KPI grid — Row 2: operacional ── */}
      <div className="dash__section-label">Operaciones y sistema</div>
      <div className="dash__kpis">
        <KpiCard
          icon={<Award size={17} />}
          iconBg="#f3e8ff" iconColor="#7c3aed"
          label="Certificados emitidos"
          value={String(certStats?.certificates.currentMonth ?? 0)}
          trend={certStats?.certificates.comparePreviousMonth ?? null}
          sub={`${certStats?.pendingCertification ?? 0} pendientes de emisión`}
          href="/dashboard/certificates/records"
        />
        <KpiCard
          icon={<BarChart2 size={17} />}
          iconBg="#ecfdf5" iconColor="#059669"
          label="Ingresos por certificados"
          value={`$${formatPrice(certStats?.income.currentMonth ?? 0)}`}
          trend={certStats?.income.comparePreviousMonth ?? null}
          href="/dashboard/certificates/records"
        />
        <KpiCard
          icon={<CheckCircle2 size={17} />}
          iconBg="#f0fdf4" iconColor="#16a34a"
          label="Actividades listas para certificar"
          value={String(activitiesReadyToCertify)}
          sub="Pendientes de emisión de certificado"
          href="/dashboard/activities"
        />
        <KpiCard
          icon={<ClipboardList size={17} />}
          iconBg="#eff6ff" iconColor="#3b82f6"
          label="Órdenes de servicio"
          value={String(totalServiceOrders)}
          href="/dashboard/service-order"
        />
        <KpiCard
          icon={<Users size={17} />}
          iconBg="#e0e7ff" iconColor="#4f46e5"
          label="Clientes registrados"
          value={String(totalClients)}
          href="/dashboard/clients"
        />
        <KpiCard
          icon={<UserCog size={17} />}
          iconBg="#fdf4ff" iconColor="#9333ea"
          label="Usuarios del sistema"
          value={String(totalUsers)}
          href="/dashboard/users"
        />
      </div>

      {/* ── Charts ── */}
      <div className="dash__section-label">Tendencias históricas</div>
      <div className="dash__charts">
        <ChartCard
          title="Ingresos totales por mes"
          subtitle="Facturación histórica de cotizaciones"
          dotColor="#2563eb"
        >
          {fluctuation.length > 0 ? (
            <div className="dash__chart-canvas">
              <BarChart
                data={fluctValues}
                labels={fluctLabels}
                title="Ingresos"
                backgroundColors={blueColors}
              />
            </div>
          ) : (
            <div className="dash__empty">
              <AlertCircle size={20} />
              <span>Sin datos disponibles</span>
            </div>
          )}
        </ChartCard>

        <ChartCard
          title="Solicitudes por mes"
          subtitle="Cotizaciones completadas en los últimos 12 meses"
          dotColor="#7c3aed"
        >
          {monthlyReq.length > 0 ? (
            <div className="dash__chart-canvas">
              <BarChart
                data={reqValues}
                labels={reqLabels}
                title="Solicitudes"
                backgroundColors={purpleColors}
              />
            </div>
          ) : (
            <div className="dash__empty">
              <AlertCircle size={20} />
              <span>Sin datos disponibles</span>
            </div>
          )}
        </ChartCard>
      </div>

      {/* ── Funnel + Activities + Financial ── */}
      <div className="dash__bottom-3">

        {/* Quote funnel */}
        <div className="dash__card">
          <div className="dash__card-head">
            <span className="dash__card-dot" style={{ background: '#d97706' }} />
            <div className="dash__card-head-text">
              <h3 className="dash__card-title">Embudo de cotizaciones</h3>
              <p className="dash__card-sub">Flujo del mes actual</p>
            </div>
            <Link href="/dashboard/quotes/requests" className="dash__card-link">
              Ver <ChevronRight size={13} />
            </Link>
          </div>
          <div className="dash__funnel">
            <div className="dash__funnel-row">
              <div className="dash__funnel-bar-wrap">
                <div className="dash__funnel-label">Generadas</div>
                <div className="dash__funnel-track">
                  <div className="dash__funnel-fill dash__funnel-fill--blue" style={{ width: '100%' }} />
                </div>
                <span className="dash__funnel-count">{generated}</span>
              </div>
            </div>
            <div className="dash__funnel-row">
              <div className="dash__funnel-bar-wrap">
                <div className="dash__funnel-label">Aprobadas</div>
                <div className="dash__funnel-track">
                  <div
                    className="dash__funnel-fill dash__funnel-fill--green"
                    style={{ width: generated > 0 ? `${(approved / generated) * 100}%` : '0%' }}
                  />
                </div>
                <span className="dash__funnel-count">{approved}</span>
              </div>
            </div>
            <div className="dash__funnel-row">
              <div className="dash__funnel-bar-wrap">
                <div className="dash__funnel-label">En proceso</div>
                <div className="dash__funnel-track">
                  <div
                    className="dash__funnel-fill dash__funnel-fill--amber"
                    style={{ width: generated > 0 ? `${(pendingQuotes / generated) * 100}%` : '0%' }}
                  />
                </div>
                <span className="dash__funnel-count">{pendingQuotes}</span>
              </div>
            </div>
            <div className="dash__funnel-row">
              <div className="dash__funnel-bar-wrap">
                <div className="dash__funnel-label">Rechazadas</div>
                <div className="dash__funnel-track">
                  <div
                    className="dash__funnel-fill dash__funnel-fill--red"
                    style={{ width: generated > 0 ? `${(rejectedTotal / generated) * 100}%` : '0%' }}
                  />
                </div>
                <span className="dash__funnel-count">{rejectedTotal}</span>
              </div>
            </div>
            <div className="dash__funnel-rate">
              <span>Tasa de conversión</span>
              <strong className={conversionRate >= 50 ? 'dash__funnel-rate--good' : 'dash__funnel-rate--low'}>
                {conversionRate}%
              </strong>
            </div>
          </div>
        </div>

        {/* Recent activities */}
        <div className="dash__card">
          <div className="dash__card-head">
            <span className="dash__card-dot" style={{ background: '#2563eb' }} />
            <div className="dash__card-head-text">
              <h3 className="dash__card-title">Actividades recientes</h3>
              <p className="dash__card-sub">Últimas 5 actividades generadas</p>
            </div>
            <Link href="/dashboard/activities" className="dash__card-link">
              Ver todas <ChevronRight size={13} />
            </Link>
          </div>

          {activities.length > 0 ? (
            <ul className="dash__act-list">
              {activities.map((act) => (
                <li key={act.id} className="dash__act-item">
                  <div className="dash__act-avatar">
                    {act.company_name?.[0]?.toUpperCase() ?? 'A'}
                  </div>
                  <div className="dash__act-info">
                    <span className="dash__act-company">{act.company_name}</span>
                    <span className="dash__act-meta">
                      <Clock size={10} />
                      {new Date(act.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                      {act.approved_by ? ` · ${act.approved_by}` : ''}
                    </span>
                  </div>
                  <span className="dash__act-price">${formatPrice(act.price ?? 0)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="dash__empty">
              <AlertCircle size={18} />
              <span>Sin actividades recientes</span>
            </div>
          )}
        </div>

        {/* Financial breakdown */}
        <div className="dash__card">
          <div className="dash__card-head">
            <span className="dash__card-dot" style={{ background: '#7c3aed' }} />
            <div className="dash__card-head-text">
              <h3 className="dash__card-title">Resumen financiero</h3>
              <p className="dash__card-sub">Desglose del mes actual</p>
            </div>
          </div>

          <div className="dash__fin-rows">
            <div className="dash__fin-row">
              <div className="dash__fin-left">
                <span className="dash__fin-dot" style={{ background: '#16a34a' }} />
                <span className="dash__fin-label">Facturación aprobada</span>
              </div>
              <span className="dash__fin-val dash__fin-val--green">
                ${formatPrice(quotes?.approved_quotes.approved_quote_invoice ?? 0)}
              </span>
            </div>
            <div className="dash__fin-row">
              <div className="dash__fin-left">
                <span className="dash__fin-dot" style={{ background: '#94a3b8' }} />
                <span className="dash__fin-label">Facturación mes anterior</span>
              </div>
              <span className="dash__fin-val">
                ${formatPrice(quotes?.approved_quotes.last_approved_quote_invoice ?? 0)}
              </span>
            </div>
            <div className="dash__fin-row">
              <div className="dash__fin-left">
                <span className="dash__fin-dot" style={{ background: '#059669' }} />
                <span className="dash__fin-label">Ingresos por certificados</span>
              </div>
              <span className="dash__fin-val dash__fin-val--green">
                ${formatPrice(certStats?.income.currentMonth ?? 0)}
              </span>
            </div>
            <div className="dash__fin-row">
              <div className="dash__fin-left">
                <span className="dash__fin-dot" style={{ background: '#dc2626' }} />
                <span className="dash__fin-label">Rechazado por clientes</span>
              </div>
              <span className="dash__fin-val dash__fin-val--red">
                ${formatPrice(quotes?.rejected_quotes.invoice_rejected_by_client ?? 0)}
              </span>
            </div>
            <div className="dash__fin-row">
              <div className="dash__fin-left">
                <span className="dash__fin-dot" style={{ background: '#ef4444' }} />
                <span className="dash__fin-label">Rechazado por Metrocal</span>
              </div>
              <span className="dash__fin-val dash__fin-val--red">
                ${formatPrice(quotes?.rejected_quotes.invoice_rejected_by_staff ?? 0)}
              </span>
            </div>
          </div>

          <div className="dash__fin-total">
            <span>Facturación total del mes</span>
            <strong>${formatPrice(quotes?.all_quotes.current_invoice ?? 0)}</strong>
          </div>

          <Link href="/dashboard/quotes/requests" className="dash__fin-cta">
            Ver todas las cotizaciones
            <ChevronRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  )
}
