import { TabsNavigations } from '@/components/Tabs'
import {
  IDescriptionPattern,
  IEccentricityTest,
  IEnvironmentalConditions,
  IEquipmentInformation,
  ILinearityTest,
  IRepeatabilityTest,
} from '../../interface/b_01'
import { EquipmentInformation } from './equipment-information'
import { EnvironmentalConditions } from './enviromental-condition'
import { EccentricityTest } from './eccentricity-test'
import { LinearityTest } from './linearity-test'
import { RepeatabilityTest } from './repeatability-test'
import { DescriptionPattern } from './description-pattern'

interface Props {
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  eccentricity_test: IEccentricityTest
  linearity_test: ILinearityTest
  repeatability_test: IRepeatabilityTest
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
  description_pattern: IDescriptionPattern
}

export const B_01 = ({
  equipment_information,
  environmental_conditions,
  eccentricity_test,
  linearity_test,
  repeatability_test,
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
          value: 'eccentricity_test',
          label: 'Prueba de excentricidad',
          Component: () => (
            <EccentricityTest
              eccentricity_test={eccentricity_test}
              id={id}
              method_name={method_name}
              report_messages={report_messages}
              report_status={report_status}
            />
          ),
        },
        {
          value: 'linearity_test',
          label: 'Prueba de linealidad',
          Component: () => (
            <LinearityTest
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
              linearity_test={linearity_test}
            />
          ),
        },
        {
          value: 'repeatability_test',
          label: 'Prueba de repetibilidad',
          Component: () => (
            <RepeatabilityTest
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
              repeatability_test={repeatability_test}
            />
          ),
        },
        {
          value: 'description_pattern',
          label: 'Descripcion de patrones',
          Component: () => (
            <DescriptionPattern
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
              description_pattern={description_pattern}
            />
          ),
        },
      ]}
    />
  )
}
