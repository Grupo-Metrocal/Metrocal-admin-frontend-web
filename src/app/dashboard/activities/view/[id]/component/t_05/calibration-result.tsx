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
        <div className="min-w-full p-4 bg-gray-50 rounded-lg">
          <header className="flex gap-4 mb-4">
            <section className="flex items-center justify-center border border-gray-300 bg-white p-3 w-[150px] rounded-md shadow-sm">
              <span className="text-center font-semibold text-gray-800">
                Temperatura
              </span>
            </section>

            <section className="flex gap-6 w-full overflow-x-auto">
              {calibration_results.results.map((result) => (
                <div
                  className="flex flex-col w-full max-w-[140px] p-2 border border-gray-300 bg-white rounded-md shadow-sm"
                  key={result?.point_number}
                >
                  <span className="text-center font-semibold text-gray-700 mb-2">
                    Punto {result?.point_number === -1 ? '1 final' : result?.point_number}
                  </span>
                  <div className="flex justify-between items-center gap-2">
                    <span className="border border-gray-300 w-full text-center py-1 bg-gray-100 rounded-md">
                      Lp
                    </span>
                    <span className="border border-gray-300 w-full text-center py-1 bg-gray-100 rounded-md">
                      Libc
                    </span>
                  </div>
                </div>
              ))}
            </section>
          </header>

          <section className="flex w-full gap-4">
            <div className="flex flex-col w-[150px] gap-2">
              {calibration_results.results.map((result) => (
                <span
                  className="p-2 text-center w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                  key={result?.point_number}
                >{result.temperature}
                </span>
              ))}
            </div>

            <div className="flex w-full gap-6 overflow-x-auto">
              {calibration_results.results.map((result) => (
                <div
                  className="flex flex-col w-full max-w-[140px] gap-2"
                  key={result?.point_number}
                >
                  {result.calibrations.map((calibration, index) => (
                    <div
                      className="w-full flex justify-between gap-2"
                      key={index}
                    >
                      <span
                        className="border border-gray-300 w-full text-center p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"

                      >{calibration.initial}</span>
                      <span
                        className="border border-gray-300 w-full text-center p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                      >
                        {calibration.final}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
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
