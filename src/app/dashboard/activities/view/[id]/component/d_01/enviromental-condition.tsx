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
              {}
        </div>
        </div>
    )
}