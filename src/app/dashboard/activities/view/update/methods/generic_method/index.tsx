'use client'
import { fetchData } from '@/utils/fetch'
import { IGeneric_method } from '../../../[id]/interface/generic_method'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { Content } from '@/components/Content'
import { TabsNavigations } from '@/components/Tabs'
import { EquipmentInformation } from './component/equipment_information'
import { EnvironmentalConditions } from './component/environmental_conditions'

export const Generic_method = ({
  equipment,
  activity_id,
}: {
  equipment: IGeneric_method
  activity_id: string
}) => {
  const handleSaveInformation = async (
    values: any,
    url: string,
    useActivityID?: boolean,
  ) => {
    toast.loading('Guardando información')

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
            value: 'environmental_conditions',
            label: 'Condiciones ambientales',
            Component: () => (
              <EnvironmentalConditions
                environmentalConditions={equipment.environmental_conditions}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
        ]}
      />
    </Content>
  )
}
