import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { ICalibrationResults } from '../../interface/m_01'
import { PATTERNSM01 } from '../../../update/methods/m_01/component/calibrations_results'

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
      <div className='flex flex-col space-y-4 gap-4 h-[70vh] overflow-auto'>
        {calibration_results?.results?.map((result, index) => (
          <div key={index} className='flex flex-col space-y-4 gap-4 p-4'>
            <div className='border bg-gray-400 p-2 text-center'>
              Punto {result?.point_number}
            </div>

            <div className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div className='flex flex-col gap-4 text-[#999]'>
                  <span>Patrones utilizados</span>

                  <div className='flex flex-col gap-2'>
                    {result?.patterns?.map((pattern, patternIndex) => (
                      <div className="flex flex-col gap-[1em]" key={patternIndex}>
                        <span className='text-black'>{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <span className='text-[#999]'>Masa</span>
                  <span>{result.mass}</span>

                </div>

                <div className='flex flex-col gap-4'>
                  <span className='text-[#999]'>Clase de exactitud</span>
                  <span>{result.accuracy_class}</span>

                </div>

                <div className='flex flex-col gap-4'>
                  <span className='text-[#999]'>Serie / Código</span>
                  <span>{result.code}</span>

                </div>

                <div className='flex flex-col gap-4'>
                  <span className='text-[#999]'>Masa nominal del calibrando</span>
                  <span>{result.nominal_mass}</span>
                </div>
              </div>

              <div className='flex flex-col gap-4 mt-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className="flex flex-col gap-[1em]" key={index}>
                    <span className='text-[#999]'>Material del calibrando</span>
                    <span>{result.calibrated_material}</span>

                  </div>

                  <div className='flex flex-col gap-4'>
                    <span className='text-[#999]'>Balanza</span>
                    <span>{result.balance}</span>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <span className='text-[#999]'>Termómetro</span>
                    <span>{result.thermometer}</span>

                  </div>
                </div>
              </div>
            </div>

            <table className='min-w-full border-collapse border border-gray-400'>
              <thead>
                <tr>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L1 (mcp)</th>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L2 (mcx)</th>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L3 (mcx+ms)</th>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L4 (mcp+ms)</th>
                </tr>
              </thead>
              <tbody>
                {result?.calibrations?.l1?.map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className='border border-gray-400 p-2 text-center'>
                      {result.calibrations.l1[rowIndex]}
                    </td>
                    <td className='border border-gray-400 p-2 text-center'>
                      {result.calibrations.l2[rowIndex]}
                    </td>
                    <td className='border border-gray-400 p-2 text-center'>
                      {result.calibrations.l3[rowIndex]}
                    </td>
                    <td className='border border-gray-400 p-2 text-center'>
                      {result.calibrations.l4[rowIndex]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
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
