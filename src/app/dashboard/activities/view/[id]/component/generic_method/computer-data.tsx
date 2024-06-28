import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IComputerData } from '../../interface/generic_method'

interface ComputerDataProps {
  computer_data: IComputerData
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const ComputerData = ({
  computer_data,
  id,
  method_name,
  report_status,
  report_messages,
}: ComputerDataProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Item
          title="Unidad de medida"
          value={computer_data?.unit_of_measurement}
        />
        <Item title="Unidad de escala" value={computer_data?.scale_unit} />
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
