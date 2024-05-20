import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { ICalibrationResults } from '../../interface/t_03'
import { useState } from 'react'

interface Props {
  calibration_results: ICalibrationResults
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}
export const CalibrationResults = ({
  calibration_results,
  method_name,
  id,
  report_messages,
  report_status,
}: Props) => {
  const [data, setData] = useState(calibration_results)

  const cycles = data?.results

  const consolidatedData = []
  const maxLength =
    calibration_results &&
    Math?.max(...cycles?.map((cycle) => cycle.calibration_factor.length))

  for (let i = 0; i < maxLength; i++) {
    const row = { pattern: null, cycle1: {}, cycle2: {} }
    cycles.forEach((cycle) => {
      const factor = cycle.calibration_factor[i]
      if (factor) {
        if (cycle.cicle_number === 1) {
          row.pattern = factor.pattern
          row.cycle1 = factor
        } else if (cycle.cicle_number === 2) {
          row.cycle2 = factor
        }
      }
    })
    consolidatedData.push(row)
  }

  return (
    <div>
      <div className="flex flex-col space-y-4 border p-4">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-400 p-2 bg-gray-200"
              >
                Indicación
              </th>
              <th
                colSpan={2}
                className="border border-gray-400 p-2 bg-gray-200"
              >
                Ciclo 1
              </th>
              <th
                colSpan={2}
                className="border border-gray-400 p-2 bg-gray-200"
              >
                Ciclo 2
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Ascendente
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Descendente
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Ascendente
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Descendente
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 text-center">Patrón</td>
              {data?.results.map(() => {
                return (
                  <>
                    <td className="border border-gray-400 p-2 text-center">
                      Equipo
                    </td>
                    <td className="border border-gray-400 p-2 text-center">
                      Equipo
                    </td>
                  </>
                )
              })}
            </tr>

            {consolidatedData.map((row: any, i: number) => {
              return (
                <tr key={i}>
                  <td className="border border-gray-400 p-2 text-center">
                    <span>{row.pattern}</span>
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <span>{row.cycle1.upward.equipment}</span>
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <span>{row.cycle1.downward.equipment}</span>
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <span>{row.cycle2.upward.equipment}</span>
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <span>{row.cycle2.downward.equipment}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ReportMethodActivity
        method_name={method_name}
        zone={'Resultados de calibración'}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
    </div>
  )
}
