import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useState } from 'react'
import { IEnvironmentalConditions } from '../../../../[id]/interface/generic_method'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'

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
  const url = `methods/generic-method/environmental-conditions/`
  const { values, handleInputChange } = useForm(environmentalConditions)

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          type="number"
          label="Temperatura"
          name="temperature"
          value={`${values.temperature ?? 0}`}
          onChange={handleInputChange}
        />
        <CInput
          type="number"
          label="Humedad"
          name="humidity"
          value={`${values.hr ?? 0}`}
          onChange={handleInputChange}
        />
        <CInput
          label="Equipo utilizado"
          name="equipment_used"
          value={values.equipment_used ?? ''}
          onChange={handleInputChange}
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
