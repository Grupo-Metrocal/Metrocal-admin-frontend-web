'use client'
import './index.scss'
import Image from 'next/image'
import { Modal } from '@/components/Modal'
import metrocalLogo from 'public/metrocal.svg'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetch'
import type {
  IQuote,
  IEquipmentQuoteRequest,
} from '@/app/dashboard/quotes/requests/[id]/page'
import { FooterComponent } from '@/app/footer'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Toaster, toast } from 'sonner'
import { TermsAndConditions } from '@/components/TermsAndConditions'
import { formatPrice } from '@/utils/formatPrice'
import commentIcon from '@/assets/icons/comment.svg'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ModifyQuote } from './_components/ModifyQuote'
import { handleGeneratePDFQuote } from '@/utils/downloadPDFQuote'
import { CommentRejectedQuote } from './_components/rejectedQuote'
import { CurrencyType } from '@/types/currencyTypes'
import {
  CheckCircle2,
  Clock,
  XCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  User,
  FileText,
  Hash,
  AlertCircle,
} from 'lucide-react'

interface Props {
  params: {
    token: string
  }
}

const getQuote = async (token: string) => {
  const response = await fetchData({
    url: `quotes/request/token/${token}`,
    method: 'GET',
  })
  return response
}

interface IUser {
  username: string
}
interface TQuoteByToken extends IQuote {
  approved_by: IUser
}

const STATUS_CONFIG = {
  waiting: {
    label: 'Aprobada — lista para su aceptación',
    icon: Clock,
    cls: 'waiting',
  },
  done: {
    label: 'Aprobada y aceptada',
    icon: CheckCircle2,
    cls: 'done',
  },
  rejected: {
    label: 'No aprobada',
    icon: XCircle,
    cls: 'rejected',
  },
}

