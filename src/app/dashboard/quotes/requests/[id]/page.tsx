'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { RenderPrices } from './component/RenderPrices'
import { RenderEquipmentInfoSelected } from './component/RenderEquipmentInfoSelected'
import { RenderEquipment } from './component/RenderEquipment'
import { RenderClient } from './component/RenderClient'

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

export interface IRoot {
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
