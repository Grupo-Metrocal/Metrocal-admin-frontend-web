import { useForm } from '@/hooks/useForm'
import { IEnvironmentalConditions } from '../../../../[id]/interface/t_03'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import { CInput } from '@/components/CInput'
import { usePattern } from '@/app/dashboard/settings/patterns/[calibration_method]/_hooks/usePattern'

export const EnvironmentalConditions = ({
  environmentalConditions,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IEnvironmentalConditions,
    url: string,
    useActivityID?: boolean,
  ) => void
  environmentalConditions: IEnvironmentalConditions
}) => {
  const url = `methods/ni-mcit-t-03/environmental-conditions/`
  const { values, handleInputChange, handleSelectChange } = useForm({ ...environmentalConditions })
  const { patterns } = usePattern('all')

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Temperatura"
          name="temperature"
          value={values.temperature}
          onChange={handleInputChange}
          type="number"
        />
        <CInput
          label="Humedad"
          name="humidity"
          value={values.humidity}
          onChange={handleInputChange}
          type="number"
        />

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
            {patterns?.map((pattern, patternIndex) => (
              <option key={patternIndex} disabled={!pattern.status} value={pattern.code}>
                {pattern.code} - {pattern.type}
              </option>
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
