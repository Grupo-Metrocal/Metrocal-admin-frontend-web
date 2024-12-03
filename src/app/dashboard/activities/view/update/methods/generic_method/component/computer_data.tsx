import { IComputerData } from '../../../../[id]/interface/generic_method'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'

export const ComputerData = ({
  computerData,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IComputerData,
    url: string,
    useActivityID?: boolean,
  ) => void
  computerData: IComputerData
}) => {
  const url = `methods/generic-method/computer-data/`
  const { values, handleInputChange, handleSelectChange } = useForm(computerData)

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="unit_of_measurement" className="text-xs font-semibold ">
            Unidad de medida
          </label>
          <select
            name="unit_of_measurement"
            id="unit_of_measurement"
            defaultValue={values?.unit_of_measurement}
            value={values?.unit_of_measurement}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="" disabled>Seleccione la unidad</option>
            <option value="% HR">% HR</option>
          </select>
        </div>
        <CInput
          label="Unidad de escala"
          name="scale_division"
          value={values?.scale_division}
          onChange={handleInputChange}
          type='number'
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
