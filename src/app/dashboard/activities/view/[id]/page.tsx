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
// import { ReviewActivity } from './component/ReviewActivity'
import { T_01 } from './component/t_01'
import { T_05 } from './component/t_05'
import { D_01 } from './component/d_01'
import { V_01 } from './component/v_01'
import { M_01 } from './component/m_01'
import { D_02 } from './component/d_02'
import { B_01 } from './component/b_01'
import { Generic_method } from './component/generic_method'
import { AddEquipmentToActivity } from './component/AddEquipmentToQuote'
import { CButton } from '@/components/CButton'
import { ChangeCertCode } from './component/changeCertCode'

const getData = async (id: string) => {
  const response = await fetchData({
    url: `activities/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  console.log({ response })

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

const sendReview = async (activityID: number, equipmentId: number) => {
  toast.loading('Revisando servicios...')

  const response = await fetchData({
    url: `activities/review-services-activity/${activityID}/${equipmentId}`,
    method: 'POST',
    body: {
      token: getCookie('token'),
    },
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
  })

  toast.dismiss()

  if (response.success) {
    toast.success('Todos los servicios han sido revisandos')
  } else {
    toast.error('Hubo un error durante la revisión')
  }

  return response
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
  'NI-MCIT-M-01': M_01,
  'NI-MCIT-D-01': D_01,
  'NI-MCIT-D-02': D_02,
  'NI-MCIT-B-01': B_01,
  'GENERIC_METHOD': Generic_method,
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
    if (!service.calibration_method) {
      return toast.error('Este servicio no contiene metodos asociados')
    }

    setSelectedService(service)
    setLoading(true)

    if (service.method_id && service.calibration_method !== '(N/A)') {
      await handleLoadMethodsStack(service.method_id)
    } else {
      setStackServices([])
    }

    setLoading(false)
  }

  const handleLoadMethodsStack = async (method_id: number) => {
    const response = await getMethods(method_id)

    if (response.success) {
      setStackServices(response.data)
    } else {
      toast.error('Error al obtener los métodos', {
        description: response.details,
      })
    }
  }

  const handleDeleteEquipment = async (
    methodID: number,
    methodsStackID: number,
  ) => {
    if (!selectedService?.method_id && !data?.id && !methodID) {
      return toast(
        'Se necesita un metodo y una actividad para eliminar el equipo',
      )
    }

    toast.loading('Eliminando equipo')
    const response = await fetchData({
      url: 'methods/remove-method-to-stack',
      method: 'POST',
      body: {
        methodsStackID,
        quoteRequestID: data?.quote_request?.id,
        methodID,
        activityID: id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Equipo eliminado', {
        description: 'El equipo ha sido eliminado de la actividad',
      })

      setStackServices((prev) =>
        prev.filter((service) => service.id !== methodID),
      )
    } else {
      toast.error('Error al eliminar', {
        description: response.details || response.message,
      })
    }
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
    // Footer={() => <ReviewActivity activityID={Number(id)} />}
    >
      <Content
        title="Información principal"
        colorTitle="blue"
        className="activity-viewer__main-info"
        titleStyle={{ fontSize: '1.2em' }}
      >
        <div className="w-full pb-2 flex justify-between items-center">
          <span className="font-medium">
            Seleccione un servicio para mas Información
          </span>
          <Modal
            title="Estas agregando un servicio a la cotización"
            description="Por favor recargue la pagina para poder mostrar los nuevos metodos generados"
            Component={() => <AddEquipmentToActivity quoteId={data?.quote_request.id || 0} />}
          >
            <CButton>
              Agregar Servicio
            </CButton>
          </Modal>
        </div>
        <CarouselComp className="carousel">
          {data?.quote_request.equipment_quote_request.map((equipment) => {
            return (
              <CarouselItemComp
                key={equipment.id}
                className={`carousel-item ${selectedService?.id === equipment.id ? 'selected' : ''
                  }`}
                onClick={() => handleSelectedService(equipment)}
              >
                <div>
                  <strong className="font-bold">{equipment.name}</strong>
                </div>
                <div className="info">
                  <p>Servicio: <span>{
                    equipment.type_service
                  }</span></p>
                  <p className="text-sm">
                    Cantidad: <span>{equipment.count}</span>
                  </p>
                  <p className="text-sm">
                    Metodo:{' '}
                    <span>{
                      equipment.calibration_method.split(' ')[0] === 'GENERIC_METHOD' ? 'Comp. Directa Trazable' : equipment.calibration_method.split(' ')[0]
                    }</span>
                  </p>
                </div>
              </CarouselItemComp>
            )
          })}
        </CarouselComp>

        <div className="activity-viewer__main-info__details">
          <div>
            <div>
              <span className='font-semibold text-[#333] text-lg'>
                Equipos asociados
              </span>
            </div>


          </div>

          <div className="flex items-center gap-2 w-full justify-between my-6">
            <CInput
              placeholder='Codigo de certificado'
              value={search.search}
              name="search"
              // label='Buscar por certificado'
              onChange={handleInputChange}
              type="text"
              input_style={{
                width: '300px',
                backgroundColor: '#f5f5f5',
                fontSize: '1em',
              }}
            />

            <AlertDialogModal
              title='Confirmar revision de servicio'
              description='Al confirmar la revision habilitara la revision de certificados.'
              nameButton='Confirmar Revisión'
              onConfirm={() => sendReview(Number(id), selectedService?.id || 0)}
            />
          </div>
          {!stackServices.length && selectedService?.calibration_method !== '(N/A)' ? (
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
                selectedService?.calibration_method !== '(N/A)' ? filteredServices.map((service) => (
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
                      className={`activity-viewer__main-info__details__selected__item ${selectedService === service.id ? 'selected' : ''
                        }`}
                    >
                      <div className="flex flex-col gap-2">
                        <p>
                          <span>Equipo:</span>{' '}
                          {service.equipment_information?.device ||
                            service.equipment_information?.calibration_object}
                        </p>
                        <p>
                          <span>Codigo:</span>{' '}
                          {service.equipment_information?.code}
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
                          stackId={selectedService?.method_id || 0}
                          onDelete={handleDeleteEquipment}
                          selectedService={selectedService}
                        />
                      </div>{' '}
                    </div>
                  </Modal>
                ))
                  : (
                    <div className="grid place-items-center h-full w-full">
                      <p className="text-center flex items-center gap-2 justify-center flex-col">
                        <span className={`font-bold ${selectedService?.isResolved ? 'bg-green-500' : 'bg-red-500'}
                           rounded-full w-[20px] h-[20px] text-white flex justify-center items-center`}>
                          !
                        </span>
                        <span>
                          {selectedService?.isResolved ? 'Este servicio ya fue completado por el tecnico' : 'Este servicio aun no ha sido resuelto'}
                        </span>
                      </p>
                    </div>
                  )
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
                        className={`${renderer?.status === 'done'
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
  onDelete: (id: number, stackId: number) => void
  stackId: number
  selectedService: EquipmentQuoteRequest | null
}
const ActionsItems = ({
  equipment,
  activityID,
  calibration_method,
  onDelete,
  stackId,
  selectedService
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
            href={`/dashboard/activities/view/update/${equipment.id}/${calibration_method}/${activityID}/${selectedService?.id}?increase=false?`}
          >
            Modificar Resultados
          </Link>
        </DropdownMenuItem>

        <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Modal
            title='Reemplazar código de certificado'
            description='Al utilizar un codigo alternativo de otro metodo, este sera reemplazado'
            nameButton='Reemplazar código de certificado'
            Component={() => <ChangeCertCode calibration_method={calibration_method} current_certficate_code={equipment.certificate_code} equipment_id={equipment.id} />}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()

          }}
        >
          <AlertDialogModal
            nameButton="Eliminar equipo"
            onConfirm={() => onDelete(equipment.id, stackId)}
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
