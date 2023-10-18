'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import type { IEquipmentQuoteRequest } from '../page'
import { CInput } from '@/components/CInput'
import { setComment } from '@/redux/features/quote/quoteSlice'

interface IProps {
  equipment?: IEquipmentQuoteRequest
}

export const RenderEquipmentInfoSelected = ({ equipment }: IProps) => {
  const dispatch = useAppDispatch()

  const selectedEquipment = useAppSelector(
    (state) => state.quote.selectedEquipment,
  )

  return (
    <div className="equipment-info-selected">
      <div className="equipment-info-selected__header">
        <h4>
          Método de calibración:{' '}
          <span>{selectedEquipment?.calibration_method} </span>
        </h4>

        <h4>
          Modelo: <span>{selectedEquipment?.model}</span>
        </h4>
      </div>

      <div className="equipment-info-selected__body">
        <div>
          <CInput
            label="Puntos de calibración y/un observación adicional:"
            value={selectedEquipment?.additional_remarks as string}
            onChange={() => {}}
          />
        </div>
        <div>
          <CInput
            label="Rango de medición"
            value={''}
            onChange={() => {}}
            dissabled={
              selectedEquipment?.measuring_range &&
              selectedEquipment?.measuring_range
            }
          />
        </div>

        <div>
          <CInput
            label="Enviar comentario"
            value={
              selectedEquipment?.comment
                ? selectedEquipment?.comment.toString()
                : ''
            }
            name="comment"
            onChange={(e) => {
              console.log(e.value)
              dispatch(
                setComment({ id: selectedEquipment?.id, comment: e.value }),
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
