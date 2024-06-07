import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { ICalibrationResults } from '../../interface/t_05'

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
                Temperatura
              </th>

              {calibration_results?.results[0]?.calibrations?.map((result) => {
                return (
                  <th
                    colSpan={2}
                    className="border border-gray-400 p-2 bg-gray-200"
                    key={result.point_number}
                  >
                    Punto{' '}
                    {result.point_number === -1
                      ? '1 Final'
                      : result.point_number}
                  </th>
                )
              })}
            </tr>
            <tr>
              {calibration_results?.results[0]?.calibrations?.map((result) => {
                return (
                  <>
                    <th className="border border-gray-400 p-2 bg-gray-200">
                      Inicial
                    </th>
                    <th className="border border-gray-400 p-2 bg-gray-200">
                      Final
                    </th>
                  </>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {calibration_results?.results?.map((result) => {
              return (
                <tr key={result?.temperature}>
                  <td className="border border-gray-400 p-2 text-center">
                    {result.temperature}
                  </td>

                  {result?.calibrations.map((calibration) => {
                    return (
                      <>
                        <td className="border border-gray-400 p-2 text-center">
                          {calibration?.initial}
                        </td>
                        <td className="border border-gray-400 p-2 text-center">
                          {calibration?.final}
                        </td>
                      </>
                    )
                  })}
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
