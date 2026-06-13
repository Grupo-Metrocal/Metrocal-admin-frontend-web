'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { RenderPrices } from './component/RenderPrices'
import { RenderEquipmentInfoSelected } from './component/RenderEquipmentInfoSelected'
import { RenderEquipment } from './component/RenderEquipment'
import { RenderClient } from './component/RenderClient'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import nioIcon from '@/assets/icons/nio.svg'
import percentIcon from '@/assets/icons/percent.svg'
import {
  setSelectedEquipment,
  calculateTotal,
  handleDispatchOnLoad,
  handleIVA,
  handleDiscountQuote,
  handleChangeExtras,
} from '@/redux/features/quote/quoteSlice'
import { CInput } from '@/components/CInput'
import { toast } from 'sonner'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { getCookie } from 'cookies-next'
import { useLoading } from '@/hooks/useLoading'
import { Spinner } from '@/components/Spinner'
import { useForm } from '@/hooks/useForm'
import { Modal } from '@/components/Modal'
import { CButton } from '@/components/CButton'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatPrice } from '@/utils/formatPrice'
import { AddEquipmentToQuoteButton } from './component/AddEquipmentButton'
import { AddEquipmentToQuote } from './component/AddEquipmentToQuote'
import {
  FileText, Building2, Wrench, DollarSign,
  CheckCircle2, Clock, XCircle, AlertCircle,
  MessageSquare, Receipt, X,
} from 'lucide-react'

export interface IEquipmentQuoteRequest {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: string
  calibration_method: string
  additional_remarks: string
  discount: number
  discountvalue: number
  status: string
  comment: string
  price: number
  total: number
  is_creditable: boolean
  use_alternative_certificate_method: string
}

export interface IClient {
  id: number
  company_name: string
  no: string
  phone: string
  address: string
  no_ruc: string
  email: string
  requested_by: string
  created_at: string
  company_phone: string
}

export interface IQuote {
  id: number
  status: string
  general_discount: number
  tax: number
  price: number
  created_at: string
  updated_at: any
  no: string
  equipment_quote_request: IEquipmentQuoteRequest[]
  rejected_comment: string
  client: IClient
  comment: string
  options: string[]
  extras: number
  rejected_by: 'client' | 'staff'
  rejected_options: string
  quote_modification_message: string
  quote_modification_status: 'none' | 'pending' | 'done'
  modifications_list_json?: IQuote[]
  modification_number?: number
  currency_type: 'NIO' | 'USD'
  change_currency_type: 'NIO' | 'USD'
  alt_client_email: string
  alt_client_requested_by: string
  alt_client_phone: string
}

export interface IRoot {
  params: { id: string }
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  done:     { label: 'Aprobado',  color: '#059669', bg: '#ecfdf5', icon: <CheckCircle2 size={13} /> },
  pending:  { label: 'Pendiente', color: '#dc2626', bg: '#fef2f2', icon: <Clock        size={13} /> },
  waiting:  { label: 'En espera', color: '#d97706', bg: '#fffbeb', icon: <AlertCircle  size={13} /> },
  rejected: { label: 'Rechazado', color: '#6b7280', bg: '#f9fafb', icon: <XCircle      size={13} /> },
  canceled: { label: 'Cancelado', color: '#6b7280', bg: '#f9fafb', icon: <XCircle      size={13} /> },
}

const getQuote = async (id: string) =>
  fetchData({
    url: `quotes/request/${id}`,
    headers: { Authorization: `Bearer ${getCookie('token')}` },
  })

