'use client'
import { toast } from 'sonner'
import { ID_02 } from '../../../[id]/interface/d_02'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { TabsNavigations } from '@/components/Tabs'
import { Content } from '@/components/Content'
import { EquipmentInformation } from './component/equipment_information'
import { EnvironmentalConditions } from './component/environmental_conditions'
import { DescriptionPattern } from './component/description_pattern'
import { PreInstallationComment } from './component/pre_installation_comment'

import { InstrumentZeroCheck } from './component/instrument_zero_check'
import { AccuracyTest } from './component/accuracy_test'

export const D_02 = ({
  equipment,
  activity_id,
}: {
  equipment: ID_02
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
            value: 'pre_installation_comment',
            label: 'Comentario pre-instalación',
            Component: () => (
              <PreInstallationComment
                preInstalacionComentario={equipment.pre_installation_comment}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'instrument_zero_check',
            label: 'Verificación de cero del instrumento',
            Component: () => (
              <InstrumentZeroCheck
                instrumentalZeroCheck={equipment.instrument_zero_check}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
          {
            value: 'accuracy_test',
            label: 'Prueba de precisión',
            Component: () => (
              <AccuracyTest
                accuracyTest={equipment.accuracy_test}
                handleSaveInformation={handleSaveInformation}
              />
            ),
          },
        ]}
      />
    </Content>
  )
}
