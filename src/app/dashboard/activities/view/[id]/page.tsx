'use client'

/* External libraries */
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { AlertTriangle, MoreHorizontal, Plus, Search } from 'lucide-react'

/* React hooks */
import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

/* Custom hooks */
import { useForm } from '@/hooks/useForm'

/* Utils */
import { fetchData } from '@/utils/fetch'
import { formatPrice } from '@/utils/formatPrice'
import { formatMethodName } from '@/utils/formatMethodName'

/* UI Components */
import { Spinner } from '@/components/Spinner'
import { Modal } from '@/components/Modal'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

/* Local components */
import { AddEquipmentToActivity } from './component/AddEquipmentToQuote'
import { ItemSelectedService } from './component/itemFromSelectedService/item'
import { P_01 } from './component/p_01'
import { T_03 } from './component/t_03'
import { T_01 } from './component/t_01'
import { T_05 } from './component/t_05'
import { D_01 } from './component/d_01'
import { D_02 } from './component/d_02'
import { V_01 } from './component/v_01'
import { M_01 } from './component/m_01'
import { B_01 } from './component/b_01'
import { Generic_method } from './component/generic_method'

const QuoteInformation = dynamic(() => import('./component/sidebars/quoteInformation'))
const ServiceSummnary = dynamic(() => import('./component/sidebars/serviceSummary'))
const TeamMember = dynamic(() => import('./component/sidebars/teamMembers'))
const ProgressActivity = dynamic(() => import('./component/sidebars/progressActivity'))

