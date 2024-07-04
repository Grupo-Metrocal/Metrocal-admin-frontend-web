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
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patrón 1
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipo 1
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patrón 2
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipo 2
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patrón 3
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipo 3
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {result_medition?.medition.length > 0 ? (
            result_medition?.medition.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.patron1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.equiopo1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.patron2}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.equiopo2}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.patron3}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.equiopo3}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                0
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                0
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                0
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                0
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                0
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                0
              </td>
            </tr>
          )}
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
