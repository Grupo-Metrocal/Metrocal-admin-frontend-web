import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { ICalibrationResults } from '../../interface/t_01'
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
  return (
    <div>
      <div className="flex flex-col space-y-4 border p-4">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="header-row">
              <th colSpan={10} className="p-2">
                Linealidad
              </th>
            </tr>
            <tr className="subheader-row">
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación termómetro
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación termómetro
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación termómetro
              </th>
            </tr>
          </thead>
          <tbody>
            {calibration_results?.results?.map((result, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {result?.indication_linear?.map((key) => {
                    return (
                      <>
                        <td className="border border-gray-400 p-2 text-center">
                          <span>{key?.patron}</span>
                        </td>
                        <td className="border border-gray-400 p-2 text-center">
                          <span>{key?.thermometer}</span>
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
