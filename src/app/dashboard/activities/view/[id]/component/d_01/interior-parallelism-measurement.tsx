import { ReportMethodActivity } from "@/components/ReportMethodActivity";
import { IInterior_parallelism_measurement } from "../../interface/d_01";

interface InteriorParallelismMeasurementProps {
  interior_parallelism_measurement: IInterior_parallelism_measurement;
  id: number;
  method_name: string;
  report_status: boolean;
  report_messages: string[];
}

export const InteriorParallelismMeasurement = ({
  interior_parallelism_measurement,
  id,
  method_name,
  report_status,
  report_messages,
}: InteriorParallelismMeasurementProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="interior-parallelism-measurement grid grid-row-1 p-4 gap-2 maxh-[70vh] overflow-auto">
        {/* <div className="grid grid-cols-4 border text-center p-2 font-semibold">
          <Item title="ID" value={String(id)} />
          <Item title="Method Name" value={method_name} />
          <Item title="Report Status" value={report_status ? "Completed" : "Pending"} />
          <Item title="Messages" value="" />
        </div>
        <div className="col-span-4 p-2">
          {report_messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div> */}
        <div className="grid grid-cols-2 gap-2">
          {interior_parallelism_measurement?.measurementsd01.map((item, index) => (
            <div key={index} className="border p-2">
              <div className="font-semibold">Medición {index + 1}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="font-semibold">Valor nominal:</div>
                  <div>{item.point_number[0]}</div>
                </div>
                <div>
                  <div className="font-semibold">Verificación de longitud:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="font-semibold">Exteriores:</div>
                      <Item title="X1" value={String(item?.verification_lengths.Exterior.x1)} />
                      <Item title="X2" value={String(item?.verification_lengths.Exterior.x2)} />
                      <Item title="X3" value={String(item?.verification_lengths.Exterior.x3)} />
                      <Item title="X4" value={String(item?.verification_lengths.Exterior.x4)} />
                      <Item title="X5" value={String(item?.verification_lengths.Exterior.x5)} />
                    </div>
                    <div>
                      <div className="font-semibold">Interiores:</div>
                      <Item title="X1" value={String(item?.verification_lengths.Interior.x1)} />
                      <Item title="X2" value={String(item?.verification_lengths.Interior.x2)} />
                      <Item title="X3" value={String(item?.verification_lengths.Interior.x3)} />
                      <Item title="X4" value={String(item?.verification_lengths.Interior.x4)} />
                      <Item title="X5" value={String(item?.verification_lengths.Interior.x5)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReportMethodActivity
        method_name={method_name}
        zone={'Medición de paralelismo interior'}
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
        {value || '---'}
      </span>
    </div>
  );
};
