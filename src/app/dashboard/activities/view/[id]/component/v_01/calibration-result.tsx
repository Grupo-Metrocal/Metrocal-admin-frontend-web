import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { ICalibrationResults } from '../../interface/v_01'

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
    <div className='flex flex-col space-y-4 gap-4'>
      <div className="flex flex-col space-y-4 gap-4 max-h-[70vh] overflow-y-auto">
        {calibration_results?.results?.map((result, index) => {
          return (
            <table
              className="min-w-full border-collapse border border-gray-400"
              key={index}
            >
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2" colSpan={4}>
                    Punto {result.point_number}
                  </th>
                </tr>
                <tr>
                  <th
                    rowSpan={2}
                    className="border border-gray-400 p-2 bg-gray-200"
                  >
                    Numero de mediciones
                  </th>

                  <th
                    colSpan={2}
                    className="border border-gray-400 p-2 bg-gray-200"
                  >
                    Masa del patrón
                  </th>

                  <th className="border border-gray-400 p-2 bg-gray-200">
                    Densidad del agua
                  </th>
                </tr>

                <tr>
                  <th className="border border-gray-400 p-2 bg-gray-200">
                    Lleno
                  </th>
                  <th className="border border-gray-400 p-2 bg-gray-200">
                    Vacio
                  </th>
                  <th className="border border-gray-400 p-2 bg-gray-200">
                    Agua
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.calibrations.map((calibration, calibrationIndex) => {
                  return (
                    <tr key={calibrationIndex}>
                      <td className="border border-gray-400 p-2 text-center">
                        {calibrationIndex + 1}
                      </td>
                      <td className="border border-gray-400 p-2 text-center">

                        {calibration.pattern_dough.full}

                      </td>
                      <td className="border border-gray-400 p-2 text-center">

                        {calibration.pattern_dough.empty}

                      </td>
                      <td className="border border-gray-400 p-2 text-center">

                        {calibration.water_temperature}

                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        })}
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
