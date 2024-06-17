import './index.scss'
import {
  IPendingActivities,
  Equipmentquoterequest,
} from '../../interface/pendingActivities'
import { Spinner } from '@/components/Spinner'
import { momentDate } from '@/utils/moment'
import { formatPrice } from '@/utils/formatPrice'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { IP_01 } from '../../interface/p-01'
import { CarouselItemComp } from '@/components/Carousel/CarouselItem'
import { CarouselComp } from '@/components/Carousel'
import { CButton } from '@/components/CButton'
import metrocalLogo from 'public/metrocal.svg'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Linking } from '@/utils/functions'
import Link from 'next/link'

const getMethods = async (id: number) => {
  return await fetchData({
    url: `methods/get-stack/${id}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

const getCertificate = async ({
  methodType,
  activityID,
  methodID,
}: {
  methodType: string
  activityID: number
  methodID: number
}) => {
  return await fetchData({
    url: `methods/${methodType}/certificates/activity/${activityID}/method/${methodID}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

interface IProps {
  loading: boolean
  selectedActivity: IPendingActivities
  setLoadingCalibration: (loading: boolean) => void
  setCertificate: (certificate: any) => void
  loadingCalibration: boolean
}
export const SelectedPendingCertify = ({
  selectedActivity,
  loading,
  setLoadingCalibration,
  loadingCalibration: loadingCalibration,
  setCertificate,
}: IProps) => {
  const [selectedService, setSelectedService] = useState<Equipmentquoterequest>(
    {} as Equipmentquoterequest,
  )
  const [methodsStackSelected, setMethodsStackSelected] = useState<any>()
  const [loadingMethods, setLoadingMethods] = useState<boolean>(false)

  const [calibrationSelected, setCalibrationSelected] = useState<IP_01>(
    {} as IP_01,
  )

  const handleSelectedService = async (service: Equipmentquoterequest) => {
    setSelectedService(service)

    setLoadingMethods(true)
    const methods = await getMethods(service.method_id)

    setLoadingMethods(false)
    if (methods.success) {
      setMethodsStackSelected({
        methods: methods.data,
        service_id: service.id,
      })
    }
  }

  const handleSelectedCalibration = (calibration: IP_01) => {
    setCalibrationSelected(calibration)
  }

  const handleGenerateCertificate = async () => {
    if (!calibrationSelected.id) {
      toast('Porfavor selecciona un equipo para generar el certificado')
      return
    }

    setLoadingCalibration(true)

    toast.loading('Cargando certificado...', {
      description: 'Esto puede tardar unos segundos',
    })

    const certificate = await getCertificate({
      methodType: selectedService.calibration_method
        .split(' ')[0]
        .toLocaleLowerCase(),
      activityID: selectedActivity.id,
      methodID: calibrationSelected.id,
    })

    toast.dismiss()
    setLoadingCalibration(false)

    if (certificate.success) {
      setCertificate({
        ...certificate.data,
        renderer_method: selectedService.calibration_method.split(' ')[0],
        renderer_method_id: calibrationSelected.id,
      })
      toast.success('Certificado cargado con éxito')
    } else {
      toast.error('Error al cargar el certificado', {
        description: certificate.details,
      })
      setCertificate({})
    }
  }

  const handleGeneratePDFCertificates = async () => {
    toast.loading('Generando certificados...', {
      description: 'Esto puede tardar unos segundos, porfavor espera',
    })

    const resopnse = await fetchData({
      url: `activities/${selectedActivity.id}/certificates/generate-pdf`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    if (resopnse.success) {
      toast.success('Se han generado y enviado los certificados', {
        description:
          'cliente: ' + selectedActivity.quoteRequest.client.company_name,
      })
    } else {
      toast.error('Error al generar los certificados', {
        description: resopnse.details,
      })
    }
  }

  useEffect(() => {
    if (selectedActivity) {
      handleSelectedService(
        selectedActivity.quoteRequest.equipment_quote_request[0],
      )
    }
  }, [selectedActivity])

  return loading ? (
    <div className="pending-certificate__selected flex justify-center ">
      <Spinner />
    </div>
  ) : (
    <div className="pending-certificate__selected">
      <div className="client">
        <div className="flex flex-col items-start justify-between">
          <h2>{selectedActivity?.quoteRequest?.client.company_name}</h2>
          <Link href={`/dashboard/activities/view/${selectedActivity?.id}`} className='text-[#09f]'>
            Modificar actividad
          </Link>
        </div>

        <div className="client__details">
          <span>Finalizado: {momentDate(selectedActivity?.updated_at)}</span>

          <span>
            {selectedActivity?.quoteRequest.equipment_quote_request.reduce(
              (acc, item) => acc + item.count,
              0,
            )}{' '}
            equipos a certificar
          </span>

          <span>
            Precio total: {formatPrice(selectedActivity?.quoteRequest.price)}
          </span>
        </div>
      </div>

      <div className="team_members">
        <h3>Técnicos</h3>
        <div className="team_members__content w-full">
          {selectedActivity?.team_members.length > 0 ? (
            selectedActivity?.team_members.map((member) => (
              <div key={member.id} className="team_members__content__item">
                <Image
                  src={member.imageURL || metrocalLogo}
                  alt={member.username}
                  width={40}
                  height={40}
                />
                <p>{member.username}</p>
              </div>
            ))
          ) : (
            <p className='text-[#999]'>No hay técnicos asignados</p>
          )}
        </div>
      </div>

      <div className="services">
        <h3>Servicios realizados</h3>

        <div className="services__content">
          {selectedActivity?.quoteRequest.equipment_quote_request.map(
            (item) =>
              item.type_service === 'Calibracion' && (
                <div
                  key={item.id}
                  className={`services__content__item ${selectedService.id === item.id
                    ? 'services__content__item-selected'
                    : ''
                    }`}
                  onClick={() => handleSelectedService(item)}
                >
                  <p>{item.name}</p>
                  <span>Método: {item.calibration_method.split(' ')[0]}</span>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="method">
        <div className="flex justify-between align-middle items-center">
          <h3>
            Equipos del servicio calibrados
            <br />
            <small className="text-[#999]">
              Selecciona un equipo para generar los detalles del certificado
            </small>
          </h3>
        </div>
        <div className="method__content">
          {loadingMethods ? (
            <Spinner />
          ) : (
            <CarouselComp>
              {methodsStackSelected?.methods?.map((method: IP_01) => (
                <CarouselItemComp
                  key={method.id}
                  className={`method__content__item ${methodsStackSelected && calibrationSelected.id === method.id
                    ? 'method__content__item-selected'
                    : ''
                    }`}
                  onClick={() => handleSelectedCalibration(method)}
                >
                  <span>
                    <span className="font-bold">Equipo:</span>{' '}
                    <span>{method.equipment_information?.device}</span>
                  </span>
                  <span>
                    <span className="font-bold">No. Serie:</span>{' '}
                    <span>{method.equipment_information?.serial_number}</span>
                  </span>
                  <span>
                    <span className="font-bold">Certificado:</span>{' '}
                    <span>{method.certificate_code || 'Sin certificado'}</span>
                  </span>

                  {method?.review_state && (
                    <span className="text-green-500">
                      <strong>APROBADO ✅</strong>
                    </span>
                  )}
                </CarouselItemComp>
              ))}
            </CarouselComp>
          )}
        </div>

        <div className="mt-8 flex gap-6 items-center">
          <CButton
            onClick={handleGenerateCertificate}
            disabled={loadingCalibration}
          >
            Generar certificado
          </CButton>

          <Link href={`/dashboard/activities/view/update/${calibrationSelected.id}/${selectedService?.calibration_method?.split(' ')[0]}/${selectedActivity?.id}`}
            className='text-[#09f]'>
            Modificar resultados
          </Link>
        </div>
      </div>
    </div>
  )
}
