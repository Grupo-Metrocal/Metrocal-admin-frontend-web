import { AutocompleteInput } from '@/components/AutocompleteInput'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { IEquipmentInformation } from '../../../../[id]/interface/b_01'

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

  const unitOptions = [
    'lb', 'kg', 'g'
  ]

  const { values, handleInputChange, handleSelectChange } = useForm({
    ...equipment,
  })

  const url = `methods/ni-mcit-b-01/equipment-information/`
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
          list={[]}
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
          label="Rango min"
          name="range_min"
          value={values.range_min}
          onChange={handleInputChange}
          type='number'
        />
        <CInput
          label="Rango max"
          name="range_max"
          value={values.range_max}
          onChange={handleInputChange}
          type='number'
        />
        <CInput
          label="Resolución"
          name="resolution"
          value={values.resolution}
          onChange={handleInputChange}
          type="text"
        />
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
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="unit" className="text-xs font-semibold ">
            Unidad de medida
          </label>

          <select name="unit" id="unit"
            className="border border-gray-300 rounded-md p-2 h-fit"

            onChange={
              handleSelectChange
            }
          >
            {unitOptions.map((option, index) => (
              <option value={option} selected={option === values?.unit
              } key={index}>{option}</option>
            ))}
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
