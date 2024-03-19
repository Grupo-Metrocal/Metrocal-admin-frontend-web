import { TabsNavigations } from '@/components/Tabs'
import {
  IEquipmentInformation,
  IEnvironmentalConditions,
  IDescriptionPattern,
  ICalibrationResults,
} from '../../interface/p_01'
import { EquipmentInformation } from './equipment-information'
import { CalibrationResults } from './calibration-result'
import { EnvironmentalConditions } from './environmental-conditions'
import { DescriptionPattern } from './description-pattern'

interface Props {
  equipment_information: IEquipmentInformation
  calibration_results: ICalibrationResults
  environmental_conditions: IEnvironmentalConditions
  description_pattern: IDescriptionPattern
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const P_01 = ({
  equipment_information,
  calibration_results,
  environmental_conditions,
  description_pattern,
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
          value: 'calibration_results',
          label: 'Resultados de calibración',
          Component: () => (
            <CalibrationResults
              calibration_results={calibration_results}
              id={id}
              method_name={method_name}
              report_messages={report_messages}
              report_status={report_status}
            />
          ),
        },
        {
          value: 'description_pattern',
          label: 'Descripción de patrones',
          Component: () => (
            <DescriptionPattern
              description_pattern={description_pattern}
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
