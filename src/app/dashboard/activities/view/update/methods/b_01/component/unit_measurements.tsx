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
  const { values, handleInputChange } = useForm({ ...unit_of_measurement })
  const url = `methods/ni-mcit-b-01/unit-of-measurement/`

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Medida"
          name="measure"
          value={values?.measure}
          onChange={handleInputChange}
        />
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
