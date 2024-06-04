import { useForm } from '@/hooks/useForm'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import {
  IEnvironmentalConditions,
  Cycles,
} from '../../../../[id]/interface/d_01'
import { useState } from 'react'

export const EnviromentalCondition = ({
  enviromentaCondition,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IEnvironmentalConditions,
    url: string,
    useActivityID?: boolean,
  ) => void
  enviromentaCondition: IEnvironmentalConditions
}) => {
  const url = `methods/ni-mcit-d-01/equipment-information/`
  const [data, setData] = useState(enviromentaCondition)
  const equipmentOptions = [
    'NI-MCPD-01',
    'NI-MCPD-02',
    'NI-MCPD-03',
    'NI-MCPPT-02',
    'NI-MCPPT-05',
    'NI-MCPPT-06',
  ]
  const handleEdit = (key: string, field: string, value: number | string) => {
    if (isNaN(value as number)) {
      return
    }
    setData((prev) => {
      const cycles = { ...prev.cycles }
      if (field === 'ta.initial') {
        cycles.ta.initial = value as number
      } else if (field === 'ta.end') {
        cycles.ta.final = value as number
      } else if (field === 'hr.initial') {
        cycles.hr.initial = value as number
      } else if (field === 'hr.end') {
        cycles.hr.final = value as number
      }
      return { ...prev, cycles }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Ciclos</th>
            <th className="px-4 py-2">T. A. (ºC) Inicial</th>
            <th className="px-4 py-2">T. A. (ºC) Final</th>
            <th className="px-4 py-2">H R (%) Inicial</th>
            <th className="px-4 py-2">H R (%) Final</th>
            <th className="px-4 py-2">Equipo utilizado</th>
            <th className="px-4 py-2">Tiempo</th>
            <th className="px-4 py-2">Sitio de estabilización</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">
              <input
                type="number"
                className="w-full"
                value={data.cycles.ta.initial}
                onChange={(e) =>
                  handleEdit('cycles', 'ta.initial', e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="number"
                className="w-full"
                value={data.cycles.ta.final}
                onChange={(e) => handleEdit('cycles', 'ta.end', e.target.value)}
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="number"
                className="w-full"
                value={data.cycles.hr.initial}
                onChange={(e) =>
                  handleEdit('cycles', 'hr.initial', e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="number"
                className="w-full"
                value={data.cycles.hr.final}
                onChange={(e) => handleEdit('cycles', 'hr.end', e.target.value)}
              />
            </td>
            <td className="px-4 py-2">
              <select
                value={data.equipment_used}
                onChange={(e) =>
                  handleEdit('equipement', data.equipment_used, e.target.value)
                }
              >
                {equipmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="w-full"
                value={data.time}
                onChange={(e) => setData({ ...data, time: e.target.value })}
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="w-full"
                value={data.stabilization_site}
                onChange={(e) =>
                  setData({ ...data, stabilization_site: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  )
}