export default function Page({ params }: IRoot) {
  const equipment = useAppSelector((state) => state.quote.equipment)
  const client = useAppSelector((state) => state.quote.client)
  const { loading, toggleLoading } = useLoading()
  const selectedEquipment = useAppSelector((state) => state.quote.selectedEquipment)
  const status = useAppSelector((state) => state.quote.status)
  const no = useAppSelector((state) => state.quote.no)

  const [quote, setQuote] = useState<IQuote>()
  const [saveQuote, setSaveQuote] = useState<any>()

  const dispatch = useAppDispatch()
  const id = params.id

  const handleSelectEquipment = (id: number) => {
    const found = equipment.find((item) => item.id === id)
    dispatch(setSelectedEquipment(found))
    dispatch(calculateTotal())
  }

  useEffect(() => {
    toggleLoading()
    getQuote(id)
      .then((res) => {
        if (res.success) {
          setQuote(res.data as IQuote)
          setSaveQuote(res.data)
          dispatch(handleDispatchOnLoad(res.data as IQuote))
        }
      })
      .finally(() => toggleLoading())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch])

  const statusCfg = STATUS_MAP[status ?? 'pending'] ?? STATUS_MAP.pending

  return (
    <LayoutPage
      title="Cotizaciones / solicitudes"
      rollBack
      Footer={() => <Footer saveQuote={saveQuote} />}
    >
      {/* ── Top bar ── */}
      <div className="qreq__topbar">
        <div className="qreq__topbar-left">
          <div className="qreq__topbar-icon">
            <FileText size={18} />
          </div>
          <div>
            <p className="qreq__topbar-label">Revisión de cotización</p>
            <h1 className="qreq__topbar-no">{no || `#${id}`}</h1>
          </div>
          {status && (
            <span className="qreq__status-badge" style={{ color: statusCfg.color, background: statusCfg.bg }}>
              {statusCfg.icon}{statusCfg.label}
            </span>
          )}
        </div>
        <div className="qreq__topbar-meta">
          <span className="qreq__topbar-meta-text">
            {equipment.length} equipo{equipment.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Modification banner ── */}
      {quote?.quote_modification_status === 'pending' && (
        <div className="qreq__mod-banner">
          <MessageSquare size={15} className="qreq__mod-banner-icon" />
          <div>
            <p className="qreq__mod-banner-title">Solicitud de modificación pendiente</p>
            <p className="qreq__mod-banner-msg">{quote.quote_modification_message}</p>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      {!loading ? (
        <div className="qreq__loading"><Spinner /></div>
      ) : (
        <div className="qreq__body">

          {/* Left — equipment list */}
          <aside className="qreq__sidebar">
            <div className="qreq__sidebar-header">
              <Wrench size={14} style={{ color: '#059669' }} />
              <span>Equipos</span>
            </div>
            <div className="qreq__equip-list">
              {equipment.map((eq) => (
                <RenderEquipment
                  key={eq.id}
                  equipment={eq}
                  status={eq.discount > 0}
                  onClick={() => handleSelectEquipment(eq.id)}
                  selected={selectedEquipment?.id === eq.id}
                />
              ))}
            </div>
            <AddEquipmentToQuoteButton
              Component={() => <AddEquipmentToQuote quoteId={id} />}
            />
          </aside>

          {/* Right — detail panels */}
          <div className="qreq__main">

            {/* Client */}
            <div className="qreq__card">
              <div className="qreq__card-header">
                <Building2 size={14} style={{ color: '#dc2626' }} />
                <span className="qreq__card-title">Información del cliente</span>
              </div>
              <div className="qreq__card-body">
                <RenderClient
                  client={client}
                  alt_client_email={quote?.alt_client_email}
                  alt_client_phone={quote?.alt_client_phone}
                  alt_client_requested_by={quote?.alt_client_requested_by}
                />
              </div>
            </div>

            {/* Equipment detail + prices — una sola card */}
            {selectedEquipment ? (
              <div className="qreq__card">
                <div className="qreq__card-header">
                  <Wrench size={14} style={{ color: '#2563eb' }} />
                  <span className="qreq__card-title">Detalle del equipo</span>
                  <span className="qreq__card-sub">{selectedEquipment.name}</span>
                </div>
                <div className="qreq__card-body">
                  <RenderEquipmentInfoSelected equipment={selectedEquipment} />
                </div>

                {/* Prices section integrada */}
                <div className="qreq__card-prices-section">
                  <div className="qreq__card-prices-header">
                    <DollarSign size={13} style={{ color: '#7c3aed' }} />
                    <span>Precio del servicio</span>
                  </div>
                  <div className="qreq__card-body">
                    <RenderPrices />
                  </div>
                </div>
              </div>
            ) : (
              <div className="qreq__card qreq__card--empty">
                <Wrench size={28} />
                <p>Selecciona un equipo de la lista para revisar y asignar precios</p>
              </div>
            )}

          </div>
        </div>
      )}
    </LayoutPage>
  )
}

/* ── Footer ── */
interface IFooterProps { saveQuote: any }

const Footer = ({ saveQuote }: IFooterProps) => {
  const { id, total, IVA, IVAValue, discount, discountvalue, subtotal, equipment, extras } =
    useAppSelector((state) => state.quote)
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const route = useRouter()

  const handleApproveQuote = async () => {
    if (!isAllEquipmentReviewed()) return toast.error('Debe revisar todos los equipos')
    const increase = searchParams.get('increase') === 'true'

    toast.loading('Aprobando cotización', { description: 'Espere un momento por favor...' })

    const response = await fetchData({
      url: 'quotes/request/update',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getCookie('token')}` },
      body: { id, price: Number(total), tax: Number(IVA), general_discount: Number(discount), extras: Number(extras), status: 'waiting', authorized_token: getCookie('token'), modifiedQuote: saveQuote },
      params: { increase },
    })

    toast.dismiss()
    if (response.status === 200) {
      toast.success('Cotización aprobada')
      route.push('/dashboard/quotes/requests')
    } else {
      toast.error('Error al aprobar la cotización')
    }
  }

  const isAllEquipmentReviewed = () => equipment.filter((item) => item.status === 'pending').length === 0
  const reviewed = equipment.filter((e) => e.status !== 'pending').length
  const allReviewed = reviewed === equipment.length && equipment.length > 0

  return (
    <div className="qreq__footer">

      {/* Left: editable financial inputs */}
      <div className="qreq__footer-inputs">
        <div className="qreq__footer-input-group">
          <label className="qreq__footer-input-label">IVA <span>{formatPrice(IVAValue)}</span></label>
          <CInput onChange={(e) => dispatch(handleIVA(e))} value={IVA.toString()} icon={percentIcon} min={0} type="number" label="" />
        </div>
        <div className="qreq__footer-input-group">
          <label className="qreq__footer-input-label">Traslado técnico</label>
          <CInput onChange={(e) => dispatch(handleChangeExtras(e.value))} value={extras.toString()} icon={nioIcon} min={0} type="number" label="" />
        </div>
        <div className="qreq__footer-input-group">
          <label className="qreq__footer-input-label">Descuento <span>{formatPrice(discountvalue)}</span></label>
          <CInput onChange={(e) => dispatch(handleDiscountQuote(e))} value={discount?.toString()} icon={percentIcon} min={0} type="number" label="" />
        </div>
      </div>

      {/* Center: totals as KPIs */}
      <div className="qreq__footer-kpis">
        <div className="qreq__footer-kpi">
          <span className="qreq__footer-kpi-label">Subtotal</span>
          <span className="qreq__footer-kpi-value">{formatPrice(subtotal)}</span>
        </div>
        <div className="qreq__footer-kpi qreq__footer-kpi--total">
          <span className="qreq__footer-kpi-label">Total</span>
          <span className="qreq__footer-kpi-value">{formatPrice(total)}</span>
        </div>
        <div className="qreq__footer-kpi">
          <span className="qreq__footer-kpi-label">Revisados</span>
          <span className="qreq__footer-kpi-value" style={{ color: allReviewed ? '#059669' : '#d97706' }}>
            {reviewed}/{equipment.length}
          </span>
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="qreq__footer-actions">
        <Modal
          nameButton="Rechazar cotización"
          title="Rechazar cotización"
          description="Una vez rechazada la cotización no podrá volver a editarla."
          buttonStyle={{ boxShadow: 'none', color: '#dc2626', backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '0.55rem 1.1rem', borderRadius: '9px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
          Component={() => <CommentRejectedQuote id={id} total={total} IVA={IVA} discount={discount} />}
        />
        <AlertDialogModal
          nameButton="Aprobar cotización"
          onConfirm={handleApproveQuote}
          title="Aprobar cotización"
          description="Una vez aprobada la cotización se enviará un correo al cliente con la cotización aprobada."
          buttonStyle={{ boxShadow: 'none', background: '#2563eb', borderRadius: '9px', fontSize: '0.82rem', padding: '0.55rem 1.1rem' }}
        />
      </div>
    </div>
  )
}

/* ── Reject modal content ── */
const CommentRejectedQuote = ({ id, total, IVA, discount }: { id: number; total: number; IVA: number; discount: number }) => {
  const { values, handleInputChange } = useForm({ comment: '' })
  const searchParams = useSearchParams()
  const route = useRouter()

  const handleRejectQuote = () => {
    toast.loading('Rechazando cotización', { description: 'Espere un momento por favor...' })
    const increase = searchParams.get('increase') === 'true'

    fetchData({
      url: 'quotes/request/rejected-review',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { id, status: 'rejected', price: Number(total), tax: Number(IVA), general_discount: Number(discount), authorized_token: getCookie('token'), rejected_comment: values.comment },
      params: { increase },
    })
      .then((response) => {
        toast.dismiss()
        if (response) {
          toast.success('Cotización rechazada')
          route.push('/dashboard/quotes/requests')
        } else {
          toast.error('Error al rechazar la cotización')
        }
      })
      .catch(() => toast.error('Error al rechazar la cotización'))
  }

  return (
    <div className="qreq__reject-form">
      <textarea
        name="comment"
        className="qreq__reject-textarea"
        placeholder="Escribe el motivo del rechazo..."
        onChange={(e) => handleInputChange(e.target)}
      >
        {values.comment}
      </textarea>
      <div className="qreq__reject-actions">
        <CButton
          onClick={handleRejectQuote}
          style={{ backgroundColor: '#dc2626', boxShadow: 'none' }}
          disabled={values.comment.trim() === ''}
        >
          Confirmar rechazo
        </CButton>
      </div>
    </div>
  )
}
