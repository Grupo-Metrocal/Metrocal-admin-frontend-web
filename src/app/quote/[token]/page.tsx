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

  return (
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
            <AlertDialogModal
              nameButton="No Aprobar"
              title="¿Estas seguro de eliminar esta cotización?"
              onConfirm={() => console.log('confirm')}
              buttonStyle={{
                boxShadow: 'none',
                color: 'tomato',
                backgroundColor: '#fff',
                border: '1px solid #999',
              }}
            />
            <AlertDialogModal
              nameButton="Guardar como PDF"
              title="Guardar como PDF"
              onConfirm={() => console.log('confirm')}
              buttonStyle={{
                boxShadow: 'none',
                color: '#333',
                backgroundColor: '#fff',
                border: '1px solid #999',
              }}
            />
            <AlertDialogModal
              nameButton="Aprobar cotización"
              title="Aprobar"
              onConfirm={() => console.log('confirm')}
              buttonStyle={{
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
