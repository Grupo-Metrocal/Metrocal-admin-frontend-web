import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEnvironmentalConditions } from '../../interface/t_03'
import { Item } from './equipment-information'

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
          title="Temperatura"
          value={environmental_conditions?.temperature + ' ºC' || ''}
        />

        <Item
          title="Humedad"
          value={environmental_conditions?.humidity + ' %' || ''}
        />

        <Item
          title="Patron utilizado"
          value={environmental_conditions?.pattern + '' || ''}
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
