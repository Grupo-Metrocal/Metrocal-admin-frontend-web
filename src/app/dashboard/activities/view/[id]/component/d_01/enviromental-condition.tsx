import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEnvironmentalConditions } from '../../interface/d_01'

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
          value={environmental_conditions?.equipment_used}
        />
        <Item
          title="Tiempo"
          value={`${environmental_conditions?.time.hours ?? 0} horas, ${environmental_conditions?.time.minute ?? 0} minutos`}
        />
        <Item
          title="Lugar de estabilización"
          value={environmental_conditions?.stabilization_site  ?? 0}
        />
        <Item
          title="T. A. (ºC) Iniciales"
          value={`${environmental_conditions?.cycles.ta.initial ?? 0}`}
        />
        <Item
          title="T. A. (ºC) Finales"
          value={`${environmental_conditions?.cycles.ta.end ?? 0}`}
        />
        <Item
          title="Humedad (hr) Iniciales"
          value={`${environmental_conditions?.cycles.hr.initial ?? 0}`}
        />
        <Item
          title="Humedad (hr) Finales"
          value={`${environmental_conditions?.cycles.hr.end ?? 0}`}
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
