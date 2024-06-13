import { TabsNavigations } from '@/components/Tabs'
import { IEnvironmentalConditions, IEquipmentInformation } from '../../interface/b_01'
import { EquipmentInformation } from './equipment-information'
import { EnvironmentalConditions } from './enviromental-condition'

interface Props {
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const B_01 = ({
  equipment_information,
  environmental_conditions,
  id,
  method_name,
  report_status,
  report_messages,
}: Props) => {
  return (
    <TabsNavigations
      items={[
        {
          value: 'equipment_information',
          label: 'Información del equipo',
          Component: () => (
            <EquipmentInformation
              equipment_information={equipment_information}
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
            />
          ),
        }, {
          value: 'environmental_conditions',
          label: 'Condiciones ambientales',
          Component: () => (
            <EnvironmentalConditions
              environmental_conditions={environmental_conditions}
              id={id}
              method_name={method_name}
              report_messages={report_messages}
              report_status={report_status}
            />
          ),
        },
      ]}
    />
  )
}
