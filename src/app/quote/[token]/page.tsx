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
import { Footer } from '@/app/page'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Toaster, toast } from 'sonner'
import { useForm } from '@/hooks/useForm'
import { CButton } from '@/components/CButton'

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

export default function Page({ params }: Props) {
  const [quote, setQuote] = useState<IQuote>()
  const [error, setError] = useState<boolean>(false)
  const token = params.token

  useEffect(() => {
    const getQuoteRequest = async () => {
      const response = await getQuote(token)

      if (response) {
        setQuote(response)
      } else {
        setError(true)
      }
    }

    getQuoteRequest()
  }, [token])

  const handleGeneratePDF = async () => {
    toast.loading('Generando PDF...', {
      description: 'Espere un momento por favor',
    })
    const response = await fetchData({
      url: `quotes/request/pdf/${quote?.id}`,
      method: 'GET',
      responseType: 'blob',
    })

    console.log(response)

    if (response) {
      const blob = new Blob([response], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Cotizacion.pdf'
      link.click()
      toast.success('PDF generado correctamente')
    } else {
      toast.error('Error al generar el PDF')
    }
  }

  const handleApproveQuote = async () => {
    if (quote?.status === 'done') {
      toast.error('La cotización ya fue aprobada')
      return
    }

    if (quote?.status === 'rejected') {
      toast.error('La cotización fue rechazada')
      return
    }

    toast.loading('Aprobando cotización...', {
      description: 'Espere un momento por favor',
    })
    const response = await fetchData({
      url: 'quotes/request/change-status',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: quote?.id,
        status: 'done',
      },
    })
    if (response) {
      toast.success('Cotización aprobada correctamente', {
        description: 'Pronto nos pondremos en contacto con usted. 😊',
      })
    } else {
      toast.error('Error al aprobar la cotización')
    }
  }

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
            <span>SOLICITUD DE SERVICIOS</span>
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

      <section className="main-quote-client">
        <h4>
          <span className="font-bold">Empresa: </span>
          <span className="font-medium">{quote?.client.company_name}</span>
        </h4>

        <h4>
          <span className="font-bold">Telefono: </span>
          <span className="font-medium">{quote?.client.phone}</span>
        </h4>

        <h4>
          <span className="font-bold">No: </span>
          <span className="font-medium">{quote?.client.no}</span>
        </h4>

        <h4>
          <span className="font-bold">Solicitado por: </span>
          <span className="font-medium">{quote?.client.requested_by}</span>
        </h4>

        <h4>
          <span className="font-bold">E-Mail: </span>
          <span className="font-medium">{quote?.client.email}</span>
        </h4>

        <h4>
          <span className="font-bold">No. RUC: </span>
          <span className="font-medium">{quote?.client.no_ruc}</span>
        </h4>

        <h4>
          <span className="font-bold">Dirección: </span>
          <span className="font-medium">{quote?.client.address}</span>
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
              <span>Precio unitario (USD)</span>
              <span>Precio total (USD)</span>
            </div>
          </div>
          <div className="table__body">
            {quote?.equipment_quote_request.map(
              (equipment: IEquipmentQuoteRequest, index: any) => (
                <div className="table__body__tr" key={index}>
                  <span>{equipment.type_service}</span>
                  <span>{equipment.name}</span>
                  <span>{equipment.count}</span>
                  <span>{equipment.calibration_method || 'N/A'}</span>
                  <span>{equipment.price}$</span>
                  <span>{equipment.total}$</span>
                </div>
              ),
            )}
          </div>
        </section>

        <div className="section">
          <div className="observation">
            <h4>
              Observaciones: <span>Cotización valida por 15 días</span>
            </h4>
            <ul className="conditions">
              <li>
                Certificados de calibraciån se entregan los dias miércoles o
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
              <span>IVA</span>
              <span>{quote?.tax}%</span>
            </h4>

            <h4>
              <span>Descuento</span>
              <span>{quote?.general_discount}%</span>
            </h4>

            <h4>
              <span>Subtotal</span>
              <span>
                {quote?.equipment_quote_request
                  .map((equipment: IEquipmentQuoteRequest) => equipment.total)
                  .reduce((a, b) => a + b, 0)}
                $
              </span>
            </h4>

            <h4>
              <span>Total</span>
              <span>{quote?.price}$</span>
            </h4>
          </div>
        </div>

        <p className="text-center mt-2 bg-[#166A9B] text-white font-medium p-2 w-full">
          El certiticado de calibración se entrega en 10 (diez) días hábiles
          después de realizada la calibración.
        </p>

        <div className="actions">
          <div>
            <Modal
              nameButton="SOLICITAR MODIFICACIÓN"
              title="Solicitar modificación"
              Component={() => <h1>Editar</h1>}
              buttonStyle={{
                color: '#09f',
                fontWeight: 'bold',
              }}
            />
          </div>
          <div>
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
              nameButton="Guardar como PDF"
              title="Guardar como PDF"
              description="¿Estas seguro de guardar esta cotización como PDF?, se descargara automaticamente"
              onConfirm={handleGeneratePDF}
              buttonStyle={{
                boxShadow: 'none',
                color: '#333',
                backgroundColor: '#fff',
                border: '1px solid #999',
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
          </div>
        </div>
      </section>

      <Footer />

      <Toaster />
    </main>
  )
}

const CommentRejectedQuote = ({ quote }: { quote: IQuote }) => {
  const { values, handleInputChange } = useForm({ comment: '' })
  const [checkeds, setCheckeds] = useState<string[]>([])

  const handleChecked = (e: any) => {
    const value = e.target.value
    if (checkeds.includes(value)) {
      setCheckeds(checkeds.filter((item) => item !== value))
    } else {
      setCheckeds([...checkeds, value])
    }
  }

  const handleRejectQuote = async () => {
    const commentRejected = `${values.comment} - ${checkeds.join(', ')}`

    toast.loading('Rechazando cotización...', {
      description: 'Espere un momento por favor',
    })
    const response = await fetchData({
      url: 'quotes/request/change-status',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: quote?.id,
        status: 'rejected',
      },
    })
    if (response) {
      toast.success('La cotización fue rechazada', {
        description: '😢',
      })
    } else {
      toast.error('Error al rechazar la cotización')
    }
  }

  const OPTION_CHECKED = [
    'Precio muy alto',
    'Presupuesto limitado',
    'Cambios de circunstancia',
    'No se ajusta a sus necesidades',
    'Tiempo de entrega inadecuado',
    'Elementos adicionales no deseados',
    'Otro',
  ]

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
        {OPTION_CHECKED.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="w-4 h-4 "
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={handleChecked}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <textarea
          name="comment"
          id="comment"
          className="w-full h-24 border mt-2 mb-8 border-gray-300 rounded-md resize-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un comentario"
          onChange={(e) => handleInputChange(e.target)}
        >
          {values.comment}
        </textarea>
      </div>

      <div className="flex justify-end gap-2">
        <CButton
          onClick={() => handleRejectQuote()}
          style={{
            backgroundColor: 'tomato',
          }}
        >
          No aprobar
        </CButton>
      </div>
    </div>
  )
}
