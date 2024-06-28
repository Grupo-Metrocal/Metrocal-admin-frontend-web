import { useState } from 'react'
import { IComputerData } from '../../../../[id]/interface/generic_method'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { CInput } from '@/components/CInput'

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
  const [data, setData] = useState(computerData)

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Unidad de medida"
          name="unit_of_measurement"
          value={data.unit_of_measurement}
          onChange={(e) =>
            setData({ ...data, unit_of_measurement: e.target.value })
          }
        />
        <CInput
          label="Unidad de escala"
          name="scale_unit"
          value={data.scale_unit}
          onChange={(e) => setData({ ...data, scale_unit: e.target.value })}
        />
      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(data, url)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
