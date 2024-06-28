import { TabsNavigations } from '@/components/Tabs'
import {
  IComputerData,
  IEnvironmentalConditions,
  IEquipmentInformation,
  IResultMedition,
} from '../../interface/generic_method'
import { EquipmentInformation } from './equipment-information'
import { EnvironmentalConditions } from './environmental-conditions'
import { ComputerData } from './computer-data'

interface Props {
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  computer_data: IComputerData
  result_medition: IResultMedition
}

export const Generic_method = ({
  id,
  method_name,
  report_status,
  report_messages,
  equipment_information,
  environmental_conditions,
  computer_data,
  result_medition,
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
        },
        {
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
        {
          value: 'computer_data',
          label: 'Datos de la computadora',
          Component: () => (
            <ComputerData
              computer_data={computer_data}
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