/* Types */
import type { Data, TeamMember, EquipmentQuoteRequest } from './interface'


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
    if (service.status === 'disabled') {
      return toast('Este servicio está desactivado')
    }

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

  const handleDisableQuoteService = async (quoteId: number, equipmentId: number) => {
    toast.loading('Cambiando estado del servicio')

    const response = await fetchData({
      url: `quotes/disable-quote-service/${quoteId}/${equipmentId}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
      }
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Estado del servicio actualizado')
      setData((prev) => {
        if (prev) {
          return {
            ...prev,
            quote_request: {
              ...prev.quote_request,
              equipment_quote_request: prev.quote_request.equipment_quote_request.map((service) =>
                service.id === equipmentId ? { ...service, status: 'disabled' } : service,
              ),
            },
          }
        }
        return prev
      })
    } else {
      toast.error('Error al cambiar el estado del servicio', {
        description: response.details || response.message,
      })
      return null
    }
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await getData(id)
        if (response.success && response.data) {
          setData(response.data)
          setTeamMember(response.data.team_members || [])
          setResponsable(response.data.responsable || 0)

          const services = response.data.quote_request?.equipment_quote_request || []
          if (services.length > 0) {
            handleSelectedService(services[0])
          }
        } else {
          toast.error('Error al obtener la información')
        }
      } catch (err) {
        toast.error('Ocurrió un error al conectarse al servidor')
      }
    }

    fetchDataAsync()
  }, [id])


  useEffect(() => {
    if (responsable) {
      const user = teamMember.find((user) => user.id === responsable)
      if (user && user.id !== responsable) {
        setResponsable(user.id)
      }
    }
  }, [teamMember, responsable])

  return (
    <div className="flex">
      <aside className='w-[420px] bg-white border-r border-gray-200 h-[calc(100vh-80px)] overflow-y-auto'>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Servicios de Calibración</h2>
            {data?.quote_request && (
              <Modal
                title="Estas agregando un servicio a la cotización"
                description="Por favor recargue la página para poder mostrar los nuevos métodos generados"
                Component={() => (
                  <AddEquipmentToActivity quoteId={data.quote_request.id} />
                )}
              >
                <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
              </Modal>
            )}
          </div>

          <div className="space-y-3">
            {
              data?.quote_request.equipment_quote_request.map((service) => {
                const isSelected = selectedService?.id === service.id

                return (
                  <Card key={service.id}
                    className={`rounded p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    onClick={() => handleSelectedService(service)}
                  >
                    {
                      service.status === 'disabled' ? (
                        <CardContent className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 line-through">{service.name}</h3>
                            <p className="text-sm text-gray-500">{service.type_service}</p>
                          </div>
                          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-500">
                            Desactivado
                          </Badge>
                        </CardContent>
                      ) : (
                        <CardContent>
                          <div className="flex justify-between flex-col gap-3">
                            <div className='flex gap-2 items-center justify-between'>
                              <div className='flex items-center space-x-3'>
                                <div className='flex-1 min-w-0'>
                                  <h3 className='font-semibold text-gray-900'>{service.name}</h3>
                                  <p className='text-sm text-gray-500'>{service.type_service}</p>
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className='border'>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className='bg-white'>
                                  <AlertDialogModal
                                    title='Desactivar Servicio'
                                    description='¿Estás seguro de que deseas desactivar este servicio?, esto no eliminará el servicio, solo lo desactivará para que no se muestre en la lista de servicios activos y no se podra activar nuevamente.'
                                    nameButtonConfirm='Desactivar'
                                    nameButton='Desactivar Servicio'
                                    buttonStyle={{
                                      backgroundColor: 'tomato'
                                    }}
                                    useButton={true}
                                    onConfirm={() => handleDisableQuoteService(data?.quote_request?.id || 0, service.id)}
                                  />
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="flex flex-col gap-4">
                              <div className='flex items-center justify-between'>
                                <span className='text-xs text-gray-500'>
                                  {service.count} • Equipos
                                </span>
                                <Badge variant={'outline'} className={`${service.review_status === "pending" ? "bg-yellow-50 text-yellow-800 border-yellow-900" : "bg-green-50 text-green-800 border-green-500"
                                  }`}>
                                  {
                                    service.review_status === "pending" ? "Sin Revisión" : "Revisado"
                                  }
                                </Badge>
                              </div>
                              <div className='flex items-center justify-between'>
                                <span className="text-xs text-gray-500">
                                  {
                                    formatMethodName({
                                      method: service.calibration_method as any
                                    })
                                  }
                                </span>
                                <span className='text-xs font-medium text-gray-900'>
                                  {`C$ ${formatPrice(service.total)}`}
                                </span>
                              </div>
                            </div>
                          </div >
                        </CardContent >
                      )
                    }
                  </Card >
                )
              })}
          </div >
        </div >
      </aside >

      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-screen-3xl mx-auto px-4 sm:px-4 lg:px-6">
          {/* Service Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {selectedService?.name}
                </h1>
                <p className="font-medium text-gray-600 text-sm sm:text-base">
                  Método: {formatMethodName({ method: selectedService?.calibration_method as any })}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <AlertDialogModal
                  title="Confirmar revisión de servicio"
                  description="Al confirmar la revisión, habilitará la revisión de certificados."
                  nameButton="Confirmar Revisión"
                  onConfirm={() => sendReview(Number(id), selectedService?.id || 0)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6">
            {/* Equipment Section */}
            <div className="2xl:col-span-3 xl:col-span-2">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-lg sm:text-xl">Equipos Asociados</CardTitle>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Código de certificado..."
                        value={search.search}
                        name="search"
                        onChange={(e) => handleInputChange(e.target)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    {!stackServices.length && selectedService?.calibration_method !== "(N/A)" ? (
                      <div className="h-[300px] sm:h-[400px] w-full grid place-items-center text-center">
                        <p className="flex items-center gap-2 flex-col">
                          <span className="font-bold bg-gray-800 rounded-full w-[20px] h-[20px] text-white flex justify-center items-center">!</span>
                          <span>Seleccione un servicio para ver más detalles</span>
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 max-h-[70vh] overflow-auto">
                        {loading ? (
                          <div className="grid place-items-center h-full w-full">
                            <Spinner />
                          </div>
                        ) : selectedService?.calibration_method !== "(N/A)" ? (
                          filteredServices.map((service) => (
                            <Modal
                              key={service.id}
                              title="Detalles del equipo"
                              Component={() => {
                                const selectedMethod = useMemo(
                                  () => selectedService?.calibration_method?.split(" ")[0] ?? "GENERIC_METHOD",
                                  [selectedService]
                                )
                                const Renderer = RENDERER_METHOD[selectedMethod as keyof typeof RENDERER_METHOD] ?? Generic_method
                                return Renderer ? (
                                  <Renderer
                                    {...service}
                                    id={service.id}
                                    method_name={selectedMethod}
                                    report_status={service.report_status}
                                    report_messages={service.report_messages}
                                  />
                                ) : (
                                  <p>No existe un renderizador para este método</p>
                                )
                              }}
                              className="w-full"
                            >
                              <ItemSelectedService
                                key={service?.id}
                                service={service}
                                selectedService={selectedService}
                                activityId={data?.id || 0}
                                handleDeleteEquipment={handleDeleteEquipment}
                              />
                            </Modal>
                          ))
                        ) : (
                          <div className="grid place-items-center h-full w-full">
                            <p className="text-center flex items-center gap-2 justify-center flex-col">
                              <span
                                className={[
                                  "font-bold",
                                  selectedService?.isResolved ? "bg-green-500" : "bg-red-500",
                                  "rounded-full w-[20px] h-[20px] text-white flex justify-center items-center",
                                ].join(" ")}
                              >
                                !
                              </span>
                              <span>
                                {selectedService?.isResolved
                                  ? "Este servicio ya fue completado por el técnico"
                                  : "Este servicio aún no ha sido resuelto"}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {data && selectedService && (
                <>
                  <ServiceSummnary
                    data={data}
                    selectedService={selectedService}
                    stackServices={stackServices}
                  />
                  <TeamMember
                    data={data}
                    responsable={responsable}
                    onChangeResponsable={onChangeResponsable}
                    onDeleteUserFromActivity={onDeleteUserFromActivity}
                  />
                  <QuoteInformation data={data} />
                </>
              )}
            </div>
          </div>
        </div>

      </main >
    </div >
  )
}