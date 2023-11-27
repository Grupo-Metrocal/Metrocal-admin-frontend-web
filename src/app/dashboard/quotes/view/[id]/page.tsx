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
        title="Información principal"
        colorTitle="green"
        className="quote-viewer__main-info"
      >
        <div className="quote-viewer__main-info__content">
          {!data ? (
            <Spinner />
          ) : (
            <>
              <TextInfo title="Número de cotización" value={data?.no} />
              <TextInfo title="Precio total" value={`${data?.price} $`} />
              <TextInfo
                title="Descuento total"
                value={`${data?.general_discount} %`}
              />
              <TextInfo
                title="Aprobado por"
                value={data?.approved_by?.username || 'Aun no ha sido aprobada'}
              />
            </>
          )}
        </div>

        <div className="quote-viewer__main-info__content-equipment">
          <span>Equipos solicitados</span>
          <div className="items">
            {!data ? (
              <Spinner />
            ) : (
              data?.equipment_quote_request.map((equipment) => (
                <TextInfo
                  key={equipment.id}
                  title={equipment.name}
                  value={`Cantidad: ${equipment.count}`}
                />
              ))
            )}
          </div>
        </div>
      </Content>

      <div className="aside-info">
        <Content
          title="Cliente"
          colorTitle="blue"
          className="aside-info__content "
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
                <TextInfo title="Teléfono" value={data?.client?.phone || ''} />
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
}

const TextInfo = ({ title, value }: TextInfoProps) => (
  <div className="text-info">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
)
