import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/t_01'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { AutocompleteInput } from '@/components/AutocompleteInput'

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
  const url = `methods/ni-mcit-t-01/description-pattern/`

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    let { name, checked } = e.target

    handleInputChange({ name, value: checked })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="unit" className="text-xs font-semibold ">
            Patrón utilizado
          </label>
          <select
            name="pattern"
            id="pattern"
            defaultValue={values.pattern}
            value={values.pattern}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="NI-MCPT-01">NI-MCPT-01</option>
            <option value="NI-MCPT-02">NI-MCPT-02</option>
            <option value="NI-MCPT-37">NI-MCPT-37</option>
            <option value="NI-MCPT-05">NI-MCPT-05</option>
            <option value="NI-MCPT-06">NI-MCPT-06</option>
            <option value="NI-MCPT-41">NI-MCPT-41</option>
            <option value="NI-MCPT-36">NI-MCPT-36</option>
            <option value="NI-MCPT-40-1">NI-MCPT-40-1</option>
            <option value="NI-MCPT-40-2">NI-MCPT-40-2</option>
          </select>
        </div>

        <CInput
          label="Observaciones"
          name="observation"
          value={values.observation}
          onChange={handleInputChange}
        />

        <div className="my-4 w-fit">
          <div>
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

          <div className="mt-4">
            <label
              htmlFor="show_table_international_system_units"
              className="text-sm flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="show_table_international_system_units"
                id="show_table_international_system_units"
                checked={values.show_table_international_system_units}
                onChange={handleCheckedChange}
                className="mr-2 text-blue-500 form-checkbox focus:ring-blue-500 h-4 w-4"
              />
              ¿Mostrar tabla unidades del sistema internacional en el
              certificado?
            </label>
          </div>

          <CInput
            label="Fecha de siguiente calibración"
            name="next_calibration"
            value={values.next_calibration}
            onChange={handleInputChange}
            type='date'
          />
        </div>
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
