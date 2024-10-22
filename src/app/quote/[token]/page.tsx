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
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: quote?.id,
        status: 'done',
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Cotización aprobada correctamente', {
        description: 'Pronto nos pondremos en contacto con usted. 😊',
      })
    } else {
      toast('Error al aprobar la cotización', {
        description: response.details,
      })
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
      toast.success(`Se ha cambiado el tipo de moneda ha ${type}`)
    } else {
      toast.error('Hubo un error en la solicitud')
    }
  }

  const subtotal1 =
    quote?.equipment_quote_request ?
      quote?.equipment_quote_request
        ?.map((equipment: IEquipmentQuoteRequest) =>
          equipment.status === 'done' ? equipment.total : 0,
        )
        .reduce((a, b) => a + b, 0) + quote?.extras
      : 0

  const general_discount = quote?.general_discount || 0
  const subtotal2 = subtotal1 - (subtotal1 * general_discount) / 100


  return error ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-gray-500">La cotización no existe o fue eliminada</p>
    </div>
  ) : (
    <main className="main-quote">
      <header>
        <div className="main-image">
          <Image src={metrocalLogo} alt="Metrocal" />
        </div>
        <div className="main-title">
          <h4>
            <span>METROLOGÍA CONSULTORES DE NICARAGUA, S.A</span>
            <span>RUC : J0310000169420</span>
            <span>COTIZACIÓN DE SERVICIOS</span>
          </h4>
        </div>
        <div className="main-code">
          <h5>
            código
            <span>NI-R02-MCPR-02</span>
          </h5>
        </div>
      </header>

      <div className="mt-4 -mb-2">
        <h4 className="text-center font-bold ">
          Estado de la cotización:{' '}
          <span className="font-medium">
            {quote?.status === 'waiting'
              ? 'aprobada y lista para su aceptación.'
              : quote?.status === 'done'
                ? 'Aprobada y aceptada.'
                : 'No aprobada.'}
          </span>
        </h4>
      </div>

      <div className="mt-4 -mb-2">
        <h4 className="text-center font-bold ">
          No. de cotización:{' '}
          <span className="font-medium">
            {quote?.no}
          </span>
        </h4>
      </div>

      <section className="main-quote-client">
        <h4>
          <span className="font-bold">Empresa: </span>
          <span className="font-medium">{quote?.client?.company_name}</span>
        </h4>

        <h4>
          <span className="font-bold">Telefono: </span>
          <span className="font-medium">{quote?.alt_client_phone || quote?.client?.phone}</span>
        </h4>

        <h4>
          <span className="font-bold">No: </span>
          <span className="font-medium">{quote?.no}</span>
        </h4>

        <h4>
          <span className="font-bold">Solicitado por: </span>
          <span className="font-medium">{quote?.alt_client_requested_by || quote?.client?.requested_by}</span>
        </h4>

        <h4>
          <span className="font-bold">E-Mail: </span>
          <span className="font-medium">{quote?.alt_client_email || quote?.client?.email}</span>
        </h4>

        <h4>
          <span className="font-bold">No. RUC: </span>
          <span className="font-medium">{quote?.client?.no_ruc}</span>
        </h4>

        <h4>
          <span className="font-bold">Dirección: </span>
          <span className="font-medium">{quote?.client?.address}</span>
        </h4>
      </section>

      <section className="main-body">
        <section className="table">
          <div className="table__header">
            <div className="table__header__th">
              <span>Tipo de servicio</span>
              <span>Equipo</span>
              <span>Cantidad</span>
              <span>Método de calibración</span>
              <span>Observación adicional</span>
              <span>Precio U. (USD)</span>
              <span>Precio total (USD)</span>
            </div>
          </div>
          <div className="table__body">
            {quote?.equipment_quote_request?.map(
              (equipment: IEquipmentQuoteRequest, index: any) => (
                <div
                  className="table__body__tr"
                  key={index}
                  data-index={`Producto #${index + 1}`}
                >
                  <span data-label="Tipo de servicio">
                    {equipment.type_service}
                  </span>
                  <span data-label="Equipo" className='relative'>
                    {equipment.name}

                    {
                      equipment.comment && (
                        <Popover>
                          <PopoverTrigger className='absolute right-0 top-[-15px]'>
                            <Image
                              src={commentIcon}
                              alt="comment"
                              width={20}
                              height={20}
                            />
                          </PopoverTrigger>
                          <PopoverContent className='bg-white'>
                            <div className='flex flex-col gap-4'>
                              <strong>Comentario del equipo:</strong>

                              {equipment.comment}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )
                    }
                  </span>
                  <span data-label="Cantidad">{equipment.count}</span>
                  <span data-label="Método de calibración">
                    {equipment.calibration_method || 'N/A'}
                  </span>
                  <span data-label="Observación adicional" className='

                  '>
                    {equipment.status === 'done'
                      ? equipment.additional_remarks
                      : '---'}
                  </span>
                  <span data-label="Precio U. (USD)">
                    {equipment.status === 'done'
                      ? formatPrice(equipment.price)
                      : '---'}
                  </span>
                  <span data-label="Precio total (USD)">
                    {equipment.status === 'done'
                      ? formatPrice(equipment.total)
                      : 'No aprobado'}
                  </span>
                </div>
              ),
            )}
            {
              quote && quote.extras > 0 && (
                <div className="table__body__tr">
                  <span data-label="Tipo de servicio">Traslado técnico</span>
                  <span data-label="Equipo">---</span>
                  <span data-label="Cantidad">---</span>
                  <span data-label="Método de calibración">---</span>
                  <span data-label="Observación adicional">---</span>
                  <span data-label="Precio U. (USD)">
                    {formatPrice(quote?.extras)}
                  </span>
                  <span data-label="Precio total (USD)">
                    {formatPrice(quote?.extras)}
                  </span>
                </div>
              )
            }
          </div>
        </section>

        <div className="section">
          <div className="observation">
            <h4>
              Observaciones: <span>Cotización válida por 30 días</span>
            </h4>
            <ul className="conditions">
              <li>
                Certificados de calibración se entregan los dias miércoles o
                retirar en nuestras instalaciones.
              </li>
              <li>
                Servicio marcado con ( * ) fuera de alcance de acreditación,
                trazable al Sl.
              </li>
              <li>
                Elaborar cheque a nombre de{' '}
                <strong>Metrologia Consultores de Nicaragua, S.A.</strong>
              </li>
            </ul>

            <h4>
              Condición de pago: <span>Contra entrega de Certificado</span>
            </h4>
          </div>

          <div className="prices">
            <h4>
              <span>SUB-TOTAL ($):</span>
              <span>
                {formatPrice(subtotal1)}
              </span>
            </h4>

            <h4>
              <span>DESCUENTO ($):</span>
              <span>{
                formatPrice(subtotal1 * general_discount / 100)
              }</span>
            </h4>
            <h4>
              <span>SUB-TOTAL ($):</span>
              <span>
                {formatPrice(subtotal2)}
              </span>
            </h4>
            <h4>
              <span>I.V.A ($):</span>
              <span>{
                formatPrice(subtotal2 * (quote?.tax || 0) / 100)
              }</span>
            </h4>


            <h4>
              <span>TOTAL ($):</span>
              <span>{formatPrice(quote?.price)}</span>
            </h4>
          </div>
        </div>

        <p className="text-center mt-2 bg-[#166A9B] text-white font-medium p-2 w-full">
          Certificados de calibración se entregan en formato digital .PDF, serán enviados al correo del contacto del cliente, en un periodo máximo de diez días hábiles, posterior a la realización del servicio.
          Servicio marcado con ( * ) corresponde a un servicio fuera del alcance de acreditación, trazable al Sl.
          Elaborar cheque a nombre de Metrología Consultores de Nicaragua, S.A.
          Condición de pago: Contra entrega de Certificado
        </p>

        <div className="actions">
          <div className='currency-type'>
            <label htmlFor="currency_type">Tipo de Moneda</label>
            <select name='currency_type' id='currency_type'
              onChange={(e) => handleChangeCurrencyType(e.currentTarget.value)}
            >
              {
                Object.values(CurrencyType).map((currencyOption, index) => (
                  <option value={currencyOption} key={index}
                    selected={currencyOption === quote?.currency_type}
                  >{currencyOption}</option>
                ))
              }
            </select>
          </div>
          <div>

            <Modal
              nameButton="SOLICITAR MODIFICACIÓN"
              title="Solicitar modificación"
              description='Si desea realizar alguna modificación a la cotización, por favor escriba los cambios que desea realizar y haga clic en "Enviar solicitud". Nos pondremos en contacto con usted para confirmar los cambios realizados.'
              Component={() => <ModifyQuote id={quote?.id as number} />}
              buttonStyle={{
                color: '#09f',
                fontWeight: 'bold',
              }}
            />
            <AlertDialogModal
              nameButton="Aprobar cotización"
              description="Una vez aprobada la cotización, el equipo de Metrología Consultores de Nicaragua, S.A. se pondrá en contacto con usted para llevar a cabo los servicios solicitados."
              title="Aprobar cotización"
              onConfirm={handleApproveQuote}
              buttonStyle={{
                boxShadow: 'none',
              }}
            />
            <Modal
              nameButton="No Aprobar"
              title="¿Estas seguro de no aprobar esta cotización?"
              description="Nos gustaría recibir tus comentarios. Si decidiste no aprobar nuestra cotización, por favor cuéntanos cuál fue el motivo. Tu opinión es muy valiosa para nosotros y nos ayudará a mejorar nuestros servicios."
              buttonStyle={{
                boxShadow: 'none',
                color: 'tomato',
                backgroundColor: '#fff',
                border: '1px solid #999',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
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
              onConfirm={() => handleGeneratePDFQuote({ id: quote?.id as number, no: quote?.no as string, company_name: quote?.client?.company_name as string })}
              buttonStyle={{
                boxShadow: 'none',
                color: '#333',
                backgroundColor: '#fff',
                border: '1px solid #999',
              }}
            />

          </div>
        </div>
      </section>
      <TermsAndConditions />

      <FooterComponent
        requested_by={quote?.client?.requested_by}
        approved_by={quote?.approved_by?.username}
        approved_date={quote?.updated_at}
      />

      <Toaster closeButton />
    </main >
  )
}

