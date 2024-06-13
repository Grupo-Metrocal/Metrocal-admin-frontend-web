import {
  IEnvironmentalConditions,
  ICycles,
} from '../../../../[id]/interface/b_01'
import { useState } from 'react'
import { AlertDialogModal } from '@/components/AlertDialogModal'

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
  const url = `methods/ni-mcit-b-01/enviromental-condition/`
  const [data, setData] = useState(environmentalConditions)

  const equipmentOptions = [
    'NI-MCPD-01',
    'NI-MCPD-02',
    'NI-MCPD-03',
    'NI-MCPPT-02',
    'NI-MCPPT-05',
    'NI-MCPPT-06',
  ]

  const handleEdit = (
    key: string,
    field: keyof ICycles,
    value: number | string,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prev) => {
      const updatedCycles = { ...prev.cycles }

      if (field === 'ta') {
        if (key === 'initial') {
          updatedCycles.ta.initial = value as number
        } else if (key === 'end') {
          updatedCycles.ta.end = value as number
        }
      } else if (field === 'hr') {
        if (key === 'initial') {
          updatedCycles.hr.initial = value as number
        } else if (key === 'end') {
          updatedCycles.hr.end = value as number
        }
      } else if(field === 'hPa') {
        if (key === 'initial') {
          updatedCycles.hPa.initial = value as number
        } else if (key === 'end') {
          updatedCycles.hPa.end = value as number
        }
      }

      return { ...prev, cycles: updatedCycles }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Ciclos</th>
            <th className="border px-4 py-2">T. A. (ºC) Inicial</th>
            <th className="border px-4 py-2">T. A. (ºC) Final</th>
            <th className="border px-4 py-2">H R (%) Inicial</th>
            <th className="border px-4 py-2">H R (%) Final</th>
            <th className="border px-4 py-2">P. A.(hPa) Inicial</th>
            <th className="border px-4 py-2">P. A.(hPa) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">Tiempo</th>
            <th className="border px-4 py-2">Sitio de estabilización</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data.cycles.ta.initial}
                onChange={(e) =>
                  handleEdit('initial', 'ta', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data.cycles.ta.end}
                onChange={(e) =>
                  handleEdit('end', 'ta', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data.cycles.hr.initial}
                onChange={(e) =>
                  handleEdit('initial', 'hr', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data.cycles.hr.end}
                onChange={(e) =>
                  handleEdit('end', 'hr', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data.cycles.hPa.initial}
                onChange={(e) =>
                  handleEdit('initial', 'hPa', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data.cycles.hPa.end}
                onChange={(e) =>
                  handleEdit('end', 'hPa', Number(e.target.value))
                }
              />
            </td>

            <td className="border px-4 py-2">{data.equipment_used}</td>
            <td className="border px-4 py-2">
              {`${data.time.hours}h ${data.time.minute}m`}
            </td>
            <td className="border px-4 py-2">{data.stabilization_site}</td>
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
