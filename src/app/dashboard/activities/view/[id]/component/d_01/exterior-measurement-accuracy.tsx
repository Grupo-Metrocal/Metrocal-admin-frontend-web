import { ReportMethodActivity } from "@/components/ReportMethodActivity";
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
      <div className="grid grid-cols-2 gap-4 p-4">
        {exterior_measurement_accuracy.measure.map((item, index) => (
          <div key={index} className="p-2 col-span-2">
            <div className="font-semibold">Medición {index + 1}</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Valores Nominales del Patrón:</div>
                {item.nominal_patron_value.map((value, i) => (
                  <Item key={i} title={`Valor ${i + 1}`} value={value} />
                ))}
              </div>
              <div>
                <div className="font-semibold">Longitudes de Verificación:</div>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(item.verification_lengths).map(([key, value]) => (
                    <Item key={key} title={key.toUpperCase()} value={String(value)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReportMethodActivity
        method_name={method_name}
        zone={"Precisión de Medición Exterior"}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
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
        {value || "---"}
      </span>
    </div>
  );
};
