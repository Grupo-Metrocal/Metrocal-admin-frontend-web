import { IEnvironmentalConditions } from '../../../../[id]/interface/t_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useState } from 'react'

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
  const url = `methods/ni-mcit-t-01/environmental-conditions/`

  const [data, setData] = useState<IEnvironmentalConditions>(
    environmentalConditions,
  )

  const equipmentOptions = [
    'NI-MCPPT-01',
    'NI-MCPPT-02',
    'NI-MCPPT-04',
    'NI-MCPPT-05',
    'NI-MCPPT-06',
  ]

  const equipementOPTHPA = ['NI-MCPPT-06']

  const handleEdit = (
    section: string,
    field: string,
    value: number | string,
  ) => {
    if (
      isNaN(value as number) &&
      section !== 'ta.equipment' &&
      section !== 'hpa.equipment'
    ) {
      return
    }

    setData((prev) => {
      const updatedData = { ...prev }
      const sectionFields = section.split('.')
      if (sectionFields.length === 2) {
        updatedData.environment[sectionFields[0]][sectionFields[1]][field] =
          value
      } else {
        updatedData.environment[
          sectionFields[0] as keyof typeof updatedData.environment
        ][field] = value
      }
      return updatedData
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">H R (%) Inicial</th>
            <th className="border px-4 py-2">H R (%) Final</th>
            <th className="border px-4 py-2">T. A. (ºC) Inicial</th>
            <th className="border px-4 py-2">T. A. (ºC) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">P. A.(hPa) Inicial</th>
            <th className="border px-4 py-2">P. A.(hPa) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">T. Estabilización (min)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.ta.hrp.initial}
                onChange={(e) =>
                  handleEdit('ta.hrp', 'initial', e.target.value)
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.ta.hrp.final}
                onChange={(e) => handleEdit('ta.hrp', 'final', e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.ta.tac.initial}
                onChange={(e) =>
                  handleEdit('ta.tac', 'initial', e.target.value)
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.ta.tac.final}
                onChange={(e) => handleEdit('ta.tac', 'final', e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <select
                value={data.environment.ta.equipment}
                onChange={(e) => handleEdit('ta', 'equipment', e.target.value)}
              >
                {equipmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.hpa.pa.initial}
                onChange={(e) =>
                  handleEdit('hpa.pa', 'initial', e.target.value)
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.hpa.pa.final}
                onChange={(e) => handleEdit('hpa.pa', 'final', e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <select
                value={data.environment.hpa.equipment}
                onChange={(e) => handleEdit('hpa', 'equipment', e.target.value)}
              >
                {equipementOPTHPA.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-[80px]"
                type="text"
                value={data.environment.hpa.stabilization_time}
                onChange={(e) =>
                  handleEdit('hpa', 'stabilization_time', e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

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
