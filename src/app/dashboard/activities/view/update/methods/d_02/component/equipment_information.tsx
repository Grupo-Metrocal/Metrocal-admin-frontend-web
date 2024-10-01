import { AutocompleteInput } from '@/components/AutocompleteInput'
import { IEquipmentInformation } from '../../../../[id]/interface/d_02'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'

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
  const url = `methods/ni-mcit-d-02/equipment-information/`
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
            { id: 1, name: 'Micrómetro Digital' },
            { id: 2, name: 'Pie de Rey' },
            { id: 3, name: 'Juego de Bloques Patrón' },
            { id: 4, name: 'Higro Termómetro' },
            { id: 5, name: 'Micrómetro Analógico' },
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
          label="Resolución"
          name="resolution"
          value={values.resolution}
          onChange={handleInputChange}
          type="number"
        />
        <CInput
          label="Rango Minimo"
          name="range_min"
          value={values.range_min}
          onChange={handleInputChange}
          type="number"
        />
        <CInput
          label="Rango Maximo"
          name="range_max"
          value={values.range_max}
          onChange={handleInputChange}
          type="number"
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
            <option value="mm">mm</option>
            <option value="plg">plg</option>
          </select>
        </div>
        <CInput
          label="Modelo"
          name="model"
          value={values.model}
          onChange={handleInputChange}
        />
        <CInput
          label="Código"
          name="code"
          value={values.code}
          onChange={handleInputChange}
        />
        <CInput
          label="Logitud"
          name="length"
          value={values.length}
          onChange={handleInputChange}
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
