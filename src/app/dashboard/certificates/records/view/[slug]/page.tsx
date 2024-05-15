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
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    slug: string
  }
}

export default function Page({ params }: IRoot) {
  const { slug: id } = params
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
      title={`Certificados emitidos`}
      rollBack={true}
      className="certificates-viewer"
    >
      <Content
        title="Información principal"
        colorTitle="blue"
        className="certificates-viewer__main-info"
        titleStyle={{ fontSize: '1.2em' }}
      >
        <span className="font-medium">
          Seleccione el equipo para mostrar los certificados de calibración
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
                <p className="font-bold">{equipment.name}</p>

                <span className="text-sm">Cantidad: {equipment.count}</span>
                <span>
                  Metodo: {equipment.calibration_method.split(' ')[0]}
                </span>
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
            <div className="certificates-viewer__main-info__details__selected">
              {loading ? (
                <div className="grid place-items-center h-full w-full">
                  <Spinner />
                </div>
              ) : (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className={`certificates-viewer__main-info__details__selected__item ${
                      selectedService === service.id ? 'selected' : ''
                    }`}
                    onClick={() =>
                      router.push(
                        `/dashboard/activities/view/update/${service.id}/${
                          selectedService?.calibration_method?.split(' ')[0]
                        }/${data?.id}`,
                      )
                    }
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
                          selectedService?.calibration_method?.split(' ')[0] ||
                          ''
                        }
                        activityID={data?.id || 0}
                      />
                    </div>{' '}
                  </div>
                ))
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
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          Emitir certificado
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          Descargar certificado
        </DropdownMenuItem>

        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
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
