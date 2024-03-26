'use client'
import { TabsNavigations } from '@/components/Tabs'
import { IP_01 } from '../../../[id]/interface/p_01'
import { EquipmentInformation } from './component/equipment_information'
import { Content } from '@/components/Content'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'

export const P_01 = ({ equipment }: { equipment: IP_01 }) => {
  const handleSaveInformation = async (values: any, url: string) => {
    toast.loading('Guardando información')
    const response = await fetchData({
      url: `${url + equipment.id}`,
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Información guardada correctamente')
    } else {
      toast.error('No se ha podido guardar la información')
    }
  }

  return (
    <Content title="Al guardar cada informacion modificada aumentara en 1 el contador de modificaciones">
      <TabsNavigations
        items={[
          {
            value: 'equipment_information',
            label: 'Información del equipo',
            Component: () => (
              <EquipmentInformation
                equipment={equipment.equipment_information}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
        ]}
      />
    </Content>
  )
}

/**
 * import { TabsNavigations } from '@/components/Tabs'


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

 */
