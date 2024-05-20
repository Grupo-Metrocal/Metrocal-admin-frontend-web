import { useForm } from '@/hooks/useForm'
import { IEnvironmentalConditions } from '../../../../[id]/interface/t_03'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import { CInput } from '@/components/CInput'

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
  const { values, handleInputChange } = useForm({ ...environmentalConditions })

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

        <AutocompleteInput
          requiredLabel
          value={values.pattern}
          label="Patron utilizado"
          name="pattern"
          onChange={handleInputChange}
          required
          placeholder="Escriba o seleccione su patron"
          list={[
            { id: 1, name: 'NI-MCPPT-01' },
            { id: 2, name: 'NI-MCPPT-02' },
            { id: 3, name: 'NI-MCPPT-05' },
          ]}
          keyList="pattern"
          inputType="string"
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
