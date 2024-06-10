import { IExterior_measurement_accuracy } from "../../interface/d_01";

interface ExteriorMeasurementAccuracyProps {
    exterior_measurement_accuracy: IExterior_measurement_accuracy;
    id: number;
    method_name: string;
    report_status: boolean;
    report_messages: string[];
}

export const ExteriorMeasurementAccuracy = ({
    exterior_measurement_accuracy,
    id,
    method_name,
    report_status,
    report_messages,
}: ExteriorMeasurementAccuracyProps) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="exterior-measurement-accuracy grid grid-row-1 p-4 gap-2">
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
                {exterior_measurement_accuracy.measure.map((item, index) => (
                    <div key={index} className="border p-2">
                        <div className="font-semibold">Measurement {index + 1}</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="font-semibold">Nominal Patron Values:</div>
                                {item.nominal_patron_value.map((value, i) => (
                                    <div key={i}>{String(value)}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
