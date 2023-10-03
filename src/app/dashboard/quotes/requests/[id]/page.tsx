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
import Swal from 'sweetalert2'
import dollarIcon from '@/assets/icons/dollar.svg'
import percentIcon from '@/assets/icons/percent.svg'
import {
  setEquipment,
  setClient,
  setSelectedEquipment,
  calculateTotal,
  handleDispatchOnLoad,
  handleIVA,
  setIVA,
  setTotalQuote,
  handleDiscountQuote,
  setID,
  setTotalPrice,
  setDiscount,
} from '@/redux/features/quote/quoteSlice'
import { CButton } from '@/components/CButton'
import { CInput } from '@/components/CInput'
import { toast } from 'sonner'

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
  comment: string
  price: number
  total: number
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
  const [error, setError] = useState<boolean>(false)
  const equipment = useAppSelector((state) => state.quote.equipment)
  const client = useAppSelector((state) => state.quote.client)
  const selectedEquipment = useAppSelector(
    (state) => state.quote.selectedEquipment,
  )

  const dispatch = useAppDispatch()
  useState<IEquipmentQuoteRequest>()

  const id = params.id

  const handleSelectEquipment = (id: number) => {
    const equipmentSelected = equipment.find((item) => item.id === id)
    dispatch(setSelectedEquipment(equipmentSelected))
    dispatch(calculateTotal())
  }

  useEffect(() => {
    const getQuoteRequest = async () => {
      const response: IQuote = await getQuote(id)

      if (response) {
        dispatch(setID(response.id))
        dispatch(setTotalPrice(response.price))
        dispatch(setDiscount(response.general_discount))
        dispatch(setClient(response.client))
        dispatch(setEquipment(response.equipment_quote_request))
        dispatch(setSelectedEquipment(response.equipment_quote_request[0]))
        dispatch(setIVA(response.tax))
        dispatch(setTotalQuote(response.price))
        dispatch(handleDispatchOnLoad())
      } else {
        setError(true)
      }
    }
    getQuoteRequest()
  }, [id])

  return (
    <LayoutPage
      title="Cotizaciones / solicitudes"
      rollBack={true}
      Footer={Footer}
    >
      <div className="only-quote">
        <section
          className="equipment-container"
          data-equipment-length={equipment?.length}
          style={{
            height: equipment?.length ? equipment.length * 150 + 'px' : '0',
          }}
        >
          {equipment?.map((equipment, index) => (
            <RenderEquipment
              key={index}
              equipment={equipment}
              status={equipment.discount > 0}
              onClick={() => handleSelectEquipment(equipment.id)}
              selected={selectedEquipment?.id === equipment.id}
            />
          ))}
        </section>
        <section className="only-quote__body">
          <div className="only-quote__body__client">
            <RenderClient client={client && client} />
          </div>
          <div className="only-quote__body__info">
            <RenderEquipmentInfoSelected equipment={selectedEquipment} />
          </div>
          <div className="only-quote__body__prices">
            <RenderPrices />
          </div>
        </section>
      </div>
    </LayoutPage>
  )
}

const Footer = (): JSX.Element => {
  const id = useAppSelector((state) => state.quote.id)
  const total = useAppSelector((state) => state.quote.total)
  const IVA = useAppSelector((state) => state.quote.IVA)
  const discount = useAppSelector((state) => state.quote.discount)
  const subtotal = useAppSelector((state) => state.quote.subtotal)
  const equipment = useAppSelector((state) => state.quote.equipment)

  const dispatch = useAppDispatch()

  const handleApproveQuote = () => {
    if (!isAllEquipmentReviewed())
      return toast.error('Debe revisar todos los equipos')

    Swal.fire({
      title: '¿Está seguro que desea aprobar la cotización?',
      text: 'Una vez aprobada la cotización no podrá volver a editarla',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, aprobar',
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: 'tomato',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cotización aprobada',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        }).then(async () => {
          const response = await fetchData({
            url: 'quotes/request/update',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              id,
              price: Number(total),
              tax: Number(IVA),
              general_discount: Number(discount),
              status: 'waiting',
            },
          })
        })
      }
    })
  }

  const handleRejectQuote = () => {
    Swal.fire({
      title: '¿Está seguro que desea rechazar la cotización?',
      text: 'Una vez rechazada la cotización no podrá volver a editarla',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, rechazar',
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: 'tomato',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cotización rechazada',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          // dispatch(handleApproveQuote())
        })
      }
    })
  }

  const isAllEquipmentReviewed = () => {
    const reviewed = equipment.filter((item) => item.status === 'pending')
    return reviewed.length === 0
  }

  return (
    <div className="only-quote__footer">
      <div className="only-quote__footer__prices">
        <CInput
          onChange={(e) => dispatch(handleIVA(e))}
          value={IVA.toString()}
          label="IVA"
          icon={percentIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => dispatch(handleDiscountQuote(e))}
          value={discount.toString()}
          label="Descuento"
          icon={percentIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => console.log(e.value)}
          value={subtotal.toString()}
          label="Subtotal"
          dissabled={true}
          icon={dollarIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => console.log(e.value)}
          value={total.toString()}
          label="Total"
          dissabled={true}
          icon={dollarIcon}
          min={0}
          type="number"
        />
      </div>
      <div className="only-quote__footer__buttons">
        <CButton
          style={{
            color: 'tomato',
            background: '#fff',
            boxShadow: 'none',
            border: '1px solid #999',
          }}
          onClick={handleRejectQuote}
        >
          No aprobar
        </CButton>
        <CButton
          style={{
            boxShadow: 'none',
          }}
          onClick={handleApproveQuote}
        >
          Aprobar cotización
        </CButton>
      </div>
    </div>
  )
}
