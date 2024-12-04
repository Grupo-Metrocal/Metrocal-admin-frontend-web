'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import type { IEquipmentQuoteRequest } from '../page'
import { CInput } from '@/components/CInput'
import {
  setAdditionalRemarks,
  setAlternativeCertificateMethod,
  setCalibrationRethod,
  setComment,
  setIsCreditable,
  setMeasuringRange,
  setName,
  setTypeService,
} from '@/redux/features/quote/quoteSlice'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import { Checkbox } from '@/components/ui/checkbox'

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

  const methods = [
    { label: 'Comp. Directa Trazable', value: 'GENERIC_METHOD' },
    { label: 'NI-MCIT-B-01 Acreditado', value: 'NI-MCIT-B-01 Acreditado' },
    { label: 'NI-MCIT-D-01 Acreditado', value: 'NI-MCIT-D-01 Acreditado' },
    { label: 'NI-MCIT-D-02 Acreditado', value: 'NI-MCIT-D-02 Acreditado' },
    { label: 'NI-MCIT-M-01 Acreditado', value: 'NI-MCIT-M-01 Acreditado' },
    { label: 'NI-MCIT-P-01 Acreditado', value: 'NI-MCIT-P-01 Acreditado' },
    { label: 'NI-MCIT-T-01 Acreditado', value: 'NI-MCIT-T-01 Acreditado' },
    { label: 'NI-MCIT-T-03 Acreditado', value: 'NI-MCIT-T-03 Acreditado' },
    { label: 'NI-MCIT-T-05 Acreditado', value: 'NI-MCIT-T-05 Acreditado' },
    { label: 'NI-MCIT-V-01 Acreditado', value: 'NI-MCIT-V-01 Acreditado' },
    { label: '(N/A)', value: 'No Aplica (N/A)' }
  ]

  return (
    <div className="equipment-info-selected">
      <CInput
        name='name'
        label='Nombre del equipo'
        onChange={(e) => {
          dispatch(setName({ id: selectedEquipment?.id, name: e.value }))
        }}
        value={selectedEquipment?.name
          ? selectedEquipment?.name.toString()
          : ''}

      />
      <div className='flex items-center gap-4'>
        <h4>Tipo de servicio</h4>

        <div className="table__body__tr__td">
          <select
            name="service_type"
            onChange={(e) => {
              dispatch(
                setTypeService({
                  id: selectedEquipment?.id,
                  type_service: e.target.value,
                }),
              )
            }}
            value={selectedEquipment?.type_service}
            className="p-4 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Seleccione
            </option>
            <option value="Caracterización">Caracterización</option>
            <option value="Calificación">Calificación</option>
            <option value="Diagnóstico">Diagnóstico</option>
            <option value="Calibracion">Calibración</option>
            <option value="Informe Técnico">Informe Técnico</option>
            <option value="Mant. Preventivo">Mant. Preventivo</option>
            <option value="Mant. Correctivo">Mant. Correctivo</option>
            <option value="Proyecto">Proyecto</option>
            <option value="Suministro">Suministro</option>
            <option value="Verificación de Cal">Verificación de Cal</option>
            <option value="Otros">Otros</option>
            <option value="No Aplica (N/A)">No Aplica (N/A)</option>
          </select>
        </div>
      </div>

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
              defaultValue={selectedEquipment?.calibration_method}
            >
              <option value="" disabled>
                Seleccione el método
              </option>

              {
                methods.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))
              }
            </select>
          </div>
        </div>

        <h4>
          Modelo: <span>{selectedEquipment?.model}</span>
        </h4>
      </div>

      {
        selectedEquipment?.calibration_method === 'GENERIC_METHOD' && (
          <div className="flex items-center gap-4 bg-gray-100 p-2 rounded">
            <h4>Usar codigo de certificado de: </h4>
            <div className="table__body__tr__td">
              <select
                name="use_alternative_certificate_method"
                onChange={(e) => {
                  dispatch(
                    setAlternativeCertificateMethod({
                      id: selectedEquipment?.id,
                      use_alternative_certificate_method: e.target.value,
                    }),
                  )
                }}
                value={selectedEquipment?.use_alternative_certificate_method}
                className="p-4 rounded-md border border-gray-300"
                defaultValue={selectedEquipment?.use_alternative_certificate_method}
              >
                <option value="" disabled>
                  Seleccione el método
                </option>

                {
                  methods.map((item, index) => (
                    <option value={item.value} key={index}>{item.label}</option>
                  ))
                }
              </select>
            </div>
          </div>
        )
      }


      <div className="equipment-info-selected__body">
        <div>
          <CInput
            name='additional_remarks'
            label='Puntos de calibración y/u observación adicional:'
            onChange={(e) => { dispatch(setAdditionalRemarks({ id: selectedEquipment?.id, additional_remarks: e.value })) }}
            value={selectedEquipment?.additional_remarks}
          />

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

        <div className='flex flex-row gap-4 items-center'>

          <Checkbox className='border-2' checked={selectedEquipment?.is_creditable}
            onCheckedChange={
              (e) => { dispatch(setIsCreditable({ id: selectedEquipment?.id, is_creditable: e })) }
            }
            id='is_creditable'
          />

          <label htmlFor="is_creditable" className='font-semibold'>Equipo acreditado?</label>

        </div>
      </div>
    </div>
  )
}
