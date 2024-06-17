import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/t_03'
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
  const { values, handleInputChange, handleSelectChange } = useForm({ ...equipment })
  const url = `methods/ni-mcit-t-03/equipment-information/`

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
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="unit" className="text-xs font-semibold ">
            Unidad de medida
          </label>
          <select
            name="unit"
            id="unit"
            defaultValue={values.unit}
            value={values.unit}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="°C">°C</option>
            <option value="°F">°F</option>
            <option value="K">K</option>
          </select>
        </div>

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

        <div className="flex flex-col gap-[1em]">
          <label htmlFor="sensor" className="text-xs font-semibold ">
            Sensor
          </label>
          <select
            name="sensor"
            id="sensor"
            defaultValue={values.sensor}
            value={values.sensor}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="RTD">RTD</option>
            <option value="TCK">TCK</option>
          </select>
        </div>
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
