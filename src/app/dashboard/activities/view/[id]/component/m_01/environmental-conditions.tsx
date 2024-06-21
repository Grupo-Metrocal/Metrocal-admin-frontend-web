import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEnvironmentalConditions } from '../../interface/m_01'

interface EnvironmentalConditionsProps {
  environmental_conditions: IEnvironmentalConditions
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const EnvironmentalConditions = ({
  environmental_conditions,
  id,
  method_name,
  report_status,
  report_messages,
}: EnvironmentalConditionsProps) => {
  return (
    <div className="flex flex-col space-y-4 ">
      <div className="flex flex-col space-y-4 gap-4 h-[70vh] overflow-auto">
        {environmental_conditions?.points?.map((point, index) => {
          return (
            <table key={index}>
              <thead>
                <tr className="bg-gray-200">
                  <th>Punto {point.point_number}</th>
                  <th className="border px-4 py-2 text-center">Iniciales</th>
                  <th className="border px-4 py-2 text-center">Finales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    <p>Temperatura ºC</p>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {point.temperature.initial}

                  </td>
                  <td className="border px-4 py-2 text-center">
                    {point.temperature.final}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    <p>Humedad Relativa %</p>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {point.humidity.initial}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {point.humidity.final}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    <p>Presión hPa</p>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {point.presion.initial}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {point.presion.final}
                  </td>
                </tr>
              </tbody>
            </table>
          )
        })}
      </div>

      <ReportMethodActivity
        method_name={method_name}
        zone={'Condiciones ambientales'}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
    </div>
  )
}
