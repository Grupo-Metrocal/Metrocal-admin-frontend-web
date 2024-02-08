'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { formatPrice } from '@/utils/formatPrice'
import { Data } from './interface'
import { useEffect, useState } from 'react'
import DonutChartComp from '@/components/DonutChart'

const getData = async (id: string) => {
  const response = await fetchData({
    url: `activities/${id}`,
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

export default function Page({ params }: IRoot) {
  const { id } = params
  const [data, setData] = useState<Data>()

  useEffect(() => {
    getData(id).then((response) => {
      setData(response.data)
    })
  }, [id])

  return (
    <LayoutPage title={`Actividad`} rollBack={true} className="activity-viewer">
      <Content
        title="Información principal"
        colorTitle="blue"
        className="activity-viewer__main-info"
        titleStyle={{ fontSize: '1.2em' }}
      >
        {id}
      </Content>
      <div className="activity-viewer__services-personal">
        <Content
          title="Servicios asociados"
          colorTitle="yellow"
          className="activity-viewer__services"
          titleStyle={{ fontSize: '1.2em' }}
        >
          <DonutChartComp
            title="Equipos"
            onValueChange={(value) => {
              !value && null

              const renderer =
                data?.quote_request?.equipment_quote_request.find(
                  (equipment) => equipment.id === value?.id,
                )

              return (
                <div className="flex flex-col mt-4 ml-2">
                  <p>
                    <strong>{value?.name}</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 justify-between mt-2">
                    <p className="flex flex-col">
                      <span>Precio U</span>{' '}
                      <span>{formatPrice(value?.value)}</span>
                    </p>
                    <p className="flex flex-col">
                      <span>Cantidad</span> <span>{renderer?.count}</span>
                    </p>
                    <p className="flex flex-col">
                      <span>Estado</span>
                      <span
                        className={`${
                          renderer?.status === 'done'
                            ? 'text-green-500'
                            : renderer?.status === 'rejected'
                            ? 'text-red-500'
                            : 'text-yellow-500'
                        }`}
                      >
                        {
                          {
                            done: 'Aprobado',
                            pending: 'Pendiente',
                            rejected: 'No aprobado',
                          }[renderer?.status || 'pending']
                        }
                      </span>
                    </p>
                  </div>
                </div>
              )
            }}
            data={
              !data
                ? []
                : data?.quote_request?.equipment_quote_request.map(
                    (equipment) => ({
                      name: equipment.name,
                      value: equipment.total,
                      id: equipment.id,
                    }),
                  )
            }
          />
        </Content>
        <Content
          title="Personal de la actividad"
          colorTitle="green"
          className="activity-viewer__personal"
          titleStyle={{ fontSize: '1.2em' }}
        >
          {id}
        </Content>
      </div>
    </LayoutPage>
  )
}
