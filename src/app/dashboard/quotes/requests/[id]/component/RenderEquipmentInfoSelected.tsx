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
import { BadgeCheck } from 'lucide-react'

interface IProps {
  equipment?: IEquipmentQuoteRequest
}

const measuringRange = [
  { id: 1, name: '0 - 100 mm' },
  { id: 2, name: '0 - 150 mm' },
  { id: 3, name: '0 - 200 mm' },
]

const methods = [
  { label: 'Comp. Directa Trazable',  value: 'GENERIC_METHOD' },
  { label: 'NI-MCIT-B-01 Acreditado', value: 'NI-MCIT-B-01 Acreditado' },
  { label: 'NI-MCIT-D-01 Acreditado', value: 'NI-MCIT-D-01 Acreditado' },
  { label: 'NI-MCIT-D-02 Acreditado', value: 'NI-MCIT-D-02 Acreditado' },
  { label: 'NI-MCIT-M-01 Acreditado', value: 'NI-MCIT-M-01 Acreditado' },
  { label: 'NI-MCIT-P-01 Acreditado', value: 'NI-MCIT-P-01 Acreditado' },
  { label: 'NI-MCIT-T-01 Acreditado', value: 'NI-MCIT-T-01 Acreditado' },
  { label: 'NI-MCIT-T-03 Acreditado', value: 'NI-MCIT-T-03 Acreditado' },
  { label: 'NI-MCIT-T-05 Acreditado', value: 'NI-MCIT-T-05 Acreditado' },
  { label: 'NI-MCIT-V-01 Acreditado', value: 'NI-MCIT-V-01 Acreditado' },
  { label: '(N/A)',                    value: 'No Aplica (N/A)' },
]

export const RenderEquipmentInfoSelected = ({ equipment }: IProps) => {
  const dispatch = useAppDispatch()
  const selectedEquipment = useAppSelector((state) => state.quote.selectedEquipment)

  return (
    <div className="qreq__equip-form">

      {/* Row 1: Name + Type */}
      <div className="qreq__equip-form-row">
        <div className="qreq__equip-form-field qreq__equip-form-field--grow">
          <CInput
            name="name"
            label="Nombre del equipo"
            onChange={(e) => dispatch(setName({ id: selectedEquipment?.id, name: e.value }))}
            value={selectedEquipment?.name ?? ''}
          />
        </div>
        <div className="qreq__equip-form-field">
          <label className="qreq__select-label">Tipo de servicio</label>
          <select
            className="qreq__select"
            name="service_type"
            onChange={(e) => dispatch(setTypeService({ id: selectedEquipment?.id, type_service: e.target.value }))}
            value={selectedEquipment?.type_service}
          >
            <option value="" disabled>Seleccione</option>
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

      {/* Row 2: Calibration method + Model */}
      <div className="qreq__equip-form-row">
        <div className="qreq__equip-form-field qreq__equip-form-field--grow">
          <label className="qreq__select-label">Método de calibración</label>
          <select
            className="qreq__select"
            name="calibration_method"
            onChange={(e) => dispatch(setCalibrationRethod({ id: selectedEquipment?.id, calibration_method: e.target.value }))}
            value={selectedEquipment?.calibration_method}
          >
            <option value="" disabled>Seleccione el método</option>
            {methods.map((item, i) => (
              <option value={item.value} key={i}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="qreq__equip-form-field">
          <label className="qreq__select-label">Modelo</label>
          <div className="qreq__model-value">{selectedEquipment?.model || '—'}</div>
        </div>
      </div>

      {/* Alt certificate method (conditional) */}
      {selectedEquipment?.calibration_method === 'GENERIC_METHOD' && (
        <div className="qreq__equip-form-alt">
          <label className="qreq__select-label">Usar código de certificado de</label>
          <select
            className="qreq__select"
            name="use_alternative_certificate_method"
            onChange={(e) => dispatch(setAlternativeCertificateMethod({ id: selectedEquipment?.id, use_alternative_certificate_method: e.target.value }))}
            value={selectedEquipment?.use_alternative_certificate_method}
          >
            <option value="" disabled>Seleccione el método</option>
            {methods.map((item, i) => (
              <option value={item.value} key={i}>{item.label}</option>
            ))}
            <option value="NI-MCIT-FQ">Físico Químico</option>
            <option value="NI-MCIT-F">Fuerza</option>
            <option value="NI-MCIT-H">Humedad</option>
            <option value="NI-MCIT-VE">Variables Eléctricas</option>
          </select>
        </div>
      )}

      {/* Row 3: Remarks + Range + Comment */}
      <div className="qreq__equip-form-row">
        <div className="qreq__equip-form-field qreq__equip-form-field--grow">
          <CInput
            name="additional_remarks"
            label="Puntos de calibración y/u observación adicional"
            onChange={(e) => dispatch(setAdditionalRemarks({ id: selectedEquipment?.id, additional_remarks: e.value }))}
            value={selectedEquipment?.additional_remarks}
          />
        </div>
        <div className="qreq__equip-form-field">
          <AutocompleteInput
            setItemSelected={(item: any) => {
              const selected = measuringRange.find((e) => e.id === item) || { name: '' }
              dispatch(setMeasuringRange({ id: selectedEquipment?.id, measuring_range: selected.name }))
            }}
            onChange={(e) => dispatch(setMeasuringRange({ id: selectedEquipment?.id, measuring_range: e.value }))}
            list={measuringRange}
            name="measuring_range"
            value={selectedEquipment?.measuring_range}
            placeholder="(0 - 100) mm"
            label="Rango de medición"
          />
        </div>
        <div className="qreq__equip-form-field">
          <CInput
            label="Comentario"
            value={selectedEquipment?.comment ?? ''}
            name="comment"
            onChange={(e) => dispatch(setComment({ id: selectedEquipment?.id, comment: e.value }))}
          />
        </div>
      </div>

      {/* Creditable checkbox */}
      <div className="qreq__equip-form-check">
        <Checkbox
          className="border-2"
          checked={selectedEquipment?.is_creditable}
          onCheckedChange={(e) => dispatch(setIsCreditable({ id: selectedEquipment?.id, is_creditable: e }))}
          id="is_creditable"
        />
        <label htmlFor="is_creditable" className="qreq__equip-form-check-label">
          <BadgeCheck size={14} />
          Equipo acreditado
        </label>
      </div>
    </div>
  )
}
