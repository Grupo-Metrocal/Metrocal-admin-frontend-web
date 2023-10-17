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
  setStatus,
} from '@/redux/features/quote/quoteSlice'
import { CInput } from '@/components/CInput'
import { toast } from 'sonner'
import { AlertDialogModal } from '@/components/AlertDialogModal'

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

  const status = useAppSelector((state) => state.quote.status)

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
        dispatch(handleDispatchOnLoad(response))
      } else {
        setError(true)
      }
    }
    getQuoteRequest()
  }, [id, dispatch])

  return (
    <LayoutPage
      title="Cotizaciones / solicitudes"
      rollBack={true}
      Footer={Footer}
      subTitle={
        status && status === 'waiting'
          ? 'En espera de aprobación del cliente'
          : status === 'done'
          ? 'Cotización aprobada'
          : status === 'rejected'
          ? 'Cotización rechazada'
          : ''
      }
    >
      <div className="only-quote">
        <section
          className={`equipment-container ${
            equipment?.length > 3 ? 'with-before' : ''
          }`}
          data-equipment-length={equipment?.length}
          style={{
            height:
              equipment?.length > 3
                ? 3 * 150 + 'px'
                : equipment?.length * 150 + 'px',
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

  const handleApproveQuote = async () => {
    if (!isAllEquipmentReviewed())
      return toast.error('Debe revisar todos los equipos')

    toast.loading('Aprobando cotización', {
      description: 'Espere un momento por favor...',
    })

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

    if (response.status === 200) {
      toast.success('Cotización aprobada')
    } else {
      toast.error('Error al aprobar la cotización')
    }
  }

  const handleRejectQuote = () => {
    toast.loading('Rechazando cotización', {
      description: 'Espere un momento por favor...',
    })

    fetchData({
      url: 'quotes/request/update',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id,
        status: 'rejected',
        price: Number(total),
        tax: Number(IVA),
        general_discount: Number(discount),
      },
    })
      .then((response) => {
        if (response) {
          toast.success('Cotización rechazada')
        } else {
          toast.error('Error al rechazar la cotización')
        }
      })
      .catch((error) => {
        toast.error('Error al rechazar la cotización')
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
          onChange={(e) => {}}
          value={subtotal.toString()}
          label="Subtotal"
          dissabled={true}
          icon={dollarIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => {}}
          value={total.toString()}
          label="Total"
          dissabled={true}
          icon={dollarIcon}
          min={0}
          type="number"
        />
      </div>
      <div className="only-quote__footer__buttons">
        <AlertDialogModal
          nameButton="Rechazar cotización"
          onConfirm={handleRejectQuote}
          title="Rechazar cotización"
          description="Una vez rechazada la cotización no podrá volver a editarla."
          buttonStyle={{
            color: 'tomato',
            background: '#fff',
            boxShadow: 'none',
            border: '1px solid #999',
          }}
        />
        <AlertDialogModal
          nameButton="Aprobar cotización"
          onConfirm={handleApproveQuote}
          title="Aprobar cotización"
          description="Una vez aprobada la cotización se enviará un correo al cliente con la cotización aprobada."
          buttonStyle={{
            boxShadow: 'none',
          }}
        />
      </div>
    </div>
  )
}
