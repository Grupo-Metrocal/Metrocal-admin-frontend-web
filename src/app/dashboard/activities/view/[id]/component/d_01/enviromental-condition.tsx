import { ReportMethodActivity } from "@/components/ReportMethodActivity"
import { IEnvironmentalConditions } from "../../interface/d_01"

interface EnvironmentalConditionsProps {
    environmental_conditions: IEnvironmentalConditions
    id: number
    method_name: string
    report_status: boolean
    report_messages: string[]
}


export const EnvironmentalConditions = ({
    environmental_conditions,
    id,
    method_name,
    report_status,
    report_messages,
}: EnvironmentalConditionsProps) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="environmental-conditions grid grid-row-1 p-4 gap-2">
                <div className="rid grid-cols-4 border text-center p-2 font-semibold">
                    <div>
                        <span>Equipos utilizados</span>
                    </div>
                    <div className="flex flex-col col-span-2 border">
                        <span>{environmental_conditions.equipment_used} </span>
                    </div>
                    <div>
                        <span>Tiempo</span>
                    </div>
                    <div className="flex flex-col border">
                        <span>{environmental_conditions.time} </span>
                    </div>
                    <div>
                        <span>Lugar de estabilizacion</span>
                    </div>
                    <div className="flex flex-col border">
                        <span>{environmental_conditions.stabilization_site} </span>
                    </div>
                    <div>
                        <span>T. A. (ºC):</span>
                    </div>
                    <div className="flex flex-col border">
                        <span>Iniciales</span><span>{environmental_conditions.cycles.ta.initial} </span>
                        <span>Finales</span><span>{environmental_conditions.cycles.ta.final} </span>
                    </div>
                    <div>
                        <span>Humedad (hPa):</span>
                    </div>
                    <div className="flex flex-col border">
                        <span>Iniciales</span><span>{environmental_conditions.cycles.hr.initial} </span>
                        <span>Finales</span><span>{environmental_conditions.cycles.hr.final} </span>
                    </div>
                </div>
        </div>
        <ReportMethodActivity
            method_name={method_name}
            zone={'Condiciones ambientales'}
            method_id={id}
            report_messages={report_messages}
            report_status={report_status}
        />
    </div>
    )
}