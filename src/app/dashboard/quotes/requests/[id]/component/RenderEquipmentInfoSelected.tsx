'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import type { IEquipmentQuoteRequest } from '../page'
import { CInput } from '@/components/CInput'
import {
  setCalibrationRethod,
  setComment,
  setMeasuringRange,
} from '@/redux/features/quote/quoteSlice'
import { AutocompleteInput } from '@/components/AutocompleteInput'

interface IProps {
  equipment?: IEquipmentQuoteRequest
}

export const RenderEquipmentInfoSelected = ({ equipment }: IProps) => {
  const dispatch = useAppDispatch()

  const selectedEquipment = useAppSelector(
    (state) => state.quote.selectedEquipment,
  )

  const measuringRange = [
    {
      id: 1,
      name: '0 - 100 mm',
    },
    {
      id: 2,
      name: '0 - 150 mm',
    },
    {
      id: 3,
      name: '0 - 200 mm',
    },
  ]

  return (
    <div className="equipment-info-selected">
      <div className="equipment-info-selected__header">
        <div className="">
          <h4>Método de calibración: </h4>
          <div className="table__body__tr__td">
            <select
              name="calibration_method"
              onChange={(e) => {
                dispatch(
                  setCalibrationRethod({
                    id: selectedEquipment?.id,
                    calibration_method: e.target.value,
                  }),
                )
              }}
              value={selectedEquipment?.calibration_method}
              className="p-4 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Seleccione el método
              </option>
              <option value="Comp. Directa Trazable">
                Comp. Directa Trazable
              </option>
              <option value="NI-MCIT-B-01 Acreditado">
                NI-MCIT-B-01 Acreditado
              </option>
              <option value="NI-MCIT-D-01 Acreditado">
                NI-MCIT-D-01 Acreditado
              </option>
              <option value="NI-MCIT-D-02 Acreditado">
                NI-MCIT-D-02 Acreditado
              </option>
              <option value="NI-MCIT-FQ-01 Trazable">
                NI-MCIT-FQ-01 Trazable
              </option>
              <option value="NI-MCIT-M-01 Acreditado">
                NI-MCIT-M-01 Acreditado
              </option>
              <option value="NI-MCIT-P-01 Acreditado">
                NI-MCIT-P-01 Acreditado
              </option>
              <option value="NI-MCIT-P-02 Trazable">
                NI-MCIT-P-02 Trazable
              </option>
              <option value="NI-MCIT-T-01 Acreditado">
                NI-MCIT-T-01 Acreditado
              </option>
              <option value="NI-MCIT-T-02 Trazable">
                NI-MCIT-T-02 Trazable
              </option>
              <option value="NI-MCIT-T-03 Acreditado">
                NI-MCIT-T-03 Acreditado
              </option>
              <option value="NI-MCIT-T-04 Trazable">
                NI-MCIT-T-04 Trazable
              </option>
              <option value="NI-MCIT-T-05 Acreditado">
                NI-MCIT-T-05 Acreditado
              </option>
              <option value="NI-MCIT-V-01 Acreditado">
                NI-MCIT-V-01 Acreditado
              </option>
              <option value="No Aplica (N/A)">No Aplica (N/A)</option>
            </select>
          </div>
        </div>

        <h4>
          Modelo: <span>{selectedEquipment?.model}</span>
        </h4>
      </div>

      <div className="equipment-info-selected__body">
        <div>
          <span className='font-semibold'>Puntos de calibración y/un observación adicional:</span>

          <p className='mt-3'>{selectedEquipment?.additional_remarks as string}</p>

        </div>
        <div>
          <AutocompleteInput
            setItemSelected={(item: any) => {
              const selected = measuringRange.find((e) => e.id === item) || {
                name: '',
              }
              dispatch(
                setMeasuringRange({
                  id: selectedEquipment?.id,
                  measuring_range: selected.name,
                }),
              )
            }}
            onChange={(e) => {
              dispatch(
                setMeasuringRange({
                  id: selectedEquipment?.id,
                  measuring_range: e.value,
                }),
              )
            }}
            list={measuringRange}
            name="measuring_range"
            value={selectedEquipment?.measuring_range}
            placeholder="(0 - 100) mm"
            label="Rango de medición"
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
