import { TabsNavigations } from "@/components/Tabs"
import { IEnvironmentalConditions, IEquipmentInformation, IExteriorParallelismMeasurement, IExterior_measurement_accuracy, IInstrumentzerocheck, IPreinstallationcomment } from "../../interface/d_01"
import { EquipmentInformation } from "./equipment-information"
import { EnvironmentalConditions } from "./enviromental-condition"
import { ExteriorMeasurementAccuracy } from "./exterior-measurement-accuracy"
import { InteriorParallelismMeasurement } from "./interior-parallelism-measurement"
import { ExteriorParallelismMeasurement } from "./exterior-measurement-measurement"
import { InstrumentalZeroCheck } from "./instrument-zero-check"
import { PreinstallationComment } from "./pre-installation-comment"

interface Props {
   environmental_conditions: IEnvironmentalConditions
   equipment_information: IEquipmentInformation
   exterior_measurement_accuracy: IExterior_measurement_accuracy
   exterior_parallelism_measurement: IExteriorParallelismMeasurement
   interior_parallelism_measurement: IExteriorParallelismMeasurement
   instrumenzerocheck: IInstrumentzerocheck
   preinstallationcomment: IPreinstallationcomment
   id: number
    method_name: string
    report_status: boolean
    report_messages: string[]
}

export const D_01 = ({
    environmental_conditions,
    equipment_information,
    exterior_measurement_accuracy,
    exterior_parallelism_measurement,
    interior_parallelism_measurement,
    instrumenzerocheck,
    preinstallationcomment,
    id,
    method_name,
    report_status,
    report_messages,
    }: Props) => {
    return (
        <TabsNavigations
            items={[
                {
                value: 'equipment_information',
                label: 'Información del equipo',
                Component: () => (
                    <EquipmentInformation
                        equipment_information={equipment_information}
                        id={id}
                        method_name={method_name}
                        report_status={report_status}
                        report_messages={report_messages}
                    />
                ),
                },
                {
                value: 'environmental_conditions',
                label: 'Condiciones ambientales',
                Component: () => (
                    <EnvironmentalConditions
                        environmental_conditions={environmental_conditions}
                        id={id}
                        method_name={method_name}
                        report_messages={report_messages}
                        report_status={report_status}
                    />
                ),
                },
                {
                value: 'exterior_measurement_accuracy',
                label: 'Exactitud de medición exterior',
                Component: () => (
                    <ExteriorMeasurementAccuracy
                        exterior_measurement_accuracy={exterior_measurement_accuracy}
                        id={id}
                        method_name={method_name}
                        report_status={report_status}
                        report_messages={report_messages}
                    />
                ),
                },
                {
                value: 'interior_parallelism_measurement',
                label: 'Medición de paralelismo interior',
                Component: () => (
                    <InteriorParallelismMeasurement
                    interior_parallelism_measurement={interior_parallelism_measurement}
                    id={id}
                    method_name={method_name}
                    report_status={report_status}
                    report_messages={report_messages}
                    />
                ),
                },
                {
                value: 'exterior_parallelism_measurement',
                label: 'Medición de paralelismo exterior',
                Component: () => (
                    <ExteriorParallelismMeasurement
                        exteriorMeasurementMeasurement={exterior_parallelism_measurement}
                        id={id}
                        method_name={method_name}
                        report_status={report_status}
                        report_messages={report_messages}
                    />
                ),
                },
                {
                value: 'instrument_zero_check',
                label: 'Verificación de cero del instrumento',
                Component: () => (
                    <InstrumentalZeroCheck
                        instrumentzerocheck={instrumenzerocheck}
                        id={id}
                        method_name={method_name}
                        report_status={report_status}
                        report_messages={report_messages}
                    />
                ),
                },
                {
                value: 'pre_installation_comment',
                label: 'Comentario pre-instalación',
                Component: () => (
                    <PreinstallationComment
                        preinstallationcomment={preinstallationcomment}
                        id={id}
                        method_name={method_name}
                        report_status={report_status}
                        report_messages={report_messages}
                    />
                ),
                },
            ]}
        />
    )
}
