import { IExteriorParallelismMeasurement } from "../../interface/d_01";

interface ExteriorParallelismMeasurementProps {
    exteriorMeasurementMeasurement: IExteriorParallelismMeasurement;
    id: number;
    method_name: string;
    report_status: boolean;
    report_messages: string[];
}

export const ExteriorParallelismMeasurement = ({
    exteriorMeasurementMeasurement,
    id,
    method_name,
    report_status,
    report_messages,
}: ExteriorParallelismMeasurementProps) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="exterior-measurement-measurement grid grid-row-1 p-4 gap-2">
                <div className="text-center font-semibold flex">
                    <Item title="ID" value={String(id)} />
                    <Item title="Method Name" value={method_name} />
                    <Item title="Report Status" value={report_status ? "Completed" : "Pending"} />
                    <Item title="Messages" value="" />
                </div>
                <div className="col-span-4 p-2">
                    {report_messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {exteriorMeasurementMeasurement.measurements.map((item, index) => (
                        <div key={index} className="border p-2">
                            <div className="font-semibold">Measurement {index + 1}</div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <div className="font-semibold">Numero de Puntos:</div>
                                    <Item title="Numero de Punto" value={item.point_number.join(',')} />
                                </div>
                                <div>
                                    <div className="font-semibold">Verification Lengths:</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <div className="font-semibold">Exteriors:</div>
                                            <Item title="X1" value={String(item.verification_lengths.Exterior.x1)} />
                                            <Item title="X2" value={String(item.verification_lengths.Exterior.x2)} />
                                            <Item title="X3" value={String(item.verification_lengths.Exterior.x3)} />
                                            <Item title="X4" value={String(item.verification_lengths.Exterior.x4)} />
                                            <Item title="X5" value={String(item.verification_lengths.Exterior.x5)} />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Interiors:</div>
                                            <Item title="X1" value={String(item.verification_lengths.Interior.x1)} />
                                            <Item title="X2" value={String(item.verification_lengths.Interior.x2)} />
                                            <Item title="X3" value={String(item.verification_lengths.Interior.x3)} />
                                            <Item title="X4" value={String(item.verification_lengths.Interior.x4)} />
                                            <Item title="X5" value={String(item.verification_lengths.Interior.x5)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface Props {
    title: string;
    value: string;
}

export const Item = ({ title, value }: Props) => {
    return (
        <div className="p-2">
            <p className="text-sm font-semibold text-gray-500">{title}</p>
            <span className="text-sm font-semibold text-gray-800">
                {value || '---'}
            </span>
        </div>
    );
};