export default function Page({ params }: Props) {
  const [quote, setQuote] = useState<TQuoteByToken>()
  const [error, setError] = useState<boolean>(false)
  const token = params.token

  useEffect(() => {
    const getQuoteRequest = async () => {
      const response = await getQuote(token)
      if (response.success) {
        setQuote(response.data)
      } else {
        setError(true)
      }
    }
    getQuoteRequest()
  }, [token])

  const handleApproveQuote = async () => {
    toast.loading('Aprobando cotización...', {
      description: 'Espere un momento por favor',
    })
    const response = await fetchData({
      url: 'quotes/request/approved-rejected/client',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { id: quote?.id, status: 'done' },
    })
    toast.dismiss()
    if (response.success) {
      toast.success('Cotización aprobada correctamente', {
        description: 'Pronto nos pondremos en contacto con usted. 😊',
      })
    } else {
      toast('Error al aprobar la cotización', { description: response.details })
    }
  }

  const handleChangeCurrencyType = async (type: string) => {
    toast.loading('Cambiando Tipo de Moneda...')
    const response = await fetchData({
      url: `quotes/currency/change-type/${type}/${quote?.id}`,
      method: 'GET',
    })
    toast.dismiss()
    if (response.success) {
      toast.success(`Se ha cambiado el tipo de moneda a ${type}`)
    } else {
      toast.error('Hubo un error en la solicitud')
    }
  }

  const subtotal1 =
    quote?.equipment_quote_request
      ? quote.equipment_quote_request
          .map((e: IEquipmentQuoteRequest) => (e.status === 'done' ? e.total : 0))
          .reduce((a, b) => a + b, 0) + (quote?.extras ?? 0)
      : 0

  const general_discount = quote?.general_discount || 0
  const subtotal2 = subtotal1 - (subtotal1 * general_discount) / 100
  const taxAmount = subtotal2 * ((quote?.tax || 0) / 100)

  const statusKey = (quote?.status as keyof typeof STATUS_CONFIG) ?? 'waiting'
  const statusInfo = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.waiting
  const StatusIcon = statusInfo.icon

  if (error) {
    return (
      <div className="qv__error">
        <AlertCircle size={48} />
        <h1>Cotización no encontrada</h1>
        <p>La cotización no existe o fue eliminada.</p>
      </div>
    )
  }

  return (
    <main className="qv">
      <div className="qv__container">

        {/* Header */}
        <header className="qv__header">
          <div className="qv__header-logo">
            <Image src={metrocalLogo} alt="Metrocal" width={64} height={64} />
          </div>
          <div className="qv__header-info">
            <span className="qv__header-company">METROLOGÍA CONSULTORES DE NICARAGUA, S.A.</span>
            <span className="qv__header-ruc">RUC: J0310000169420</span>
            <span className="qv__header-title">COTIZACIÓN DE SERVICIOS</span>
          </div>
          <div className="qv__header-code">
            <span className="qv__header-code-label">Código</span>
            <span className="qv__header-code-value">NI-R02-MCPR-02</span>
          </div>
        </header>

        {/* Status bar */}
        <div className={`qv__status qv__status--${statusInfo.cls}`}>
          <StatusIcon size={17} />
          <span className="qv__status-text">{statusInfo.label}</span>
          <span className="qv__status-no">No. {quote?.no}</span>
        </div>

        {/* Client info */}
        <section className="qv__card">
          <div className="qv__card-header">
            <Building2 size={15} />
            <span>Información del cliente</span>
          </div>
          <div className="qv__client-grid">
            <div className="qv__client-field">
              <Building2 size={13} className="qv__client-icon" />
              <div>
                <span className="qv__client-label">Empresa</span>
                <span className="qv__client-value">{quote?.client?.company_name}</span>
              </div>
            </div>
            <div className="qv__client-field">
              <Phone size={13} className="qv__client-icon" />
              <div>
                <span className="qv__client-label">Teléfono</span>
                <span className="qv__client-value">
                  {quote?.alt_client_phone || quote?.client?.phone}
                </span>
              </div>
            </div>
            <div className="qv__client-field">
              <User size={13} className="qv__client-icon" />
              <div>
                <span className="qv__client-label">Solicitado por</span>
                <span className="qv__client-value">
                  {quote?.alt_client_requested_by || quote?.client?.requested_by}
                </span>
              </div>
            </div>
            <div className="qv__client-field">
              <Mail size={13} className="qv__client-icon" />
              <div>
                <span className="qv__client-label">E-mail</span>
                <span className="qv__client-value">
                  {quote?.alt_client_email || quote?.client?.email}
                </span>
              </div>
            </div>
            <div className="qv__client-field">
              <Hash size={13} className="qv__client-icon" />
              <div>
                <span className="qv__client-label">No. RUC</span>
                <span className="qv__client-value">{quote?.client?.no_ruc}</span>
              </div>
            </div>
            <div className="qv__client-field">
              <MapPin size={13} className="qv__client-icon" />
              <div>
                <span className="qv__client-label">Dirección</span>
                <span className="qv__client-value">{quote?.client?.address}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services table */}
        <section className="qv__card qv__card--no-pad">
          <div className="qv__card-header">
            <FileText size={15} />
            <span>Detalle de servicios</span>
          </div>
          <div className="qv__table-wrap">
            <table className="qv__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tipo de servicio</th>
                  <th>Equipo</th>
                  <th>Cantidad</th>
                  <th>Método de calibración</th>
                  <th>Observación adicional</th>
                  <th>Precio U.</th>
                  <th>Precio total</th>
                </tr>
              </thead>
              <tbody>
                {quote?.equipment_quote_request?.map(
                  (equipment: IEquipmentQuoteRequest, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{equipment.type_service}</td>
                      <td>
                        <span className="qv__equip-name">
                          {equipment.name}
                          {equipment.comment && (
                            <Popover>
                              <PopoverTrigger className="qv__comment-trigger">
                                <Image src={commentIcon} alt="comment" width={16} height={16} />
                              </PopoverTrigger>
                              <PopoverContent className="bg-white">
                                <div className="flex flex-col gap-2">
                                  <strong>Comentario:</strong>
                                  <span>{equipment.comment}</span>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </span>
                      </td>
                      <td>{equipment.count}</td>
                      <td>
                        {equipment.calibration_method === 'GENERIC_METHOD'
                          ? 'Comp. Directa Trazable'
                          : equipment.calibration_method}
                      </td>
                      <td>
                        {equipment.status === 'done' ? equipment.additional_remarks : '—'}
                      </td>
                      <td>
                        {equipment.status === 'done' ? formatPrice(equipment.price) : '—'}
                      </td>
                      <td className={equipment.status !== 'done' ? 'qv__cell--rejected' : ''}>
                        {equipment.status === 'done'
                          ? formatPrice(equipment.total)
                          : 'No aprobado'}
                      </td>
                    </tr>
                  ),
                )}
                {quote && quote.extras > 0 && (
                  <tr>
                    <td>—</td>
                    <td>Traslado técnico</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>{formatPrice(quote.extras)}</td>
                    <td>{formatPrice(quote.extras)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary row: conditions + pricing */}
        <div className="qv__summary">
          <div className="qv__conditions">
            <p className="qv__conditions-title">Observaciones generales</p>
            <p className="qv__conditions-validity">Cotización válida por 30 días</p>
            <ul className="qv__conditions-list">
              <li>
                Certificados de calibración se entregan en formato digital .PDF, serán enviados
                al correo del contacto del cliente, en un periodo máximo de diez días hábiles,
                posterior a la realización del servicio.
              </li>
              <li>
                Servicio marcado con (*) corresponde a un servicio fuera del alcance de
                acreditación, trazable al SI.
              </li>
              <li>
                Elaborar cheque a nombre de{' '}
                <strong>Metrología Consultores de Nicaragua, S.A.</strong>
              </li>
            </ul>
            <p className="qv__conditions-payment">
              <strong>Condición de pago:</strong> Contra entrega de Certificado
            </p>

            {quote?.observations && (
              <div className="qv__service-obs">
                <span className="qv__service-obs-label">Observaciones del servicio</span>
                <p>{quote.observations}</p>
              </div>
            )}
          </div>

          <div className="qv__pricing">
            <div className="qv__pricing-row">
              <span>Sub-total</span>
              <span>{formatPrice(subtotal1)}</span>
            </div>
            {general_discount > 0 && (
              <div className="qv__pricing-row qv__pricing-row--discount">
                <span>Descuento ({general_discount}%)</span>
                <span>−{formatPrice(subtotal1 * general_discount / 100)}</span>
              </div>
            )}
            <div className="qv__pricing-row">
              <span>Sub-total c/desc.</span>
              <span>{formatPrice(subtotal2)}</span>
            </div>
            <div className="qv__pricing-row">
              <span>I.V.A ({quote?.tax ?? 0}%)</span>
              <span>{formatPrice(taxAmount)}</span>
            </div>
            <div className="qv__pricing-row qv__pricing-row--total">
              <span>TOTAL</span>
              <span>{formatPrice(quote?.price)}</span>
            </div>
          </div>
        </div>

        {/* Delivery note */}
        <div className="qv__delivery-note">
          El certificado de calibración se entrega máximo en 10 (diez) días hábiles después de
          realizada la calibración.
        </div>

        {/* Actions */}
        <div className="qv__actions">
          <div className="qv__actions-currency">
            <label htmlFor="change_currency_type">Tipo de moneda</label>
            <select
              id="change_currency_type"
              name="change_currency_type"
              onChange={(e) => handleChangeCurrencyType(e.currentTarget.value)}
            >
              {Object.values(CurrencyType).map((opt, i) => (
                <option key={i} value={opt} selected={opt === quote?.change_currency_type}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="qv__actions-buttons">
            <Modal
              nameButton="Solicitar modificación"
              title="Solicitar modificación"
              description='Si desea realizar alguna modificación a la cotización, por favor escriba los cambios que desea realizar y haga clic en "Enviar solicitud".'
              Component={() => <ModifyQuote id={quote?.id as number} />}
              buttonStyle={{ color: '#166A9B', fontWeight: 600 }}
            />

            <Modal
              nameButton="No aprobar"
              title="¿Estás seguro de no aprobar esta cotización?"
              description="Nos gustaría recibir tus comentarios. Tu opinión nos ayudará a mejorar nuestros servicios."
              buttonStyle={{
                color: '#dc2626',
                backgroundColor: 'transparent',
                border: '1.5px solid #dc2626',
                borderRadius: '6px',
                padding: '0.5rem 1.25rem',
                fontWeight: 600,
              }}
              Component={() => (
                <CommentRejectedQuote quote={quote ? quote : ({} as IQuote)} />
              )}
            />

            <AlertDialogModal
              nameButton="Descargar PDF"
              title="Descargar PDF"
              description="La descarga del PDF se iniciará automáticamente."
              onConfirm={() =>
                handleGeneratePDFQuote({
                  id: quote?.id as number,
                  no: quote?.no as string,
                  company_name: quote?.client?.company_name as string,
                })
              }
              buttonStyle={{
                color: '#374151',
                backgroundColor: 'transparent',
                border: '1.5px solid #d1d5db',
                borderRadius: '6px',
                padding: '0.5rem 1.25rem',
                fontWeight: 600,
              }}
            />

            <AlertDialogModal
              nameButton="Aprobar cotización"
              description="Una vez aprobada la cotización, el equipo de Metrología Consultores de Nicaragua, S.A. se pondrá en contacto con usted para llevar a cabo los servicios solicitados."
              title="Aprobar cotización"
              onConfirm={handleApproveQuote}
              buttonStyle={{ boxShadow: 'none' }}
            />
          </div>
        </div>

        <TermsAndConditions />
        <FooterComponent
          requested_by={quote?.client?.requested_by}
          approved_by={quote?.approved_by?.username}
          approved_date={quote?.updated_at}
        />
      </div>

      <Toaster closeButton />
    </main>
  )
}
