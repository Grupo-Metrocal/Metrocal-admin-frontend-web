import { useForm } from '@/hooks/useForm'
import { IEquipmentInformation } from '../../../../[id]/interface/v_01'
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
  const { values, handleInputChange, handleSelectChange } = useForm({
    ...equipment,
  })
  const url = `methods/ni-mcit-v-01/equipment-information/`

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
            <option value="ml">ml</option>
            <option value="L">L</option>
          </select>
        </div>
        <CInput
          label="Cap.nominal/alcance"
          name="nominal_range"
          value={values.nominal_range}
          onChange={handleInputChange}
          type="number"
        />
        <CInput
          label="División de escala"
          name="tempescale_divisionrature_max"
          value={values.scale_division}
          onChange={handleInputChange}
          type="number"
        />
        <CInput
          label="Código"
          name="code"
          value={values.code}
          onChange={handleInputChange}
        />

        {/* <CInput
          label="Resolución"
          name="resolution"
          value={values.resolution}
          onChange={handleInputChange}
          type="number"
        /> */}
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="balance" className="text-xs font-semibold ">
            Balanza
          </label>
          <select
            name="balance"
            id="balance"
            defaultValue={values.balance}
            value={values.balance}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="1">g</option>
            <option value="2">g</option>
            <option value="3">kg</option>
          </select>
        </div>

        <div className="flex flex-col gap-[1em]">
          <label htmlFor="thermometer" className="text-xs font-semibold ">
            Termómetro
          </label>
          <select
            name="thermometer"
            id="thermometer"
            defaultValue={values.thermometer}
            value={values.thermometer}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="1">Accumac</option>
          </select>
        </div>

        <div className="flex flex-col gap-[1em]">
          <label
            htmlFor="volumetric_container"
            className="text-xs font-semibold "
          >
            Contenedor volumétrico
          </label>
          <select
            name="volumetric_container"
            id="volumetric_container"
            defaultValue={values.volumetric_container}
            value={values.volumetric_container}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="1">ml</option>
            <option value="2">L</option>
          </select>
        </div>
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="neck_diameter" className="text-xs font-semibold ">
            Diámetro del cuello (mm)
          </label>
          <select
            name="neck_diameter"
            id="neck_diameter"
            defaultValue={values.neck_diameter}
            value={values.neck_diameter}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="1">5 mm</option>
            <option value="2">10 mm</option>
            <option value="3">20 mm</option>
            <option value="4">30 mm</option>
          </select>
        </div>
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="material" className="text-xs font-semibold ">
            Material
          </label>
          <select
            name="material"
            id="material"
            defaultValue={values.material}
            value={values.material}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="1">Vidrio borosilicato 3.3</option>
            <option value="2">Vidrio borosilicato 5.0</option>
            <option value="3">Vidrio soda Lime</option>
            <option value="4">Plastico propileno</option>
            <option value="5">Plastico</option>
            <option value="6">Acero Inoxidable 304</option>
            <option value="7">Acero Inoxidable 316</option>
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
