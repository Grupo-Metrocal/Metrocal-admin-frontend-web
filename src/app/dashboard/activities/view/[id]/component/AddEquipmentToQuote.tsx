
import { CButton } from "@/components/CButton"
import { CInput } from "@/components/CInput"
import { useForm } from "@/hooks/useForm"
import { setNewEquipment } from "@/redux/features/quote/quoteSlice"
import { useAppDispatch } from "@/redux/hook"
import { fetchData } from "@/utils/fetch"
import { toast } from "sonner"
import { getCookie } from "cookies-next"

export const AddEquipmentToActivity = ({ quoteId }: { quoteId: number }) => {
  const dispatch = useAppDispatch()

  const { values, handleInputChange, handleSelectChange } = useForm({
    type_service: '',
    name: '',
    count: 0,
    model: '',
    measuring_range: '',
    additional_remarks: '',
    calibration_method: '',
    status: 'pending',
    comment: '',
    price: 0,
    total: 0,
    discount: 0,
  })

  const handleSubmit = async () => {
    if (!handleValidation()) {
      return toast.error('Todos los campos son requeridos')
    }
    toast.loading('Creando servicio...', {
      description: 'Espere un momento por favor'
    })

    const response = await fetchData({
      url: `quotes/create-service/generate-methods/${quoteId}`,
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      }
    })

    toast.dismiss()

    if (response.status === 200) {
      toast.success('Se ha agregado un nuevo servicio')
      dispatch(setNewEquipment(
        {
          id: response.data.id,
          ...values
        }
      ))

    } else {
      toast.error('Ha ocurrido un error')
    }

  }

  const handleValidation = () => {
    return values.type_service !== '' &&
      values.name !== '' &&
      values.count !== 0 &&
      values.measuring_range !== ''

  }
  return (
    <div className="overflow-y-auto">
      <div className="w-full flex flex-col gap-4">
        <label htmlFor="type_service"
          className="text-sm font-semibold"
        >
          Tipo de servicio
        </label>
        <select
          name="type_service"
          onChange={handleSelectChange}
          value={values.type_service}
          className="p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled>
            Seleccione
          </option>
          <option value="Calibracion">Calibración</option>
          <option value="Caracterización">Caracterización</option>
          <option value="Calificación">Calificación</option>
          <option value="Diagnóstico">Diagnóstico</option>
          <option value="Informe Técnico">Informe Técnico</option>
          <option value="Mant. Preventivo">Mant. Preventivo</option>
          <option value="Mant. Correctivo">Mant. Correctivo</option>
          <option value="Proyecto">Proyecto</option>
          <option value="Suministro">Suministro</option>
          <option value="Verificación de Cal">Verificación de Cal</option>
          <option value="Otros">Otros</option>
          <option value="(N/A)">No Aplica (N/A)</option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="calibration_method"
          className="text-sm font-semibold"
        >
          Metodo de calibración
        </label>
        <select
          name="calibration_method"
          onChange={handleSelectChange}
          value={values.calibration_method}
          className="p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled>
            Seleccione el método
          </option>
          <option value="GENERIC_METHOD">
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
          <option value="NI-MCIT-M-01 Acreditado">
            NI-MCIT-M-01 Acreditado
          </option>
          <option value="NI-MCIT-P-01 Acreditado">
            NI-MCIT-P-01 Acreditado
          </option>
          <option value="NI-MCIT-T-01 Acreditado">
            NI-MCIT-T-01 Acreditado
          </option>
          <option value="NI-MCIT-T-03 Acreditado">
            NI-MCIT-T-03 Acreditado
          </option>
          <option value="NI-MCIT-T-05 Acreditado">
            NI-MCIT-T-05 Acreditado
          </option>
          <option value="NI-MCIT-V-01 Acreditado">
            NI-MCIT-V-01 Acreditado
          </option>
          <option value="(N/A)">No Aplica (N/A)</option>
        </select>
      </div>

      <CInput
        onChange={handleInputChange}
        value={values.name}
        name="name"
        label="Nombre del equipo"
        placeholder="Escriba el nombre del equipo"
        required

      />

      <CInput
        onChange={handleInputChange}
        value={values.count}
        name="count"
        label="Cantidad"
        placeholder="#"
        type="number"
        required

      />

      <CInput
        onChange={handleInputChange}
        name="measuring_range"
        value={values.measuring_range}
        label="Rango de medición"
        placeholder="(0 - 100) mm"
        required
      />


      <div className="table__body__tr__td">
        <label htmlFor=""
          className="text-sm font-semibold"
        >
          Puntos de calibración y/u observación adicional
        </label>
        <textarea
          placeholder="Escriba aquí"
          name="additional_remarks"
          className='w-full h-20 border p-3 resize-none rounded'
          onChange={e => handleInputChange(e.currentTarget)}
          value={values.additional_remarks}
          required
        />
      </div>

      <div className="table__body__tr__td">
        <CButton onClick={handleSubmit}>
          Agregar equipo
        </CButton>
      </div>
    </div >
  )
}