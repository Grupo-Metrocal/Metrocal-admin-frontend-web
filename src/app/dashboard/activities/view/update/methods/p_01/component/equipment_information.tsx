import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/p_01'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { AutocompleteInput } from '@/components/AutocompleteInput'
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
        <AutocompleteInput
          requiredLabel
          value={values.device}
          label="Dispositivo"
          name="device"
          onChange={handleInputChange}
          required
          placeholder="Escriba o seleccione su dispositivo"
          list={[
            { id: 1, name: 'Manómetro digital' },
            { id: 2, name: 'Manómetro manual' },
            { id: 3, name: 'Vacuómetro digital' },
            { id: 4, name: 'Vacuómetro manual' },
            { id: 5, name: 'Manovacuómetro manual' },
            { id: 6, name: 'Manovacuómetro digital' },
          ]}
          keyList="device"
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
        <AutocompleteInput
          requiredLabel
          value={values.unit}
          label="Unidad"
          name="unit"
          onChange={handleInputChange}
          required
          placeholder="Escriba o seleccione su unidad"
          list={[
            { id: 1, name: 'bar' },
            { id: 2, name: 'psi' },
            { id: 3, name: 'Pa' },
            { id: 4, name: 'kPa' },
            { id: 5, name: 'hpa' },
            { id: 6, name: 'MPa' },
            { id: 7, name: 'kgf/cm²' },
            { id: 8, name: 'inHg (0°C)' },
            { id: 9, name: 'mmHg (0°C)' },
            { id: 10, name: 'cmHg (0°C)' },
            { id: 11, name: 'mmH₂O (4°C)' },
            { id: 12, name: 'cmH₂O (4°C)' },
            { id: 13, name: 'inH₂O (4°C)' },
            { id: 14, name: 'atm' },
            { id: 15, name: 'mH₂O (4°C)' },
          ]}
          keyList="unit"
        />
        <CInput
          label="Rango mínimo"
          name="range_min"
          value={values.range_min}
          onChange={handleInputChange}
          type="number"
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
          type="number"
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
          type="number"
        />
        <CInput
          label="Resolución"
          name="resolution"
          value={values.resolution}
          onChange={handleInputChange}
          type="number"
        />
        <AutocompleteInput
          requiredLabel
          value={values.scale}
          label="Escala"
          name="scale"
          onChange={handleInputChange}
          required
          placeholder="Número de escala válido (1-5)"
          list={[
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' },
            { id: 5, name: '5' },
          ]}
          keyList="scale"
          inputType="number"
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
