import { CInput } from "@/components/CInput";
import { Pattern } from "../_hooks/usePattern";
import { useForm } from "@/hooks/useForm";
import { CButton } from "@/components/CButton";

interface IProps {
  createPattern: (newPattern: Omit<Pattern, 'id'>) => void
  calibration_method: string
}

export const CreatePattern = ({ createPattern, calibration_method }: IProps) => {
  const { values, handleInputChange } = useForm({
    equipment: '',
    traceability: '',
    method: calibration_method,
    code: '',
    next_calibration: '',
    brand: '',
    certificate: 'N/A',
    pattern_range: 'N/A',
    status: true
  })

  return (
    <div>
      <CInput
        label="Nombre de equipo"
        value={values.equipment}
        name="equipment"
        onChange={handleInputChange}
        required
      />

      <CInput
        label="Código"
        value={values.code}
        name="code"
        onChange={handleInputChange}
        required
      />

      <CInput
        label="Trazabilidad"
        value={values.traceability}
        name="traceability"
        onChange={handleInputChange}
        placeholder="SCM Metrología y Laboratorios SCM-00056900"
        required
      />

      <CInput
        label="Siguiente calibración"
        value={values.next_calibration}
        name="next_calibration"
        onChange={handleInputChange}
        placeholder="2026-05-05"
        required
      />

      <CInput
        label="Marca"
        value={values.brand}
        name="brand"
        onChange={handleInputChange}
        required
      />

      <div className="mt-10 w-full flex justify-center">
        <CButton onClick={() => createPattern(values)}>
          Crear patron
        </CButton>
      </div>
    </div>
  )
}