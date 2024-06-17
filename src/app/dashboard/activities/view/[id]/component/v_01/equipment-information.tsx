import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { IEquipmentInformation } from '../../interface/v_01'

interface EquipmentInformationProps {
  equipment_information: IEquipmentInformation
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const EquipmentInformation = ({
  equipment_information,
  id,
  method_name,
  report_status,
  report_messages,
}: EquipmentInformationProps) => {

  const balance = {
    1: 'g',
    2: 'g',
    3: 'kg',
  }

  const thermometer = {
    1: 'Accumac'
  }

  const volumetric_container = {
    1: 'ml',
    2: 'L'
  }

  const neck_diameter = {
    1: '5 mm',
    2: '10 mm',
    3: '20 mm',
    4: '30 mm'
  }

  const material = {
    1: 'Vidrio borosilicato 3.3',
    2: 'Vidrio borosilicato 5.0',
    3: 'Vidrio soda Lime',
    4: 'Plastico propileno',
    5: 'Plastico',
    6: 'Acero Inoxidable 304',
    7: 'Acero Inoxidable 316',
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Item title="Dispositivo" value={equipment_information?.device} />
        <Item title="Marca/Fabricante" value={equipment_information?.maker} />
        <Item
          title="Número de serie"
          value={equipment_information?.serial_number}
        />
        <Item
          title="Unidad"
          value={equipment_information?.unit?.toString()}
        />
        <Item
          title="Cap.nominal/alcance"
          value={equipment_information?.nominal_range?.toString()}
        />
        <Item
          title="División de escala"
          value={equipment_information?.scale_division?.toString()}
        />
        <Item title="Código" value={equipment_information?.code} />

        <Item
          title="Balanza"
          value={
            balance[Number(equipment_information?.balance) as keyof typeof balance]
          }
        />
        <Item
          title="Termómetro"
          value={
            thermometer[
            Number(equipment_information?.thermometer) as keyof typeof thermometer
            ]
          }
        />
        <Item
          title="Contenedor volumétrico"
          value={
            volumetric_container[
            Number(equipment_information?.volumetric_container) as keyof typeof volumetric_container
            ]
          }
        />
        <Item
          title="Diámetro del cuello (mm)"
          value={
            neck_diameter[
            Number(equipment_information?.neck_diameter) as keyof typeof neck_diameter
            ]
          }
        />
      </div>

      <ReportMethodActivity
        method_name={method_name}
        zone={'Información del equipo'}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
    </div>
  )
}

interface Props {
  title: string
  value: string
}
export const Item = ({ title, value }: Props) => {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <span className="text-sm font-semibold text-gray-800">
        {value || '---'}
      </span>
    </div>
  )
}
