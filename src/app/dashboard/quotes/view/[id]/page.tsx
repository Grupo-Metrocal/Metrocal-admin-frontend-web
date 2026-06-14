'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import type { IQuote } from '../../requests/[id]/page'
import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { Spinner } from '@/components/Spinner'
import { formatPrice } from '@/utils/formatPrice'
import { useRouter } from 'next/navigation'
import { RegisterQuoteItem } from './_components/registerQuoteItem'
import { handleGeneratePDFQuote } from '@/utils/downloadPDFQuote'
import { isDateOutOfRange } from '@/utils/isDateOutOfRange'
import {
  Download, Building2, MapPin, Phone, Mail, User, Hash, Calendar,
  CheckCircle2, Clock, XCircle, AlertCircle, Receipt, BadgeCheck,
  Wrench, History, FileText, PenLine,
} from 'lucide-react'

const getData = async (id: string) =>
  fetchData({
    url: `quotes/request/${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getCookie('token')}` },
  })

export interface IRoot {
  params: { id: string }
}

interface IQuotes extends IQuote {
  approved_by: any
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  done: { label: 'Aprobado', color: '#059669', bg: '#ecfdf5', icon: <CheckCircle2 size={13} /> },
  pending: { label: 'Pendiente', color: '#dc2626', bg: '#fef2f2', icon: <Clock size={13} /> },
  waiting: { label: 'En espera', color: '#d97706', bg: '#fffbeb', icon: <AlertCircle size={13} /> },
  rejected: { label: 'Rechazado', color: '#6b7280', bg: '#f9fafb', icon: <XCircle size={13} /> },
  canceled: { label: 'Cancelado', color: '#6b7280', bg: '#f9fafb', icon: <XCircle size={13} /> },
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const [data, setData] = useState<IQuotes | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getData(id)
      .then((res) => {
        if (res.success) {
          setData({
            ...res.data,
            rejected_options: res.data.rejected_options
              ? res.data.rejected_options.replace(/[{}"]/g, '')
              : '',
          })
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  const status = data?.status ?? 'pending'
  const statusCfg = STATUS_MAP[status] ?? STATUS_MAP.pending
  const canEdit = !((status === 'pending' || status === 'waiting') && isDateOutOfRange(data?.created_at ?? '', 30))
  const hasMods = (data?.modifications_list_json?.length ?? 0) > 0 && (data?.modification_number ?? 0) > 0

  return (
    <LayoutPage title="Cotización" rollBack>
      {loading && !data ? (
        <div className="qv-loading"><Spinner /></div>
      ) : (
        <div className="qv">

          {/* ── Top bar ── */}
          <div className="qv__topbar">
            <div className="qv__topbar-left">
              <div className="qv__topbar-icon">
                <FileText size={18} />
              </div>
              <div>
                <p className="qv__topbar-label">Cotización</p>
                <h1 className="qv__topbar-no">{data?.no ?? `#${id}`}</h1>
              </div>
              {data && (
                <span className="qv__status-badge"
                  style={{ color: statusCfg.color, background: statusCfg.bg }}>
                  {statusCfg.icon}{statusCfg.label}
                </span>
              )}
            </div>
            <div className="qv__topbar-actions">
              <button
                className="qv__btn qv__btn--outline"
                onClick={() => handleGeneratePDFQuote({
                  id: data?.id ?? 0,
                  no: data?.no ?? '',
                  company_name: data?.client?.company_name ?? '',
                })}
              >
                <Download size={14} />Descargar PDF
              </button>
              {canEdit && (
                <button
                  className="qv__btn qv__btn--primary"
                  onClick={() => router.push(`/dashboard/quotes/requests/${id}?increase=true`)}
                >
                  <PenLine size={14} />Editar cotización
                </button>
              )}
            </div>
          </div>

          {/* ── Modification history ── */}
          {hasMods && (
            <div className="qv__card">
              <div className="qv__card-header">
                <History size={15} className="qv__card-header-icon" style={{ color: '#7c3aed' }} />
                <div>
                  <h2 className="qv__card-title">Registro de Modificaciones</h2>
                  <p className="qv__card-sub">{data!.modifications_list_json!.length} versión(es) anteriores</p>
                </div>
              </div>
              <div className="qv__mod-grid">
                {data!.modifications_list_json!.map((quote, index) => (
                  <RegisterQuoteItem key={index} quote={quote} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* ── Two-column body ── */}
          <div className="qv__body">

            {/* Left */}
            <div className="qv__left">

              {/* Financial summary */}
              <div className="qv__card">
                <div className="qv__card-header">
                  <Receipt size={15} className="qv__card-header-icon" style={{ color: '#2563eb' }} />
                  <div>
                    <h2 className="qv__card-title">Detalles de la cotización</h2>
                    <p className="qv__card-sub">Resumen financiero y estado</p>
                  </div>
                </div>

                <div className="qv__kpis">
                  <div className="qv__kpi qv__kpi--green">
                    <span className="qv__kpi-label">Precio total</span>
                    <span className="qv__kpi-value">{formatPrice(data?.price)}</span>
                  </div>
                  <div className="qv__kpi">
                    <span className="qv__kpi-label">IVA</span>
                    <span className="qv__kpi-value">{data?.tax ?? 0}%</span>
                  </div>
                  <div className="qv__kpi">
                    <span className="qv__kpi-label">Descuento general</span>
                    <span className="qv__kpi-value">{data?.general_discount ?? 0}%</span>
                  </div>
                  <div className="qv__kpi">
                    <span className="qv__kpi-label">Traslado técnico</span>
                    <span className="qv__kpi-value">{formatPrice(data?.extras)}</span>
                  </div>
                </div>

                <div className="qv__details">
                  <DetailRow icon={<Hash size={13} />} label="N° de cotización" value={data?.no ?? '—'} />
                  <DetailRow icon={<BadgeCheck size={13} />} label="Revisado por" value={data?.approved_by?.username ?? 'Aún no aprobada'} />
                  <DetailRow icon={<Calendar size={13} />} label="Fecha de creación" value={formatDate(data?.created_at ?? '')} />
                </div>
              </div>

              {/* Equipment */}
              <div className="qv__card">
                <div className="qv__card-header">
                  <Wrench size={15} className="qv__card-header-icon" style={{ color: '#059669' }} />
                  <div>
                    <h2 className="qv__card-title">Equipos solicitados</h2>
                    <p className="qv__card-sub">{data?.equipment_quote_request?.length ?? 0} equipo(s)</p>
                  </div>
                </div>
                <div className="qv__equip-list">
                  {data?.equipment_quote_request.map((eq, i) => {
                    const eqCfg = STATUS_MAP[eq.status] ?? STATUS_MAP.pending
                    return (
                      <div key={eq.id} className="qv__equip-item">
                        <div className="qv__equip-item-header">
                          <div className="qv__equip-item-num">{i + 1}</div>
                          <h3 className="qv__equip-item-name">{eq.name}</h3>
                          <span className="qv__equip-item-status"
                            style={{ color: eqCfg.color, background: eqCfg.bg }}>
                            {eqCfg.icon}{eqCfg.label}
                          </span>
                        </div>
                        <div className="qv__equip-item-stats">
                          <EquipStat label="Precio unitario" value={formatPrice(eq.price)} />
                          <EquipStat label="Cantidad" value={String(eq.count)} />
                          <EquipStat label="Descuento" value={`${eq.discount}%`} />
                          <EquipStat label="Total" value={formatPrice(eq.total)} highlight />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Right */}
            <div className="qv__right">

              {/* Client info */}
              <div className="qv__card">
                <div className="qv__card-header">
                  <Building2 size={15} className="qv__card-header-icon" style={{ color: '#dc2626' }} />
                  <div>
                    <h2 className="qv__card-title">Información del cliente</h2>
                    <p className="qv__card-sub">Datos de contacto y empresa</p>
                  </div>
                </div>
                <div className="qv__client-fields">
                  <ClientField icon={<Building2 size={13} />} label="Empresa" value={data?.client?.company_name} />
                  <ClientField icon={<MapPin size={13} />} label="Dirección" value={data?.client?.address} />
                  <ClientField icon={<Phone size={13} />} label="Teléfono" value={data?.alt_client_phone || data?.client?.phone} />
                  <ClientField icon={<Mail size={13} />} label="Correo" value={data?.alt_client_email || data?.client?.email} />
                  <ClientField icon={<User size={13} />} label="Solicitado por" value={data?.alt_client_requested_by || data?.client?.requested_by} />
                  <ClientField icon={<Hash size={13} />} label="No. RUC" value={data?.client?.no_ruc} />
                  <ClientField icon={<Calendar size={13} />} label="Cliente desde" value={formatDate(data?.client?.created_at ?? '')} />
                </div>
              </div>

              {/* Alt certificate data */}
              {(data?.alt_client_company_name || data?.alt_client_address) && (
                <div className="qv__card">
                  <div className="qv__card-header">
                    <FileText size={15} className="qv__card-header-icon" style={{ color: '#7c3aed' }} />
                    <div>
                      <h2 className="qv__card-title">Datos para certificado</h2>
                      <p className="qv__card-sub">Información alternativa en el PDF</p>
                    </div>
                  </div>
                  <div className="qv__client-fields">
                    {data.alt_client_company_name && (
                      <ClientField icon={<Building2 size={13} />} label="Empresa" value={data.alt_client_company_name} />
                    )}
                    {data.alt_client_address && (
                      <ClientField icon={<MapPin size={13} />} label="Dirección" value={data.alt_client_address} />
                    )}
                    {data.alt_client_email && (
                      <ClientField icon={<Mail size={13} />} label="E-mail" value={data.alt_client_email} />
                    )}
                  </div>
                </div>
              )}

              {/* Rejection */}
              {data?.status === 'rejected' && (
                <div className="qv__card qv__card--rejected">
                  <div className="qv__card-header">
                    <XCircle size={15} className="qv__card-header-icon" style={{ color: '#dc2626' }} />
                    <div>
                      <h2 className="qv__card-title">Motivo de rechazo</h2>
                      <p className="qv__card-sub">
                        Rechazado por {data.rejected_by === 'client' ? 'el cliente' : 'el personal'}
                      </p>
                    </div>
                  </div>
                  {data.rejected_by === 'client' ? (
                    <div className="qv__rejection">
                      {data.rejected_options && (
                        <>
                          <p className="qv__rejection-label">Opciones seleccionadas</p>
                          <ul className="qv__rejection-list">
                            {data.rejected_options.split(',').map((opt, i) => (
                              <li key={i}>{opt.trim()}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      <p className="qv__rejection-label">Mensaje del cliente</p>
                      <p className="qv__rejection-message">
                        {data.rejected_comment || 'Sin mensaje'}
                      </p>
                    </div>
                  ) : (
                    <div className="qv__rejection">
                      <p className="qv__rejection-alert">
                        Esta cotización fue rechazada por el personal de Metrocal.
                      </p>
                      <p className="qv__rejection-label">Mensaje enviado</p>
                      <p className="qv__rejection-message">
                        {data.rejected_comment || 'Sin mensaje'}
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </LayoutPage>
  )
}

/* ── Sub-components ── */

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="qv__detail-row">
    <span className="qv__detail-icon">{icon}</span>
    <span className="qv__detail-label">{label}</span>
    <span className="qv__detail-value">{value}</span>
  </div>
)

const ClientField = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => (
  <div className="qv__client-field">
    <span className="qv__client-field-icon">{icon}</span>
    <div className="qv__client-field-text">
      <span className="qv__client-field-label">{label}</span>
      <span className="qv__client-field-value">{value || '—'}</span>
    </div>
  </div>
)

const EquipStat = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`qv__equip-stat${highlight ? ' qv__equip-stat--total' : ''}`}>
    <span className="qv__equip-stat-label">{label}</span>
    <span className="qv__equip-stat-value">{value}</span>
  </div>
)
