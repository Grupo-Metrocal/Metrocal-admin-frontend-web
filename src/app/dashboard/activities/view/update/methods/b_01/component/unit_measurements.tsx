import { AlertDialogModal } from '@/components/AlertDialogModal'
import { IUnitOfMeasurement } from '../../../../[id]/interface/b_01'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { use } from 'react'

export const UnitMeasurements = ({
  unit_of_measurement,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    data: IUnitOfMeasurement,
    url: string,
    useActivityID?: boolean,
  ) => void
  unit_of_measurement: IUnitOfMeasurement
}) => {
  const { values, handleInputChange, handleSelectChange } = useForm({ ...unit_of_measurement })
  const url = `methods/ni-mcit-b-01/unit-of-measurement/`

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div className="flex flex-col gap-[1em]">
          <label htmlFor="measure" className="text-xs font-semibold ">
            Unidad de medida
          </label>
          <select
            name="measure"
            id="measure"
            defaultValue={values?.measure}
            value={values?.measure}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
        <CInput
          type="number"
          label="Resolución"
          name="resolution"
          value={values?.resolution}
          onChange={handleInputChange}
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
