import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IResultMedition } from '../../interface/generic_method'

interface ResultMeditionProps {
  result_medition: IResultMedition
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const ResultMedition = ({
  result_medition,
  id,
  method_name,
  report_status,
  report_messages,
}: ResultMeditionProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <table>
        <thead>
          <tr className="header-row">
            <th colSpan={10} className="p-2">
              Medición
            </th>
          </tr>
          <tr className="subheader-row">
            <th className="border border-gray-400 p-2 bg-gray-200">
              patrón
            </th>
            <th className="border border-gray-400 p-2 bg-gray-200">
              Equipo
            </th>
            <th className="border border-gray-400 p-2 bg-gray-200">
              patrón
            </th>
            <th className="border border-gray-400 p-2 bg-gray-200">
              Equipo
            </th>
            <th className="border border-gray-400 p-2 bg-gray-200">
              patrón
            </th>
            <th className="border border-gray-400 p-2 bg-gray-200">
              Equipo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {result_medition?.meditions?.map((result, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {result?.medition?.map((key) => {
                  return (
                    <>
                      <td className="border border-gray-400 p-2 text-center">
                        <span>{key?.pattern}</span>
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        <span>{key?.equipment}</span>
                      </td>
                    </>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <ReportMethodActivity
        method_name={method_name}
        zone={'Medición de resultados'}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
    </div>
  )
}
