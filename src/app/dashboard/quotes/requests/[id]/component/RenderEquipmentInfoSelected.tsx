'use client'
import type { IEquipmentQuoteRequest } from '../page'
import { CInput } from '@/components/CInput'

export const RenderEquipmentInfoSelected = ({
  equipment,
}: {
  equipment?: IEquipmentQuoteRequest
}) => {
  return (
    <div className="equipment-info-selected">
      <div className="equipment-info-selected__header">
        <h4>
          Método de calibración: <span>{equipment?.calibration_method} </span>
        </h4>

        <h4>
          Modelo: <span>{equipment?.model}</span>
        </h4>
      </div>

      <div className="equipment-info-selected__body">
        <div>
          <h4>Puntos de calibración y/un observación adicional: </h4>
          <CInput
            value={equipment?.additional_remarks as string}
            onChange={() => {}}
          />
        </div>
        <div>
          <h4>Rango de medición</h4>
          <CInput value={''} onChange={() => {}} />
        </div>

        <div>
          <h4>Enviar comentario</h4>
          <CInput value={''} onChange={() => {}} />
        </div>
      </div>
    </div>
  )
}
