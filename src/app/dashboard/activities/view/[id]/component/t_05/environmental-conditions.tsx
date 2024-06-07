import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEnvironmentalConditions } from '../../interface/t_05'

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
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Punto calibrados</th>
            <th className="border px-4 py-2">Temperatura (ºC) Inicial</th>
            <th className="border px-4 py-2">Temperatura (ºC) Final</th>
            <th className="border px-4 py-2">Humedad (%) Inicial</th>
            <th className="border px-4 py-2">Humedad (%) Final</th>
            {/* <th className="border px-4 py-2">Equipo utilizado</th> */}
          </tr>
        </thead>
        <tbody>
          {environmental_conditions?.points?.map((point) => (
            <tr key={point.point_number} className="text-center">
              <td className="border px-4 py-2">
                Punto{' '}
                {point.point_number === -1 ? '1 final' : point.point_number}
              </td>
              <td className="border px-4 py-2">{point.temperature.initial}</td>
              <td className="border px-4 py-2">{point.temperature.final}</td>
              <td className="border px-4 py-2">{point.humidity.initial}</td>
              <td className="border px-4 py-2">{point.humidity.final}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
