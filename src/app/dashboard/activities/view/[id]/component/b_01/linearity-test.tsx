import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { ILinearityTest } from '../../interface/b_01'

interface ILinearityTestProps {
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
  linearity_test: ILinearityTest
}

export const LinearityTest = ({
  id,
  method_name,
  report_status,
  report_messages,
  linearity_test,
}: ILinearityTestProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-auto">
        {linearity_test?.linearity_test ? (
          linearity_test.linearity_test.map((point, index) => {
            return (
              <div key={index} className="grid grid-cols-2 gap-4">
                <Item title="Punto" value={point?.point ?? ''} />
                <Item
                  title="Composición de puntos"
                  value={point?.pointsComposition.join(' , ') ?? ''}
                />
                <Item title="Indicación IL" value={point?.indicationIL ?? ''} />
                <Item
                  title="Indicación sin carga"
                  value={point?.noLoadInfdication ?? ''}
                />
              </div>
            )
          })
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Item title="Punto" value={0} />
            <Item title="Composición de puntos" value="---" />
            <Item title="Indicación IL" value={0} />
            <Item title="Indicación sin carga" value={0} />
          </div>
        )}
      </div>
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
