'use client'
import { LayoutPage } from "@/components/LayoutPage";
import { useExcelEngine } from "./_hooks/useExcelEngine";
import { formatMethodName } from "@/utils/formatMethodName";
import { ItemEngine } from "../../patterns/[calibration_method]/_components/itemEngine";


interface IProps {
  params: {
    calibration_method: string
  }
}

export default function Page({ params }: IProps) {
  const { calibration_method } = params
  const { engines, deleteEngine } = useExcelEngine(calibration_method)

  return (
    <LayoutPage title={`Configuración / Motores de procesamiento de resultados / ${formatMethodName({ method: calibration_method as any })}`} subTitle="Seleccione un metodo de calibración" rollBack>
      <div className="bg-white flex flex-col gap-6 p-4 rounded">
        {engines && engines.map((engine) => (
          <ItemEngine key={engine.id} engineRef={engine} deleteEngine={deleteEngine} />
        ))}
      </div>
    </LayoutPage>
  )
}