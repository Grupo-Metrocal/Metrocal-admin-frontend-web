'use client'
import './index.scss'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { useEffect, useState, useMemo } from 'react'
import {
  Data,
  TeamMember,
  EquipmentQuoteRequest,
} from '@/app/dashboard/activities/view/[id]/interface'
import { toast } from 'sonner'
import { CarouselComp } from '@/components/Carousel'
import { CarouselItemComp } from '@/components/Carousel/CarouselItem'
import { Spinner } from '@/components/Spinner'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
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
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useRouter } from 'next/navigation'
import { IClient } from '@/app/contactInformation'
import { handleGeneratePDFCertificate } from '@/utils/downloadPDFCertificate'

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

export const emmitCertificate = async (method_name: string, activity_id: number, method_id: number) => {

  const url = `methods/${method_name.toLowerCase()}/generate-certificate/send/pdf/${activity_id}/${method_id}`

  return await fetchData({
    url,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    }
  })
}

export interface IRoot {
  params: {
    slug: string
  }
}

export default function Page({ params }: IRoot) {
  const { slug: id } = params
  const [data, setData] = useState<Data>()
  const [client, setClient] = useState<IClient>({} as IClient)
  const [selectedService, setSelectedService] =
    useState<EquipmentQuoteRequest | null>(null)
  const [stackServices, setStackServices] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { values: search, handleInputChange } = useForm({
    search: '',
  })

  const router = useRouter()

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

  const handleSelectedService = async (service: any) => {
    if (!service.calibration_method) {
      return toast.error('Este servicio no contiene metodos asociados')
    }

    setSelectedService(service)
    setLoading(true)


    if (service.method_id && service.calibration_method !== '(N/A)') {
      const response = await getMethods(service.method_id)

      if (response.success) {
        setStackServices(response.data)
      } else {
        toast.error('Error al obtener los métodos', {
          description: response.details,
        })
      }
    } else {
      setStackServices([])
    }

    setLoading(false)
  }

  const handleEmmitCertificate = async (method_name: string, activity_id: number, method_id: number) => {
    toast.loading('Preparando certificado...', {
      description: 'Esto puede tardar unos segundos, por favor espere'
    })
    setLoading(true)

    emmitCertificate(method_name, activity_id, method_id).then((response) => {

      if (response.success) {
        toast.success('Certificado emitido correctamente')
      } else {
        toast.error('Error al emitir el certificado')
      }
    })
      .catch((error) => {
        toast.error('Error al emitir el certificado')
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss()
      })
  }

  useEffect(() => {
    getData(id).then((response) => {
      if (response.success) {
        setData(response.data)
        setClient(response.data.quote_request.client)

        const service = response.data.quote_request.equipment_quote_request[0]
        handleSelectedService(service)
      } else {
        toast.error('Error al obtener la información')
      }
    })
  }, [id])

  return (
    <LayoutPage
      title={`Certificados emitidos`}
      rollBack={true}
      className="certificates-viewer"
    >
      <Content title="Informacion del cliente">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-bold text-[#828282]">Cliente:</span>{' '}
              {client?.company_name}
            </p>
            <p>
              <span className="font-bold text-[#828282]">Dirección:</span>{' '}
              {client?.address}
            </p>
            <p>
              <span className="font-bold text-[#828282]">RUC:</span>{' '}
              {client?.no_ruc}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-bold text-[#828282]">Solicitante:</span>{' '}
              {client?.requested_by}
            </p>
            <p>
              <span className="font-bold text-[#828282]">Telefono:</span>{' '}
              {client?.phone}
            </p>
            <p>
              <span className="font-bold text-[#828282]">Correo:</span>{' '}
              {client?.email}
            </p>
          </div>
        </div>
      </Content>
      <Content
        title="Información principal"
        colorTitle="green"
        className="certificates-viewer__main-info"
        titleStyle={{ fontSize: '1.2em' }}
      >
        <span className="font-medium text-[#999]">
          Seleccione el equipo para mostrar los certificados de calibración
        </span>
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

        <div className="certificates-viewer__main-info__details">
          <p className="font-semibold text-[#333] text-ms mt-4 mb-2 border-b-2 border-[#f4f4f4] w-full pb-2">
            Certificados de calibración
          </p>

          <div className="flex items-center gap-2 w-full my-6">
            <span>Filtrar certificado</span>
            <CInput
              placeholder="NI-MC-X-XXXX-XXXX"
              value={search.search}
              name="search"
              onChange={handleInputChange}
              type="text"
              input_style={{
                width: '350px',
                backgroundColor: '#f5f5f5',
                fontSize: '1em',
              }}
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
            <div className="certificates-viewer__main-info__details__selected">
              {loading ? (
                <div className="grid place-items-center h-full w-full">
                  <Spinner />
                </div>
              ) : (
                selectedService?.calibration_method !== '(N/A)' ?
                  filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className={`certificates-viewer__main-info__details__selected__item ${selectedService === service.id ? 'selected' : ''
                        }`}
                      onClick={() =>
                        router.push(
                          `/dashboard/activities/view/update/${service.id}/${selectedService?.calibration_method?.split(' ')[0]
                          }/${data?.id}?increase=true`,
                        )
                      }
                    >
                      <div className="flex flex-col gap-2">
                        <p>
                          <span>Equipo:</span>{' '}
                          {service.equipment_information?.device || service.equipment_information?.calibration_object}
                        </p>
                        <p>
                          <span>Codigo:</span>{' '}
                          {service.equipment_information?.code}
                        </p>
                        <p>
                          <span>Numero de serie:</span>{' '}
                          {service.equipment_information?.serial_number || 'N/A'}
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
                            selectedService?.calibration_method?.split(' ')[0] ||
                            ''
                          }
                          activityID={data?.id || 0}
                          handleEmmitCertificate={handleEmmitCertificate}
                        />
                      </div>{' '}
                    </div>
                  ))
                  :
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
              )}
            </div>
          )}
        </div>
      </Content>
    </LayoutPage>
  )
}

interface IPropsActions {
  equipment: any
  calibration_method: string
  activityID: number
  handleEmmitCertificate: (method_name: string, activity_id: number, method_id: number) => void
}
const ActionsItems = ({
  equipment,
  activityID,
  calibration_method,
  handleEmmitCertificate,
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
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <AlertDialogModal
            onConfirm={() => handleEmmitCertificate(calibration_method, activityID, equipment.id)}
            nameButton='Emitir certificado'
            useButton={false}
            title='¿Estas seguro de querer emitir este certificado?'
            description='Al emitir este certificado el cliente recibira un correo con el certificado adjunto con las modificaciones realizadas'
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <AlertDialogModal
            nameButton='Descargar certificado'
            title='Descargar certificado'
            description="La descarga del PDF se iniciará automáticamente."
            onConfirm={() => handleGeneratePDFCertificate({
              method_name: calibration_method.replaceAll('-', '_'),
              method_id: equipment.id,
              activity_id: activityID,
              no: equipment.certificate_code
            })}
            useButton={false}
          />
        </DropdownMenuItem>

        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <AlertDialogModal
            nameButton="Eliminar equipo"
            onConfirm={() => { }}
            title="¿Estas seguro de querer eliminar este equipo?"
            description="Al eliminar este equipo no podras recuperar la información"
            buttonStyle={{
              color: 'tomato',
              fontWeight: 'bold',
            }}
            useButton={false}
          />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
