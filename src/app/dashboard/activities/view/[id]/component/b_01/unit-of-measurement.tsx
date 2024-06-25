import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IUnitOfMeasurement } from '../../interface/b_01'

interface IUnitOfMeasurementProps {
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
  unit_of_measurement: IUnitOfMeasurement
}

export const UnitOfMeasurement = ({
  id,
  method_name,
  report_status,
  report_messages,
  unit_of_measurement,
}: IUnitOfMeasurementProps) => {
  return ( 
  <div className="flex flex-col space-y-4">
    <div className='grid grid-cols-2 gap-4'>
        <Item title='Medidas' value={unit_of_measurement?.measure} />
        <Item title='Resolución' value={unit_of_measurement?.resolution ?? 0}/>
    </div>
    <ReportMethodActivity
        method_name={method_name}
        zone={'Unidad de medida'}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
  </div>
  )
}

interface Props {
  title: string
  value: string | number
}

const Item = ({ title, value }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-semibold text-gray-500">{title}</p>
      <p className="text-gray-800">{value}</p>
    </div>

  )
}
