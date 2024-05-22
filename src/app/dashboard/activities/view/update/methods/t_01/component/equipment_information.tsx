import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/t_01'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { AutocompleteInput } from '@/components/AutocompleteInput'

export const EquipmentInformation = ({
  equipment,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IEquipmentInformation,
    url: string,
    useActivityID?: boolean,
  ) => void
  equipment: IEquipmentInformation
}) => {
  const { values, handleInputChange } = useForm({ ...equipment })
  const url = `methods/ni-mcit-t-01/equipment-information/`

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
            { id: 1, name: 'Termómetro Analógico' },
            { id: 2, name: 'Datalogger' },
            { id: 3, name: 'Termómetro Digital' },
            { id: 4, name: 'Termómetro Bimetálico' },
            { id: 5, name: 'Termómetro Infrarrojo' },
            { id: 6, name: 'Termómetro Líquido en Vidrio' },
            { id: 7, name: 'Termo Balanza' },
            { id: 8, name: 'Termoregistrador' },
            { id: 8, name: 'Transmisores de Temperatura' },
            { id: 9, name: 'Sensor de RTD' },
            { id: 10, name: 'Sensor Termopar' },
            { id: 11, name: 'Sensor Termocupla' },
            { id: 12, name: 'Baño María' },
            { id: 13, name: 'Incubadora' },
            { id: 14, name: 'Baño de líquido' },
          ]}
          keyList="device"
        />
        <CInput
          label="Fabricante/Marca"
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
        <AutocompleteInput
          requiredLabel
          value={values.unit}
          label="Unidad"
          name="unit"
          onChange={handleInputChange}
          required
          placeholder="Escriba o seleccione su unidad"
          list={[
            { id: 1, name: '°C' },
            { id: 2, name: '°F' },
            { id: 3, name: 'K' },
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
          label="Resolución"
          name="resolution"
          value={values.resolution}
          onChange={handleInputChange}
          type="number"
        />
      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(values, url)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
