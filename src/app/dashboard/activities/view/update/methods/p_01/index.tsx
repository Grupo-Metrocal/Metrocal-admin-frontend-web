'use client'
import { TabsNavigations } from '@/components/Tabs'
import { IP_01 } from '../../../[id]/interface/p_01'
import { Content } from '@/components/Content'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { EquipmentInformation } from './component/equipment_information'
import { DescriptionPattern } from './component/description_pattern'
import { EnvironmentalConditions } from './component/environmental_conditions'
import { CalibrationsResults } from './component/calibrations_results'
import { useSearchParams } from 'next/navigation'

export const P_01 = ({
  equipment,
  activity_id,
  equipment_id
}: {
  equipment: IP_01
  activity_id: string
  equipment_id: number
}) => {

  const searchParams = useSearchParams()

  const handleSaveInformation = async (
    values: any,
    url: string,
    useActivityID?: boolean,
  ) => {
    toast.loading('Guardando información')
    const increase = searchParams.get('increase') === 'true' ? true : false

    console.log('increase', increase)

    url = `${url}${equipment.id}`

    if (useActivityID) {
      url += `/${activity_id}`
    }

    const response = await fetchData({
      url,
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      params: {
        increase
      }
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
          {
            value: 'description_pattern',
            label: 'Descripción de patrones',
            Component: () => (
              <DescriptionPattern
                description_pattern={equipment.description_pattern}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'environmental_conditions',
            label: 'Condiciones ambientales',
            Component: () => (
              <EnvironmentalConditions
                environmentalConditions={equipment.environmental_conditions}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'calibration_results',
            label: 'Resultados de calibración',
            Component: () => (
              <CalibrationsResults
                calibrationResults={equipment.calibration_results}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
        ]}
      />
    </Content>
  )
}
