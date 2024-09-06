'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import type { IQuote } from '../../requests/[id]/page'
import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { Spinner } from '@/components/Spinner'
import { formatPrice } from '@/utils/formatPrice'
import { CButton } from '@/components/CButton'
import { useRouter } from 'next/navigation'
import { RegisterQuoteItem } from './_components/registerQuoteItem'
import { Button } from '@/components/ui/button'
import { handleGeneratePDFQuote } from '@/utils/downloadPDFQuote'
import { Download } from 'lucide-react'

const getData = async (id: string) => {
  const response = await fetchData({
    url: `quotes/request/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response
}

export interface IRoot {
  params: {
    id: string
  }
}

interface IQuotes extends IQuote {
  approved_by: any
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const [data, setData] = useState<IQuotes | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const getDataQuote = async () => {
      setLoading(true)
      const response = await getData(id)

      if (response.success) {
        const { data } = response
        setData({ ...data, rejected_options: data.rejected_options && data.rejected_options.replace(/[{}"]/g, '') })
      }

      setLoading(false)
    }

    getDataQuote()
  }, [id])

  return (
    <LayoutPage title={`Cotización`} rollBack={true} className="quote-viewer flex flex-col gap-4"
      subTitle={
        data?.status !== 'rejected' && <CButton onClick={() => router.push(`/dashboard/quotes/requests/${id}?increase=true`)}>
          Editar cotización
        </CButton>
      }
    >
      {
        (data?.modifications_list_json && data?.modifications_list_json?.length > 0 && data?.modification_number && data.modification_number > 0) && (
          <Content title='Registro de Modificaciones'>
            <div className='grid gap-2 grid-cols-4'>
              {
                data.modifications_list_json?.map((quote, index) => {
                  return <RegisterQuoteItem key={index} quote={quote} index={index} />
                })
              }
            </div>
          </Content>
        )
      }

      <div className='flex justify-between gap-4'>
        <Content
          title="Detalles de la cotización"
          colorTitle="green"
          className="quote-viewer__main-info"
          titleStyle={{
            fontSize: '1.5em',
          }}
          RightComponent={
            () => <Button variant={"outline"} onClick={async () => {
              return await handleGeneratePDFQuote({
                id: data?.id ? data?.id : 0,
                no: data?.no ? data?.no : '',
                company_name: data?.client?.company_name ? data?.client.company_name : '',
              })
            }}>
              <Download width={17} />
            </Button>


          }
        >

          <div className="quote-viewer__main-info__content">
            {!data ? (
              <Spinner />
            ) : (
              <>
                <TextInfo title="Número de cotización" value={data?.no} />
                <TextInfo title="Precio total" value={formatPrice(data?.price)} />
                <TextInfo title="IVA" value={`${data?.tax} %`} />
                <TextInfo
                  title="Descuento general"
                  value={`${data?.general_discount} %`}
                />
                <TextInfo
                  title="Traslado técnico"
                  value={formatPrice(data?.extras)}
                />
                <TextInfo
                  title="Revisado por"
                  value={data?.approved_by?.username || 'Aun no ha sido aprobada'}
                />

                <TextInfo
                  title="Fecha de creación"
                  value={formatDate(data?.created_at)}
                />
                <TextInfo
                  title="Estado"
                  style={{
                    color:
                      data?.status === 'done'
                        ? '#00b894'
                        : data?.status === 'pending'
                          ? '#d5303e'
                          : data?.status === 'waiting'
                            ? '#ff8000'
                            : 'tomato',
                  }}
                  value={
                    data?.status === 'done'
                      ? 'Aprobado'
                      : data?.status === 'pending'
                        ? 'Pendiente'
                        : data?.status === 'waiting'
                          ? 'En espera'
                          : 'Rechazado'
                  }
                />
              </>
            )}
          </div>

          <div className="quote-viewer__main-info__content-equipment">
            <span
              style={{
                fontSize: '1.5em',
              }}
            >
              Equipos solicitados
            </span>
            <ul className="items">
              {!data ? (
                <Spinner />
              ) : (
                data?.equipment_quote_request.map((equipment, index) => (
                  <li key={index}>
                    <EquipmentInfo
                      key={equipment.id}
                      equipment={equipment.name}
                      price={formatPrice(equipment.price)}
                      discount={`${equipment.discount} %`}
                      status={equipment.status}
                      count={equipment.count}
                      total={formatPrice(equipment.total)}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </Content>

        <div className="aside-info">
          <Content
            title="Información del cliente"
            colorTitle="red"
            className="aside-info__content"
            titleStyle={{
              fontSize: '1.5em',
            }}
          >
            <div className="aside-info__content__info">
              {!data ? (
                <Spinner />
              ) : (
                <>
                  <TextInfo
                    title="Empresa"
                    value={data?.client?.company_name || ''}
                  />
                  <TextInfo
                    title="Dirección"
                    value={data?.client?.address || ''}
                  />

                  <TextInfo
                    title="Teléfono"
                    value={
                      data?.client?.phone
                        .toString()
                        .replace(/(\d{4})(\d{4})/, '$1 $2') || ''
                    }
                  />
                  <TextInfo title="Correo" value={data?.client?.email || ''} />
                  <TextInfo
                    title="Solicitado por"
                    value={data?.client?.requested_by || ''}
                  />
                  <TextInfo
                    title="Fecha de creación"
                    value={formatDate(data?.client?.created_at || '')}
                  />
                  <TextInfo title="No. RUC" value={data?.client?.no_ruc || ''} />
                </>
              )}
            </div>
          </Content>

          {data?.status === 'rejected' && <Content
            title="Motivo de Rechazo"
            colorTitle="yellow"
            className="aside-info__content"
          >
            {
              data?.rejected_by === 'client' ? (<div>
                <div className='flex flex-col gap-2'>
                  <span className='text-gray-500'>Opciones de rechazo seleccionados</span>

                  <ul>
                    {
                      data?.rejected_options !== '' ? data?.rejected_options.split(',').map((item: string, index) => {
                        return <li key={index} className='list-disc ml-4'>{item}</li>
                      })
                        : <span>No se selecciono ninguna opción</span>
                    }
                  </ul>

                  <span className='text-gray-500'>Mensaje enviado:</span>

                  <p>
                    {data?.rejected_comment ? data?.rejected_comment : 'No se envio ningun mensaje'}
                  </p>
                </div>
              </div>) : (<div className='flex flex-col gap-2'>
                <span className='text-gray-400'>Esta cotización fue rechazada por el personal de Metrocal <span className='text-red-400'>*</span></span>

                <span className='text-gray-500'>Mensaje enviado:</span>

                <p>
                  {data?.rejected_comment ? data?.rejected_comment : 'No se envio ningun mensaje'}
                </p>
              </div>)
            }
          </Content>
          }
        </div>
      </div>
    </LayoutPage>
  )
}

type TextInfoProps = {
  title?: string
  value?: string
  style?: React.CSSProperties
}

const TextInfo = ({ title, value, style }: TextInfoProps) => (
  <div className="text-info" style={style}>
    <h3>{title}</h3>
    <p title={value}>{value}</p>
  </div>
)

type EquipmentInfoProps = {
  equipment: string
  price: string
  discount: string
  count: number
  total: string
  status: string
}
const EquipmentInfo = ({
  equipment,
  price,
  discount,
  count,
  total,
  status,
}: EquipmentInfoProps) => (
  <div className="equipment-info">
    <div className="equipment-info__title">
      <h2>{equipment}</h2>
    </div>
    <div className="equipment-info__content">
      <p>
        Precio U: <span>{price}</span>
      </p>
      <p>
        Descuento: <span>{discount}</span>
      </p>
      <p>
        Cantidad: <span>{count}</span>
      </p>
      <p>
        TOTAL: <span>{total}</span>
      </p>
      <p>
        Estado:{' '}
        <span
          style={{
            color:
              status === 'done'
                ? 'green'
                : status === 'pending'
                  ? 'gray'
                  : 'tomato',
          }}
        >
          {status === 'done'
            ? 'Aprobado'
            : status === 'pending'
              ? 'Pendiente'
              : 'Rechazado'}
        </span>
      </p>
    </div>
  </div>
)
