import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/t_05'
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
  const url = `methods/ni-mcit-t-05/equipment-information/`

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
          list={[{ id: 1, name: '' }]}
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
          label="Temperatura mínima"
          name="temperature_min"
          value={values.temperature_min}
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
          label="Temperatura máxima"
          name="temperature_max"
          value={values.temperature_max}
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
        <AutocompleteInput
          requiredLabel
          value={values.type_thermometer}
          label="Tipo de termometro"
          name="type_thermometer"
          onChange={handleInputChange}
          required
          placeholder="Escriba o seleccione su sensor"
          list={[
            { id: 1, name: 'mercurio' },
            { id: 2, name: 'Alcohol, etanol' },
            { id: 3, name: 'Tolueno' },
            { id: 4, name: 'Pentano' },
          ]}
          keyList="type_thermometer"
          inputType="string"
        />
        <CInput
          label="Numero de puntos"
          name="no_points"
          value={values.no_points}
          onChange={handleInputChange}
        />
        <CInput
          label="Numero de lecturas"
          name="no_readings"
          value={values.no_readings}
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
