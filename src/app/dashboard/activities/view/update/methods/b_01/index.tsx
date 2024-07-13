'use client'
import { toast } from 'sonner'
import { IB_01 } from '../../../[id]/interface/b_01'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { TabsNavigations } from '@/components/Tabs'
import { Content } from '@/components/Content'
import { EquipmentInformation } from './component/equipment_information'
import { EnvironmentalConditions } from './component/environmental_conditions'
import { LinearityTest } from './component/linearity_test'
import { EccentricityTest } from './component/eccentricity_test'
import { RepeatabilityTest } from './component/repeatability_test'
import { useSearchParams } from 'next/navigation'

export const B_01 = ({
  equipment,
  activity_id,
}: {
  equipment: IB_01
  activity_id: string
}) => {

  const searchParams = useSearchParams()

  const handleSaveInformation = async (
    values: any,
    url: string,
    useActivityID?: boolean,
  ) => {
    toast.loading('Guardando información')
    const increase = searchParams.get('increase') === 'true' ? true : false


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
        increase,
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
            value: 'enviromental_condition',
            label: 'Condiciones ambientales',
            Component: () => (
              <EnvironmentalConditions
                environmentalConditions={equipment.environmental_conditions}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'linearity_test',
            label: 'Prueba de linealidad',
            Component: () => (
              <LinearityTest
                linearityTest={equipment.linearity_test}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'eccentricity_test',
            label: 'Prueba de excentricidad',
            Component: () => (
              <EccentricityTest
                eccentricityTest={equipment.eccentricity_test}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'repeatability_test',
            label: 'Prueba de repetibilidad',
            Component: () => (
              <RepeatabilityTest
                repeatabilityTest={equipment.repeatability_test}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
        ]}
      />
    </Content>
  )
}
