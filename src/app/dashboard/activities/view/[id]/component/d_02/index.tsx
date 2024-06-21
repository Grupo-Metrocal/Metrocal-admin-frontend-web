import { TabsNavigations } from '@/components/Tabs'
import {
  IEquipmentInformation,
  IEnvironmentalConditions,
  IDescriptionPattern,
  IPreinstallationcomment,
  IInstrumentzerocheck,
  IAccuracyTest,
} from '../../interface/d_02'
import { EquipmentInformation } from './equipment-information'
import { EnvironmentalConditions } from './environmental-conditions'
import { DescriptionPattern } from './description-pattern'
import { PreinstallationComment } from './pre-installation-comment'
import { InstrumentalZeroCheck } from './instrument-zero-check'
import { AccuracyTest } from './accuracy-test'

interface Props {
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  description_pattern: IDescriptionPattern
  pre_installation_comment: IPreinstallationcomment
  instrument_zero_check: IInstrumentzerocheck
  accuracy_test: IAccuracyTest
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const D_02 = ({
  equipment_information,
  environmental_conditions,
  description_pattern,
  pre_installation_comment,
  instrument_zero_check,
  accuracy_test,
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
        },      {
          value: 'pre_installation_comment',
          label: 'Comentario pre-instalación',
          Component: () => (
            <PreinstallationComment
            pre_installation_comment={pre_installation_comment}
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
            />
          ),
        }, {
          value: 'instrument_zero_check',
          label: 'Verificación de cero del instrumento',
          Component: () => (
            <InstrumentalZeroCheck
            instrument_zero_check={instrument_zero_check}
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
            />
          ),
        },{
          value: 'accuracy_test',
          label: 'Prueba de precisión',
          Component: () => (
            <AccuracyTest
            accuracy_test={accuracy_test}
              id={id}
              method_name={method_name}
              report_status={report_status}
              report_messages={report_messages}
            />
          ),
        },
      ]}
    />
  )
}
