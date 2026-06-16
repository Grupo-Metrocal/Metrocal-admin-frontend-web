import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/t_01'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { usePattern } from '@/app/dashboard/settings/patterns/[calibration_method]/_hooks/usePattern'

// Only °C equipment has an available conversion sheet (°F and K)
// Normalize the unit string to handle encoding differences between environments (e.g. º vs °)
const isCelsius = (unit?: string) =>
  !!unit && unit.replace(/[°º]/g, '').trim().toUpperCase() === 'C'

const getConversionOptions = (equipmentUnit?: string): string[] => {
  if (isCelsius(equipmentUnit)) return ['°F', 'K']
  return []
}

export const DescriptionPattern = ({
  description_pattern,
  equipment_unit,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IDescriptionPattern,
    url: string,
    useActivityID?: boolean,
  ) => void
  description_pattern: IDescriptionPattern
  equipment_unit?: string
}) => {
  const { values, handleInputChange, handleSelectChange } = useForm({ ...description_pattern })
  const url = `methods/ni-mcit-t-01/description-pattern/`
  const { patterns } = usePattern('NI-MCIT-T-01')

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
            {patterns?.map((pattern, patternIndex) => (
              <option key={patternIndex} disabled={!pattern.status} value={pattern.code}>
                {pattern.code} - {pattern.type}
              </option>
            ))}
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

          {getConversionOptions(equipment_unit).length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="conversion_unit" className="text-xs font-semibold">
                Unidad de conversión para el certificado
              </label>
              <select
                name="conversion_unit"
                id="conversion_unit"
                value={values.conversion_unit ?? ''}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded-md p-2 h-fit text-sm"
              >
                <option value="">— Sin conversión —</option>
                {getConversionOptions(equipment_unit).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          )}

          <CInput
            label="Fecha de siguiente calibración"
            name="next_calibration"
            value={values.next_calibration}
            onChange={handleInputChange}
            type='date'
          />

          <CInput
            label="Fecha de calibración"
            name="calibration_date"
            value={values.calibration_date}
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
