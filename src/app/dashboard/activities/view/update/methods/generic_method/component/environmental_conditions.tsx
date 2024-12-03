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
  const { values, handleInputChange, handleSelectChange } = useForm(environmentalConditions)

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          type="number"
          label="Temperatura"
          name="temperature"
          value={`${values?.temperature}`}
          onChange={handleInputChange}
        />
        <CInput
          type="number"
          label="Humedad"
          name="hr"
          value={`${values?.hr}`}
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="pattern" className="text-xs font-semibold ">
            Patrón utilizado
          </label>
          <select
            name="pattern"
            id="pattern"
            defaultValue={values?.pattern}
            value={values?.pattern}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="" disabled>Seleccione un patron</option>
            <option value="NI-MCPPT-01">NI-MCPPT-01</option>
            <option value="NI-MCPPT-02">NI-MCPPT-02</option>
            <option value="NI-MCPPT-04">NI-MCPPT-04</option>
            <option value="NI-MCPPT-05">NI-MCPPT-05</option>
            <option value="NI-MCPPT-06">NI-MCPPT-06</option>
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
