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

  useEffect(() => {
    const getDataQuote = async () => {
      setLoading(true)
      const response = await getData(id)

      if (response.success) {
        setData(response.data)
      }

      setLoading(false)
    }

    getDataQuote()
  }, [id])

  return (
    <LayoutPage title={`Cotización`} rollBack={true} className="quote-viewer">
      <Content
        title="Detalles de la cotización"
        colorTitle="green"
        className="quote-viewer__main-info"
        titleStyle={{
          fontSize: '1.5em',
        }}
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
                title="Traslado de equipo"
                value={formatPrice(data?.extras)}
              />
              <TextInfo
                title="Aprobado por"
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
                      ? 'green'
                      : data?.status === 'pending'
                      ? 'gray'
                      : 'tomato',
                }}
                value={
                  data?.status === 'done'
                    ? 'Aprobado'
                    : data?.status === 'pending'
                    ? 'Pendiente'
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

        {/* <Content
          title="Actividad de la cotización"
          colorTitle="yellow"
          className="aside-info__content"
        >
          p
        </Content> */}
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
    <p>{value}</p>
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
