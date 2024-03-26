import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/p_01'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { AlertDialogModal } from '@/components/AlertDialogModal'
export const EquipmentInformation = ({
  equipment,
  handleSaveInformation,
}: {
  handleSaveInformation: (values: IEquipmentInformation, url: string) => void
  equipment: IEquipmentInformation
}) => {
  const { values, handleInputChange } = useForm({ ...equipment })
  const url = `methods/ni-mcit-p-01/equipment-information/`

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Dispositivo"
          name="device"
          value={values.device}
          onChange={handleInputChange}
        />
        <CInput
          label="Fabricante"
          name="maker"
          value={values.maker}
          onChange={handleInputChange}
        />
        <CInput
          label="Número de serie"
          name="serial_number"
          value={values.serial_number}
          onChange={handleInputChange}
        />
        <CInput
          label="Clase de exactitud"
          name="accuracy_class"
          value={values.accuracy_class}
          onChange={handleInputChange}
        />
        <CInput
          label="Unidad"
          name="unit"
          value={values.unit}
          onChange={handleInputChange}
        />
        <CInput
          label="Rango mínimo"
          name="range_min"
          value={values.range_min}
          onChange={handleInputChange}
        />

        <CInput
          label="Modelo"
          name="model"
          value={values.model}
          onChange={handleInputChange}
        />
        <CInput
          label="Rango máximo"
          name="range_max"
          value={values.range_max}
          onChange={handleInputChange}
        />
        <CInput
          label="Código"
          name="code"
          value={values.code}
          onChange={handleInputChange}
        />
        <CInput
          label="Diferencia de altura"
          name="height_difference"
          value={values.height_difference}
          onChange={handleInputChange}
        />
        <CInput
          label="Resolución"
          name="resolution"
          value={values.resolution}
          onChange={handleInputChange}
        />
        <CInput
          label="Escala"
          name="scale"
          value={values.scale}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <AlertDialogModal
          title="Guardar información"
          description="¿Estás seguro de guardar la información?"
          onConfirm={() => handleSaveInformation(values, url)}
          nameButton="Guardar información"
        />
      </div>
    </div>
  )
}
