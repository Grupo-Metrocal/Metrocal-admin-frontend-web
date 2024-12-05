'use client'
import { fetchData } from '@/utils/fetch'
import { IGeneric_method } from '../../../[id]/interface/generic_method'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { Content } from '@/components/Content'
import { TabsNavigations } from '@/components/Tabs'
import { EquipmentInformation } from './component/equipment_information'
import { EnvironmentalConditions } from './component/environmental_conditions'
import { ResultMedition } from './component/result_medition'
import { ComputerData } from './component/computer_data'
import { useSearchParams } from 'next/navigation'
import { DescriptionPattern } from './component/description_pattern'

export const Generic_method = ({
  equipment,
  activity_id,
  equipment_id
}: {
  equipment: IGeneric_method
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
            value: 'computer_data',
            label: 'Datos de la computadora',
            Component: () => (
              <ComputerData
                computerData={equipment.computer_data}
                handleSaveInformation={handleSaveInformation}
              />)
          },
          {
            value: 'result_medition',
            label: 'Medición de resultados',
            Component: () => (
              <ResultMedition
                result_medition={equipment.result_medition}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'description_pattern',
            label: 'Descripcion de patrones',
            Component: () => (
              <DescriptionPattern
                description_pattern={equipment.description_pattern}
                handleSaveInformation={handleSaveInformation}
                equipment_id={equipment_id}
              />
            ),
          },
        ]}
      />
    </Content>
  )
}
