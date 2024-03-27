import { useForm } from '@/hooks/useForm'
import { IEnvironmentalConditions } from '../../../../[id]/interface/p_01'
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
  const url = `methods/ni-mcit-p-01/environmental-conditions/`
  const [data, setData] = useState(environmentalConditions)

  const equipmentOptions = [
    'NI-MCPPT-01',
    'NI-MCPPT-02',
    'NI-MCPPT-03',
    'NI-MCPPT-04',
  ]

  const equipementOPTHPA = ['NI-MCPPT-06']

  const handleEdit = (
    key: string,
    field: string,
    value: number | string,
    cycleNumber: number,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prev) => {
      const cycles = prev.cycles.map((cycle) => {
        if (cycle.cycle_number === cycleNumber) {
          if (field === 'ta.hrp.initial') {
            cycle.ta.hrp.initial = value as number
          } else if (field === 'ta.hrp.final') {
            cycle.ta.hrp.final = value as number
          } else if (field === 'ta.tac.initial') {
            cycle.ta.tac.initial = value as number
          } else if (field === 'ta.tac.final') {
            cycle.ta.tac.final = value as number
          } else if (field === 'ta') {
            cycle.ta.equipement = value as string
          } else if (field === 'hPa.pa.initial') {
            cycle.hPa.pa.initial = value as number
          } else if (field === 'hPa.pa.final') {
            cycle.hPa.pa.final = value as number
          } else if (field === 'hPa') {
            cycle.hPa.equipement = value as string
          }
        }
        return cycle
      })
      return { ...prev, cycles }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Ciclo</th>
            <th className="border px-4 py-2">H R (%) Inicial</th>
            <th className="border px-4 py-2">H R (%) Final</th>
            <th className="border px-4 py-2">T. A. (ºC) Inicial</th>
            <th className="border px-4 py-2">T. A. (ºC) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">P. A.(hPa) Inicial</th>
            <th className="border px-4 py-2">P. A.(hPa) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
          </tr>
        </thead>
        <tbody>
          {data.cycles.map((cycle) => (
            <tr key={cycle.cycle_number} className="text-center">
              <td className="border px-4 py-2">{cycle.cycle_number}</td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px]"
                  type="text"
                  value={cycle.ta.hrp.initial}
                  onChange={(e) =>
                    handleEdit(
                      'initial',
                      'ta.hrp.initial',
                      e.target.value,
                      cycle.cycle_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px]"
                  type="text"
                  value={cycle.ta.hrp.final}
                  onChange={(e) =>
                    handleEdit(
                      'final',
                      'ta.hrp.final',
                      e.target.value,
                      cycle.cycle_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px]"
                  type="text"
                  value={cycle.ta.tac.initial}
                  onChange={(e) =>
                    handleEdit(
                      'initial',
                      'ta.tac.initial',
                      e.target.value,
                      cycle.cycle_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px]"
                  type="text"
                  value={cycle.ta.tac.final}
                  onChange={(e) =>
                    handleEdit(
                      'final',
                      'ta.tac.final',
                      e.target.value,
                      cycle.cycle_number,
                    )
                  }
                />
              </td>
              {cycle.cycle_number === 1 && (
                <td className="border px-4 py-2" rowSpan={data.cycles.length}>
                  <select
                    value={cycle.ta.equipement}
                    onChange={(e) =>
                      handleEdit(
                        'equipement',
                        'ta',
                        e.target.value,
                        cycle.cycle_number,
                      )
                    }
                  >
                    {equipmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              )}
              <td className="border px-4 py-2">
                <input
                  className="w-[80px]"
                  type="text"
                  value={cycle.hPa.pa.initial}
                  onChange={(e) =>
                    handleEdit(
                      'initial',
                      'hPa.pa.initial',
                      e.target.value,
                      cycle.cycle_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px]"
                  type="text"
                  value={cycle.hPa.pa.final}
                  onChange={(e) =>
                    handleEdit(
                      'final',
                      'hPa.pa.final',
                      e.target.value,
                      cycle.cycle_number,
                    )
                  }
                />
              </td>
              {cycle.cycle_number === 1 && (
                <td className="border px-4 py-2" rowSpan={data.cycles.length}>
                  <select
                    value={cycle.hPa.equipement}
                    onChange={(e) =>
                      handleEdit(
                        'equipement',
                        'hPa',
                        e.target.value,
                        cycle.cycle_number,
                      )
                    }
                  >
                    {equipementOPTHPA.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              )}
            </tr>
          ))}
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
