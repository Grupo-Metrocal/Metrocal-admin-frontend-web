import { TabsNavigations } from '@/components/Tabs'
import { IP_01 } from '../../interface/p_01'
import { EquipmentInformation } from './equipment-information'
import { CalibrationResults } from './calibration-result'

export const P_01 = ({
  equipment_information,
  calibration_results,
  environmental_conditions,
  description_pattern,
  calibration_location,
}: IP_01) => {
  return (
    <TabsNavigations
      items={[
        {
          value: 'equipment_information',
          label: 'Información del equipo',
          Component: () => (
            <EquipmentInformation
              equipment_information={equipment_information}
            />
          ),
        },
        {
          value: 'calibration_results',
          label: 'Resultados de calibración',
          Component: () => (
            <CalibrationResults calibration_results={calibration_results} />
          ),
        },
      ]}
    />
  )
}
