import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import type { IEquipmentInformation } from '../../interface/b_01'

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
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Item title="Dispositivo" value={equipment_information?.device} />
        <Item title="Marca" value={equipment_information?.maker} />
        <Item
          title="Número de serie"
          value={equipment_information?.serial_number}
        />
        <Item
          title="Rango de medición"
          value={equipment_information?.measurement_range}
        />
        <Item
          title="Resolución"
          value={equipment_information?.resolution}
        />
        <Item
          title="Modelo"
          value={equipment_information?.model}
        />
        <Item
          title="Código"
          value={equipment_information?.code}
        />
        <Item title="Unidad de medida" value={equipment_information?.unit} />
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
