'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { formatPrice } from '@/utils/formatPrice'
import { Data, TeamMember } from './interface'
import { useEffect, useState } from 'react'
import DonutChartComp from '@/components/DonutChart'
import { ItemUser } from './component/ItemUser'
import { toast } from 'sonner'
import { CarouselComp } from '@/components/Carousel'
import { CarouselItemComp } from '@/components/Carousel/CarouselItem'

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
  const [teamMember, setTeamMember] = useState<TeamMember[]>([])
  const [responsable, setResponsable] = useState<number>(0)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [stackServices, setStackServices] = useState<any[]>([])

  const onDeleteUserFromActivity = async (id: number) => {
    if (id === responsable) {
      toast.error('No se puede eliminar al responsable')
    } else {
      toast.loading('Eliminando trabajador')

      const response = await fetchData({
        url: 'activities/remove-member',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: {
          activityId: data?.id || 0,
          memberId: id,
        },
      })

      toast.dismiss()

      if (response.success) {
        toast('Trabajador eliminado', {
          description: 'El trabajador ha sido eliminado de la actividad',
        })

        setTeamMember((prev) => prev.filter((user) => user.id !== id))
      } else {
        toast.error('Error al eliminar', {
          description: response.details,
        })
      }
    }
  }

  const onChangeResponsable = async (id: number) => {
    toast.loading('Cambiando responsable')

    const response = await fetchData({
      url: 'activities/assign-responsable',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: {
        activityId: data?.id || 0,
        memberId: id,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Responsable cambiado', {
        description: 'Has asignado un nuevo responsable a la actividad',
      })
      setResponsable(id)
    } else {
      toast.error('Error al cambiar responsable', {
        description: response.details || response.message,
      })
    }
  }

  useEffect(() => {
    getData(id).then((response) => {
      setData(response.data)
      setTeamMember(response.data.team_members)
      setResponsable(response.data.responsable)
    })
  }, [id])

  useEffect(() => {
    if (responsable) {
      const user = teamMember.find((user) => user.id === responsable)
      user && setResponsable(user.id)
    }
  }, [teamMember, responsable])

  return (
    <LayoutPage title={`Actividad`} rollBack={true} className="activity-viewer">
      <Content
        title="Información principal"
        colorTitle="blue"
        className="activity-viewer__main-info"
        titleStyle={{ fontSize: '1.2em' }}
      >
        <span className="font-medium">
          Seleccione un servicio para mas Información
        </span>
        <CarouselComp className="mt-4">
          {data?.quote_request.equipment_quote_request.map((equipment) => {
            return (
              <CarouselItemComp
                key={equipment.id}
                className={`carousel-item ${
                  selectedService === equipment.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedService(equipment.id)}
              >
                <p className="font-bold">{equipment.name}</p>
                <p className="text-sm">Cantidad: {equipment.count}</p>
              </CarouselItemComp>
            )
          })}
        </CarouselComp>

        <div className="activity-viewer__main-info__details">
          {!stackServices.length ? (
            // center the text
            <div className="h-[400px] w-full grid place-items-center">
              <p className="text-center flex items-center gap-2 justify-center flex-col">
                <span className=" font-bold bg-[#333] rounded-full w-[20px] h-[20px] text-white flex justify-center items-center">
                  !
                </span>
                <span>Seleccione un servicio para ver más detalles</span>
              </p>
            </div>
          ) : (
            <div className="activity-viewer__main-info__details__selected"></div>
          )}
        </div>
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
          {teamMember.map((user) => {
            return (
              <ItemUser
                user={user}
                key={user.id}
                activityID={data?.id || 0}
                responsable={responsable}
                onDeleteUserFromActivity={onDeleteUserFromActivity}
                onChangeResponsable={onChangeResponsable}
              />
            )
          })}
        </Content>
      </div>
    </LayoutPage>
  )
}
