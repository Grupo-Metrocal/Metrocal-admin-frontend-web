import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IEccentricityTest } from '../../interface/b_01'

interface EccentricityTestProps {
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
  eccentricity_test: IEccentricityTest
}

export const EccentricityTest = ({
  id,
  method_name,
  report_status,
  report_messages,
  eccentricity_test,
}: EccentricityTestProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Item
          title="Número de punto"
          value={eccentricity_test?.pointNumber ?? 0}
        />
      </div>
      {eccentricity_test?.eccentricity_test ? (
        eccentricity_test.eccentricity_test.map((point, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Item title="Indicación IL" value={point?.indicationIL ?? 0} />
            <Item
              title="Indicación sin carga"
              value={point?.noLoadInfdication ?? 0}
            />
          </div>
        ))
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Item title="Indicación IL" value={0} />
          <Item title="Indicación sin carga" value={0} />
        </div>
      )}

      <ReportMethodActivity
        method_name={method_name}
        zone={'Prueba de excentricidad'}
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
      <h4 className="font-semibold text-sm text-gray-500">{title}</h4>
      <p className="text-sm">{value || '---'}</p>
    </div>
  )
}
