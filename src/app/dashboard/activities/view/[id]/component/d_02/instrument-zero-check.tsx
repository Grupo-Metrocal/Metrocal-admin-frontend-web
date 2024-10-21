import { IInstrumentzerocheck } from '../../interface/d_02'

interface InstrumentZeroCheckProps {
  instrument_zero_check: IInstrumentzerocheck
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}

export const InstrumentalZeroCheck = ({
  instrument_zero_check,
  id,
  method_name,
  report_status,
  report_messages,
}: InstrumentZeroCheckProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="instrument-zero-check grid grid-row-1 p-4 gap-2 bg-gray-100 rounded-lg">
        {/* <div className="grid grid-cols-4 text-center font-semibold">
          <Item title="ID" value={String(id)} />
          <Item title="Method Name" value={method_name} />
          <Item
            title="Report Status"
            value={report_status ? 'Completed' : 'Pending'}
          />
          <Item title="Messages" value="" />
        </div> */}
        <div className="col-span-4 p-2">
          {report_messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <Item
              title="Valor Nominal"
              value={String(instrument_zero_check?.nominal_value ?? 0)}
            />
          </div>
          <div className="col-span-1 flex">
            <Item title="X1" value={String(instrument_zero_check?.x1 ?? 0)} />
            <Item title="X2" value={String(instrument_zero_check?.x2 ?? 0)} />
            <Item title="X3" value={String(instrument_zero_check?.x3 ?? 0)} />
            <Item title="X4" value={String(instrument_zero_check?.x4 ?? 0)} />
            <Item title="X5" value={String(instrument_zero_check?.x5 ?? 0)} />
            <Item title="X6" value={String(instrument_zero_check?.x6 ?? 0)} />
            <Item title="X7" value={String(instrument_zero_check?.x7 ?? 0)} />
            <Item title="X8" value={String(instrument_zero_check?.x8 ?? 0)} />
            <Item title="X9" value={String(instrument_zero_check?.x9 ?? 0)} />
            <Item title="X10" value={String(instrument_zero_check?.x10 ?? 0)} />
          </div>
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
