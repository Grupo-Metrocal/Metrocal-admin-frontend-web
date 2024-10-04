import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/b_01'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const DescriptionPattern = ({
  description_pattern,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IDescriptionPattern,
    url: string,
    useActivityID?: boolean,
  ) => void
  description_pattern: IDescriptionPattern
}) => {
  const { values, handleInputChange, handleSelectChange } = useForm({ ...description_pattern })
  const url = `methods/ni-mcit-b-01/description-pattern/`

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, checked } = e.target

    handleInputChange({ name, value: checked })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Observaciones"
          name="observation"
          value={values.observation}
          onChange={handleInputChange}
        />

        <div className="my-4 w-fit">
          <label
            htmlFor="creditable"
            className="text-sm flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              name="creditable"
              id="creditable"
              checked={values.creditable}
              onChange={handleCheckedChange}
              className="mr-2 text-blue-500 form-checkbox focus:ring-blue-500 h-4 w-4"
            />
            ¿Equipo acreditado?
          </label>
        </div>

        <div className="flex flex-col gap-[1em]">
          <label htmlFor="show_additional_table" className="text-xs font-semibold ">
            Mostrar tabla de conversión en el certificado
          </label>
          <select
            name="show_additional_table"
            id="show_additional_table"
            defaultValue={values.show_additional_table}
            value={values.show_additional_table}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="">NO MOSTRAR</option>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
          </select>
        </div>

        <CInput
          label="Fecha de siguiente calibración"
          name="next_calibration"
          value={values.next_calibration}
          onChange={handleInputChange}
          type='date'
        />
      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(values, url, true)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
