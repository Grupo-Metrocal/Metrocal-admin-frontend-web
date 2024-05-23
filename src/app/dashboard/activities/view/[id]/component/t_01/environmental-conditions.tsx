import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEnvironmentalConditions } from '../../interface/t_01'

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
            <th className="border px-4 py-2">H R (%) Inicial</th>
            <th className="border px-4 py-2">H R (%) Final</th>
            <th className="border px-4 py-2">T. A. (ºC) Inicial</th>
            <th className="border px-4 py-2">T. A. (ºC) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">P. A.(hPa) Inicial</th>
            <th className="border px-4 py-2">P. A.(hPa) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">T. Estabilización (min)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.ta.hrp.initial}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.ta.hrp.final}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.ta.tac.initial}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.ta.tac.final}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.ta.equipment}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.hpa.pa.initial}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.hpa.pa.final}</span>
            </td>
            <td className="border px-4 py-2">
              <span>{environmental_conditions.environment.hpa.equipment}</span>
            </td>
            <td className="border px-4 py-2">
              <span>
                {environmental_conditions.environment.hpa.stabilization_time}
              </span>
            </td>
          </tr>
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
