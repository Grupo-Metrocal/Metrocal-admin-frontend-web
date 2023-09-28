'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { CInput } from '@/components/CInput'
import checkMarkIcon from '@/assets/icons/checkmark.svg'
import pencilIcon from '@/assets/icons/pencil.svg'
import xMarkIcon from '@/assets/icons/xmark.svg'
import Image from 'next/image'
import { RenderPrices } from './component/RenderPrices'

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
  status: string
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
  const [equipmentSelected, setEquipmentSelected] =
    useState<IEquipmentQuoteRequest>()
  const id = params.id

  useEffect(() => {
    const getQuoteRequest = async () => {
      const response = await getQuote(id)

      if (response) {
        setQuote(response)
        setEquipmentSelected(response.equipment_quote_request[0])
      } else {
        setError(true)
      }
    }
    getQuoteRequest()
  }, [id])

  const handleSelectEquipment = (equipment: IEquipmentQuoteRequest) => {
    console.log(equipment)
    setEquipmentSelected(equipment)
  }

  return (
    <LayoutPage title="Cotizaciones / solicitudes" rollBack={true}>
      <div className="only-quote">
        <section
          className="equipment-container"
          data-equipment-length={quote?.equipment_quote_request.length}
          style={{
            height: quote?.equipment_quote_request?.length
              ? quote.equipment_quote_request.length * 150 + 'px'
              : '0',
          }}
        >
          {quote?.equipment_quote_request.map((equipment, index) => (
            <RenderEquipment
              key={index}
              equipment={equipment}
              status={equipment.discount > 0}
              onClick={() => handleSelectEquipment(equipment)}
              selected={equipmentSelected?.id === equipment.id}
            />
          ))}
        </section>
        <section className="only-quote__body">
          <div className="only-quote__body__client">
            <RenderClient client={quote?.client} />
          </div>
          <div className="only-quote__body__info">
            <RenderEquipmentInfoSelected equipment={equipmentSelected} />
          </div>
          <div className="only-quote__body__prices">
            <RenderPrices equipment={equipmentSelected} />
          </div>
        </section>
      </div>
    </LayoutPage>
  )
}

interface IProps {
  equipment: IEquipmentQuoteRequest
  status: boolean
  onClick: () => void
  selected?: boolean
}
const RenderClient = ({ client }: { client?: IClient }) => {
  return (
    <>
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
    </>
  )
}
const RenderEquipment = ({ equipment, onClick, selected }: IProps) => {
  return (
    <div
      className={`equipment 
      ${selected && 'equipment--selected'}
      ${
        equipment.status === 'rejected'
          ? 'equipment--rejected'
          : equipment.status === 'done'
          ? 'equipment--reviewed'
          : ''
      }
      `}
      onClick={onClick}
    >
      <div className="status">
        <div className="img">
          <Image
            src={
              equipment.status === 'done'
                ? checkMarkIcon
                : equipment.status === 'rejected'
                ? xMarkIcon
                : pencilIcon
            }
            alt="status"
          />
        </div>
        <small>{equipment.count}</small>
      </div>
      <span>{equipment.name}</span>
      <small>{equipment.type_service}</small>
    </div>
  )
}

const RenderEquipmentInfoSelected = ({
  equipment,
}: {
  equipment?: IEquipmentQuoteRequest
}) => {
  return (
    <div className="equipment-info-selected">
      <div className="equipment-info-selected__header">
        <h4>
          Método de calibración: <span>{equipment?.calibration_method} </span>
        </h4>

        <h4>
          Modelo: <span>{equipment?.model}</span>
        </h4>
      </div>

      <div className="equipment-info-selected__body">
        <div>
          <h4>Puntos de calibración y/un observación adicional: </h4>
          <CInput
            value={equipment?.additional_remarks as string}
            onChange={() => {}}
          />
        </div>
        <div>
          <h4>Rango de medición</h4>
          <CInput value={''} onChange={() => {}} />
        </div>

        <div>
          <h4>Enviar comentario</h4>
          <CInput value={''} onChange={() => {}} />
        </div>
      </div>
    </div>
  )
}
