'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { formatPrice } from '@/utils/formatPrice'
import { Data, TeamMember, EquipmentQuoteRequest } from './interface'
import { useEffect, useState, useMemo } from 'react'
import DonutChartComp from '@/components/DonutChart'
import { ItemUser } from './component/ItemUser'
import { toast } from 'sonner'
import { CarouselComp } from '@/components/Carousel'
import { CarouselItemComp } from '@/components/Carousel/CarouselItem'
import { Spinner } from '@/components/Spinner'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { Modal } from '@/components/Modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { P_01 } from './component/p_01'
import { T_03 } from './component/t_03'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import Link from 'next/link'
import { ReviewActivity } from './component/ReviewActivity'
import { T_01 } from './component/t_01'
import { T_05 } from './component/t_05'
import { V_01 } from './component/v_01'

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

const getMethods = async (id: number) => {
  return await fetchData({
    url: `methods/get-stack/${id}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export interface IRoot {
  params: {
    id: string
  }
}

const RENDERER_METHOD = {
  'NI-MCIT-P-01': P_01,
  'NI-MCIT-T-03': T_03,
  'NI-MCIT-T-01': T_01,
  'NI-MCIT-T-05': T_05,
  'NI-MCIT-V-01': V_01,
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const [data, setData] = useState<Data>()
  const [teamMember, setTeamMember] = useState<TeamMember[]>([])
  const [responsable, setResponsable] = useState<number>(0)
  const [selectedService, setSelectedService] =
    useState<EquipmentQuoteRequest | null>(null)
  const [stackServices, setStackServices] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { values: search, handleInputChange } = useForm({
    search: '',
  })

  const filteredServices = useMemo(() => {
    if (!search.search) {
      return stackServices
    } else {
      return stackServices.filter((service) => {
        if (service && service.certificate_code) {
          return service.certificate_code
            .toLowerCase()
            .includes(search.search.toLowerCase())
        } else {
          return false
        }
      })
    }
  }, [search.search, stackServices])

  const onDeleteUserFromActivity = async (id: number) => {
    if (id === responsable) {
      toast.error('No se puede eliminar al responsable')
    } else {
      toast.loading('Eliminando trabajador')

      const response = await fetchData({
        url: 'activities/remove-member',
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

  const handleSelectedService = async (service: any) => {
    setSelectedService(service)
    setLoading(true)

    const response = await getMethods(service.method_id)

    if (response.success) {
      setStackServices(response.data)
    } else {
      toast.error('Error al obtener los métodos', {
        description: response.details,
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    getData(id).then((response) => {
      if (response.success) {
        setData(response.data)
        setTeamMember(response.data.team_members)
        setResponsable(response.data.responsable)

        const service = response.data.quote_request.equipment_quote_request[0]
        handleSelectedService(service)
      } else {
        toast.error('Error al obtener la información')
      }
    })
  }, [id])

  useEffect(() => {
    if (responsable) {
      const user = teamMember.find((user) => user.id === responsable)
      user && setResponsable(user.id)
    }
  }, [teamMember, responsable])

  return (
    <LayoutPage
      title={`Actividad`}
      rollBack={true}
      className="activity-viewer"
      Footer={() => <ReviewActivity activityID={Number(id)} />}
    >
      <Content
        title="Información principal"
        colorTitle="blue"
        className="activity-viewer__main-info"
        titleStyle={{ fontSize: '1.2em' }}
      >
        <span className="font-medium">
          Seleccione un servicio para mas Información
        </span>
        <CarouselComp className="carousel">
          {data?.quote_request.equipment_quote_request.map((equipment) => {
            return (
              <CarouselItemComp
                key={equipment.id}
                className={`carousel-item ${
                  selectedService?.id === equipment.id ? 'selected' : ''
                }`}
                onClick={() => handleSelectedService(equipment)}
              >
                <div>
                  <strong className="font-bold">{equipment.name}</strong>
                </div>
                <div className="info">
                  <p className="text-sm">
                    Cantidad: <span>{equipment.count}</span>
                  </p>
                  <p className="text-sm">
                    Metodo:{' '}
                    <span>{equipment.calibration_method.split(' ')[0]}</span>
                  </p>
                </div>
              </CarouselItemComp>
            )
          })}
        </CarouselComp>

        <div className="activity-viewer__main-info__details">
          <p className="font-semibold text-[#333] text-lg mt-4 mb-2 border-b-2 border-[#999] w-full pb-2">
            Equipos asociados
          </p>

          <div className="flex items-center gap-2 w-full justify-end my-6">
            <span>Filtrar equipo</span>
            <CInput
              placeholder="escribe el certificado del equipo"
              value={search.search}
              name="search"
              onChange={handleInputChange}
              type="text"
              input_style={{
                width: '300px',
                backgroundColor: '#f5f5f5',
                fontSize: '1em',
              }}
            />
          </div>
          {!stackServices.length ? (
            <div className="h-[400px] w-full grid place-items-center">
              <p className="text-center flex items-center gap-2 justify-center flex-col">
                <span className=" font-bold bg-[#333] rounded-full w-[20px] h-[20px] text-white flex justify-center items-center">
                  !
                </span>
                <span>Seleccione un servicio para ver más detalles</span>
              </p>
            </div>
          ) : (
            <div className="activity-viewer__main-info__details__selected">
              {loading ? (
                <div className="grid place-items-center h-full w-full">
                  <Spinner />
                </div>
              ) : (
                filteredServices.map((service) => (
                  <Modal
                    key={service.id}
                    title="Detalles del equipo"
                    Component={() => {
                      const selectedMethod =
                        selectedService?.calibration_method?.split(' ')[0] || ''

                      const Renderer =
                        RENDERER_METHOD[
                          selectedMethod as keyof typeof RENDERER_METHOD
                        ]

                      return Renderer ? (
                        <Renderer
                          {...service}
                          id={service.id}
                          method_name={selectedMethod}
                          report_status={service.report_status}
                          report_messages={service.report_messages}
                        />
                      ) : (
                        <p>No hay un renderer para este método</p>
                      )
                    }}
                    className="w-[48%] text-start "
                    style={{ minWidth: '80vw' }}
                  >
                    <div
                      key={service.id}
                      className={`activity-viewer__main-info__details__selected__item ${
                        selectedService === service.id ? 'selected' : ''
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <p>
                          <span>Equipo:</span>{' '}
                          {service.equipment_information?.device}
                        </p>
                        <p>
                          <span>Fabricante:</span>{' '}
                          {service.equipment_information?.maker}
                        </p>
                        <p>
                          <span>Numero de serie:</span>{' '}
                          {service.equipment_information?.serial_number}
                        </p>
                        <p>
                          <span>Certificado:</span> {service?.certificate_code}
                        </p>
                      </div>
                      <div>
                        <ActionsItems
                          equipment={service}
                          key={service.id}
                          calibration_method={
                            selectedService?.calibration_method?.split(
                              ' ',
                            )[0] || ''
                          }
                          activityID={data?.id || 0}
                        />
                      </div>{' '}
                    </div>
                  </Modal>
                ))
              )}
            </div>
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

interface IPropsActions {
  equipment: any
  calibration_method: string
  activityID: number
}
const ActionsItems = ({
  equipment,
  activityID,
  calibration_method,
}: IPropsActions) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{
          backgroundColor: 'white',
        }}
      >
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/dashboard/activities/view/update/${equipment.id}/${calibration_method}/${activityID}`}
          >
            Modificar Resultados
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <AlertDialogModal
            nameButton="Eliminar equipo"
            onConfirm={() => {}}
            title="¿Estas seguro de querer eliminar este equipo?"
            description="Al eliminar este equipo no podras recuperar la información"
            buttonStyle={{
              color: 'tomato',
              fontWeight: 'bold',
            }}
            useButton={false}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
