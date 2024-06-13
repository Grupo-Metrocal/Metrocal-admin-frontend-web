import { IAccuracyTest } from '../../interface/d_02'

interface AccuracyTestProps {
  accuracy_test: IAccuracyTest
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const AccuracyTest = ({
  accuracy_test,
  id,
  method_name,
  report_status,
  report_messages,
}: AccuracyTestProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-gray-100 rounded-lg">
        <div className="flex justify-center my-1">
          <Item title="ID" value={String(id)} />
          <Item title="Method Name" value={method_name} />
          <Item
            title="Report Status"
            value={report_status ? 'Completed' : 'Pending'}
          />
          <Item title="Messages" value="" />
        </div>
        <div className="col-span-4 p-2">
          {report_messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {accuracy_test.measureD02.map((measure, index) => (
            <div key={index} className="border p-2">
              <div className="font-semibold">Measurement {index + 1}</div>
              <div>
                <div className="font-semibold">Nominal Value:</div>
                {measure.nominal_value.map((value, i) => (
                  <Item key={i} title={`Value ${i + 1}`} value={value} />
                ))}
              </div>
              <div>
                <div className="font-semibold">Verification Lengths:</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(measure.varification_lengths).map(
                    ([key, value]) => (
                      <Item key={key} title={key} value={String(value)} />
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface Props {
  title: string
  value: string
}

export const Item = ({ title, value }: Props) => {
  return (
    <div className="p-2">
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <span className="text-sm font-semibold text-gray-800">
        {value || '---'}
      </span>
    </div>
  )
}
