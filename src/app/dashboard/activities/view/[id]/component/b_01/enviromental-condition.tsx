import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEnvironmentalConditions } from '../../interface/b_01'

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
      <div className="grid grid-cols-2 gap-4">
        <Item
          title="Equipos utilizados"
          value={environmental_conditions.equipment_used}
        />
        <Item
          title="Tiempo"
          value={`${environmental_conditions.time.hours} horas, ${environmental_conditions.time.minute} minutos`}
        />
        <Item
          title="Lugar de estabilización"
          value={environmental_conditions.stabilization_site}
        />
        <Item
          title="T. A. (ºC) Iniciales"
          value={`${environmental_conditions.cycles.ta.initial}`}
        />
        <Item
          title="T. A. (ºC) Finales"
          value={`${environmental_conditions.cycles.ta.end}`}
        />
        <Item
          title="Humedad (hPa) Iniciales"
          value={`${environmental_conditions.cycles.hr.initial}`}
        />
        <Item
          title="Humedad (hPa) Finales"
          value={`${environmental_conditions.cycles.hr.end}`}
        />
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

interface Props {
  title: string
  value: string
}

export const Item = ({ title, value }: Props) => {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <span className="text-sm font-semibold text-gray-800">
        {value || '---'}
      </span>
    </div>
  )
}
