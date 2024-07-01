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
  const { values, handleInputChange } = useForm(computerData)

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Unidad de medida"
          name="unit_of_measurement"
          value={values.unit_of_measurement || ''}
          onChange={handleInputChange}
        />
        <CInput
          label="Unidad de escala"
          name="scale_unit"
          value={values.scale_unit || ''}
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
