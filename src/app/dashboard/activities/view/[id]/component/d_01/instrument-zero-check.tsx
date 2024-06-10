import { IInstrumentzerocheck } from "../../interface/d_01"

interface InstrumentZeroCheckProps {
    instrumentzerocheck: IInstrumentzerocheck
    id: number
    method_name: string
    report_status: boolean
    report_messages: string[]
    }

export const InstrumentalZeroCheck = ({
    instrumentzerocheck,
    id,
    method_name,
    report_status,
    report_messages,
}: InstrumentZeroCheckProps) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="instrument-zero-check grid grid-row-1 p-4 gap-2">
                <div className="grid grid-cols-4 border text-center p-2 font-semibold">
                    <div>ID: {id}</div>
                    <div>Method Name: {method_name}</div>
                    <div>Report Status: {report_status ? "Completed" : "Pending"}</div>
                    <div>Messages:</div>
                </div>
                <div className="col-span-4 p-2">
                    {report_messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div className="border p-2">
                    <div className="font-semibold">Nominal Value</div>
                    <div className="grid grid-cols-2 gap-2">
                        {instrumentzerocheck.nominal_value.map((value, index) => (
                            <div key={index}>{value}</div>
                        ))}
                    </div>
                </div>
                <div className="border p-2">
                    <div className="font-semibold">Verification Lengths</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="font-semibold">Exteriors</div>
                            {Object.entries(instrumentzerocheck.verification_lengths.Exteriors).map(([key, value]) => (
                                <div key={key}>{`${key}: ${value}`}</div>
                            ))}
                        </div>
                        <div>
                            <div className="font-semibold">Interiors</div>
                            {Object.entries(instrumentzerocheck.verification_lengths.Interiors).map(([key, value]) => (
                                <div key={key}>{`${key}: ${value}`}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}