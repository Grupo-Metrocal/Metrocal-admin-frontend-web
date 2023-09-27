'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import checkMarkIcon from '@/assets/icons/checkmark.svg'
import pencilIcon from '@/assets/icons/pencil.svg'
import Image from 'next/image'

export interface IEquipmentQuoteRequest {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: boolean
  calibration_method: string
  additional_remarks: string
  discount: number
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
}

export interface IQuote {
  id: number
  status: string
  general_discount: number
  tax: number
  price: number
  created_at: string
  updated_at: any
  equipment_quote_request: IEquipmentQuoteRequest[]
  client: IClient
}

interface IRoot {
  params: {
    id: string
  }
}

const getQuote = async (id: string) => {
  const response = await fetchData({
    url: `quotes/request/${id}`,
  })
  return response
}

export default function Page({ params }: IRoot) {
  const [quote, setQuote] = useState<IQuote>()
  const [error, setError] = useState<boolean>(false)
  const id = params.id

  useEffect(() => {
    const getQuoteRequest = async () => {
      const response = await getQuote(id)

      if (response) {
        setQuote(response)
      } else {
        setError(true)
      }
    }
    getQuoteRequest()
  }, [id])

  return (
    <LayoutPage title="Cotizaciones / solicitudes" rollBack={true}>
      <div className="only-quote">
        <section className="equipment-container">
          {quote?.equipment_quote_request.map((equipment, index) => (
            <RenderEquipment
              key={index}
              equipment={equipment}
              status={equipment.discount > 0}
            />
          ))}
        </section>
        <section className="only-quote__body">
          <div className="only-quote__body__client">
            <RenderClient client={quote?.client} />
          </div>
          <div className="only-quote__body__info"></div>
        </section>
      </div>
    </LayoutPage>
  )
}

interface IProps {
  equipment: IEquipmentQuoteRequest
  status: boolean
}
const RenderClient = ({ client }: { client?: IClient }) => {
  return (
    <section className="client">
      <div>
        <h5>
          Empresa: <span>{client?.company_name}</span>
        </h5>
        <h5>
          Solicitado por <span>{client?.requested_by}</span>
        </h5>
        <h5>
          Teléfono: <span>{client?.phone}</span>
        </h5>
        <h5>
          Email: <span>{client?.email}</span>
        </h5>
      </div>
      <div>
        <h5>
          No: <span>{client?.no}</span>
        </h5>
        <h5>
          No RUC: <span>{client?.no_ruc}</span>
        </h5>
        <h5>
          Dirección: <span>{client?.address}</span>
        </h5>
      </div>
    </section>
  )
}
const RenderEquipment = ({ equipment, status }: IProps) => {
  return (
    <div className="equipment">
      <div className="status">
        <div className="img">
          <Image src={status ? checkMarkIcon : pencilIcon} alt="status" />
        </div>
        <small>{equipment.count}</small>
      </div>
      <span>{equipment.name}</span>
      <small>{equipment.type_service}</small>
    </div>
  )
}
