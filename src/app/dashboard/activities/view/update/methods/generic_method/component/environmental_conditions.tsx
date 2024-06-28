import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useState } from 'react'
import { IEnvironmentalConditions } from '../../../../[id]/interface/generic_method'
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
  const url = `methods/generic-method/enviromental-condition/`
  const [data, setData] = useState(environmentalConditions)

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          type="number"
          label="Temperatura"
          name="temperature"
          value={`${data.temperature ?? 0}`}
          onChange={(e) => setData({ ...data, temperature: e.target.value })}
        />
        <CInput
          type="number"
          label="Humedad"
          name="humidity"
          value={`${data.hr ?? 0}`}
          onChange={(e) => setData({ ...data, hr: e.target.value })}
        />
        <CInput
          label="Equipo utilizado"
          name="equipment_used"
          value={data.equipment_used}
          onChange={(e) => setData({ ...data, equipment_used: e.target.value })}
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
