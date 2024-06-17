import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/p_01'
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
            <option value="bar">bar</option>
            <option value="psi">psi</option>
            <option value="Pa">Pa</option>
            <option value="kPa">kPa</option>
            <option value="hpa">hpa</option>
            <option value="MPa">MPa</option>
            <option value="kgf/cm²">kgf/cm²</option>
            <option value="inHg (0°C)">inHg (0°C)</option>
            <option value="mmHg (0°C)">mmHg (0°C)</option>
            <option value="cmHg (0°C)">cmHg (0°C)</option>
            <option value="mmH₂O (4°C)">mmH₂O (4°C)</option>
            <option value="cmH₂O (4°C)">cmH₂O (4°C)</option>
            <option value="inH₂O (4°C)">inH₂O (4°C)</option>
            <option value="atm">atm</option>
            <option value="mH₂O (4°C)">mH₂O (4°C)</option>
          </select>
        </div>
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

        <div className="flex flex-col gap-[1em]">
          <label htmlFor="scale" className="text-xs font-semibold ">
            Escala
          </label>
          <select
            name="scale"
            id="scale"
            defaultValue={values.scale}
            value={values.scale}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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
