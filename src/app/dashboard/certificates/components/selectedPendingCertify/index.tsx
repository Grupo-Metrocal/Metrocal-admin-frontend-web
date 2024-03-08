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

  const handleSelectedService = (service: Equipmentquoterequest) => {
    setSelectedService(service)
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
        <h3>Métodos de calibración</h3>
        <div className="method__content"></div>
      </div>
    </div>
  )
}
