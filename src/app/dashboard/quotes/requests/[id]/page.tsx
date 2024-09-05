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
import { Content } from '@/components/Content'
import { AddEquipmentToQuoteButton } from './component/AddEquipmentButton'
import { AddEquipmentToQuote } from './component/AddEquipmentToQuote'

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
}

export interface IRoot {
  params: {
    id: string
  }
}

const getQuote = async (id: string) => {
  const response = await fetchData({
    url: `quotes/request/${id}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
  return response
}

export default function Page({ params }: IRoot) {
  const equipment = useAppSelector((state) => state.quote.equipment)
  const client = useAppSelector((state) => state.quote.client)
  const { loading, toggleLoading } = useLoading()
  const selectedEquipment = useAppSelector(
    (state) => state.quote.selectedEquipment,
  )

  const [quote, setQuote] = useState<IQuote>()
  const [saveQuote, setSaveQuote] = useState<any>()

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
    toggleLoading()
    const getQuoteRequest = async () => {
      const response = await getQuote(id)

      if (response.success) {
        setQuote(response.data as IQuote)
        setSaveQuote(response.data)
        dispatch(handleDispatchOnLoad(response.data as IQuote))
      }
    }
    getQuoteRequest.call(null).finally(() => toggleLoading())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch])

  return (
    <LayoutPage
      title="Cotizaciones / solicitudes"
      rollBack={true}
      Footer={() => <Footer saveQuote={saveQuote} />}
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

      {
        quote?.quote_modification_status === 'pending' && (
          <Content title='Información sobre modificación de cotización'>
            <p>
              {quote?.quote_modification_message}
            </p>
          </Content>
        )
      }

      <div className="only-quote">
        <section>
          <div
            className={`equipment-container ${equipment?.length > 3 ? 'with-before' : ''
              }`}
            data-equipment-length={equipment?.length}
            style={{
              height:
                equipment?.length > 3
                  ? 3 * 150 + 'px'
                  : equipment?.length * 150 + 'px',
            }}
          >
            {loading ? (
              equipment?.map((equipment, index) => (
                <RenderEquipment
                  key={index}
                  equipment={equipment}
                  status={equipment.discount > 0}
                  onClick={() => handleSelectEquipment(equipment.id)}
                  selected={selectedEquipment?.id === equipment.id}
                />
              ))
            ) : (
              <Spinner />
            )}
          </div>

          {
            loading && equipment?.length > 0 && (
              <AddEquipmentToQuoteButton
                Component={() => <AddEquipmentToQuote quoteId={id} />}
              />
            )

          }
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
interface IFooterProps {
  saveQuote: any
}
const Footer = ({ saveQuote }: IFooterProps) => {
  const {
    id,
    total,
    IVA,
    IVAValue,
    discount,
    discountvalue,
    subtotal,
    equipment,
    extras,
  } = useAppSelector((state) => state.quote)

  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const route = useRouter()

  const handleApproveQuote = async () => {
    if (!isAllEquipmentReviewed())
      return toast.error('Debe revisar todos los equipos')
    const increase = searchParams.get('increase') === 'true' ? true : false


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
        extras: Number(extras),
        status: 'waiting',
        authorized_token: getCookie('token'),
        modifiedQuote: saveQuote
      },
      params: {
        increase
      }
    })

    toast.dismiss()
    if (response.status === 200) {
      toast.success('Cotización aprobada')
      route.push('/dashboard/quotes/requests')
    } else {
      toast.error('Error al aprobar la cotización')
    }
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
          label_span={formatPrice(IVAValue)}
          label_span_style={{ color: 'orange' }}
          icon={percentIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => {
            dispatch(handleChangeExtras(e.value))
          }}
          value={extras.toString()}
          label="Traslado técnico"
          icon={dollarIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => dispatch(handleDiscountQuote(e))}
          value={discount?.toString()}
          label="Descuento"
          label_span={formatPrice(discountvalue)}
          label_span_style={{ color: 'orange' }}
          icon={percentIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => { }}
          value={subtotal.toString()}
          label="Subtotal"
          dissabled={true}
          icon={dollarIcon}
          min={0}
          type="number"
        />
        <CInput
          onChange={(e) => { }}
          value={total.toString()}
          label="Total"
          dissabled={true}
          icon={dollarIcon}
          min={0}
          type="number"
        />
      </div>
      <div className="only-quote__footer__buttons">
        <Modal
          nameButton="Rechazar cotización"
          title="Rechazar cotización"
          description="Una vez rechazada la cotización no podrá volver a editarla."
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
            <CommentRejectedQuote
              id={id}
              total={total}
              IVA={IVA}
              discount={discount}
            />
          )}
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

const CommentRejectedQuote = ({
  id,
  total,
  IVA,
  discount,
}: {
  id: number
  total: number
  IVA: number
  discount: number
}) => {
  const { values, handleInputChange } = useForm({ comment: '' })
  const searchParams = useSearchParams()
  const route = useRouter()

  const handleRejectQuote = () => {
    toast.loading('Rechazando cotización', {
      description: 'Espere un momento por favor...',
    })

    const increase = searchParams.get('increase') === 'true' ? true : false


    fetchData({
      url: 'quotes/request/rejected-review',
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
        authorized_token: getCookie('token'),
        rejected_comment: values.comment,
      },
      params: {
        increase
      }
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
      .catch((_) => {
        toast.error('Error al rechazar la cotización')
      })
  }

  return (
    <div>
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
          disabled={values.comment.trim() === ''}
        >
          Rechazar cotización
        </CButton>
      </div>
    </div>
  )
}
