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

const getMethods = async (id: number) => {
  return await fetchData({
    url: `methods/get-stack/${id}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export const SelectedPendingCertify = ({
  selectedActivity,
  loading,
}: {
  selectedActivity: IPendingActivities
  loading: boolean
}) => {
  const [selectedService, setSelectedService] = useState<Equipmentquoterequest>(
    {} as Equipmentquoterequest,
  )
  const [methodsStackSelected, setMethodsStackSelected] = useState<any>()
  const [loadingMethods, setLoadingMethods] = useState<boolean>(false)

  const [calibrationSelected, setCalibrationSelected] = useState<IP_01>(
    {} as IP_01,
  )
  const [loadingCalibration, setLoadingCalibration] = useState<boolean>(false)

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

  const handleSelectedCalibration = async (calibration: IP_01) => {
    setCalibrationSelected(calibration)
  }

  useEffect(() => {}, [selectedActivity])

  return loading ? (
    <div className="pending-certificate__selected flex justify-center ">
      <Spinner />
    </div>
  ) : (
    <div className="pending-certificate__selected">
      <div className="client">
        <h2>{selectedActivity.quoteRequest.client.company_name}</h2>
        <div className="client__details">
          <span>Finalizado: {momentDate(selectedActivity.updated_at)}</span>

          <span>
            {selectedActivity.quoteRequest.equipment_quote_request.reduce(
              (acc, item) => acc + item.count,
              0,
            )}{' '}
            equipos a certificar
          </span>

          <span>
            Precio total: {formatPrice(selectedActivity.quoteRequest.price)}
          </span>
        </div>
      </div>

      <div className="team_members">
        <h3>Equipo de trabajo</h3>
        <div className="team_members__content">
          {selectedActivity.team_members.map((member) => (
            <div key={member.id} className="team_members__content__item">
              <Image
                src={member.imageURL}
                alt={member.username}
                width={40}
                height={40}
              />
              <p>{member.username}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="services">
        <h3>Servicios realizados</h3>

        <div className="services__content">
          {selectedActivity.quoteRequest.equipment_quote_request.map(
            (item) =>
              item.type_service === 'Calibracion' && (
                <div
                  key={item.id}
                  className={`services__content__item ${
                    selectedService.id === item.id
                      ? 'services__content__item-selected'
                      : ''
                  }`}
                  onClick={() => handleSelectedService(item)}
                >
                  <p>{item.name}</p>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="method">
        <h3>Equipos del servicio calibrados</h3>
        <div className="method__content">
          {loadingMethods ? (
            <Spinner />
          ) : (
            <CarouselComp>
              {methodsStackSelected?.methods?.map((method: IP_01) => (
                <CarouselItemComp
                  key={method.id}
                  className={`method__content__item ${
                    methodsStackSelected && calibrationSelected.id === method.id
                      ? 'method__content__item-selected'
                      : ''
                  }`}
                  onClick={() => handleSelectedCalibration(method)}
                >
                  <span>
                    <strong>Equipo:</strong>{' '}
                    <span>{method.equipment_information.device}</span>
                  </span>
                  <span>
                    <strong>No. Serie:</strong>{' '}
                    <span>{method.equipment_information.serial_number}</span>
                  </span>
                  <span>
                    <strong>Modelo:</strong>{' '}
                    <span>{method.equipment_information.model}</span>
                  </span>
                </CarouselItemComp>
              ))}
            </CarouselComp>
          )}
        </div>
      </div>
    </div>
  )
}
