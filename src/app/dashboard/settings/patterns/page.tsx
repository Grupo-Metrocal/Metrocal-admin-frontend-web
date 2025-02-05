import { LayoutPage } from "@/components/LayoutPage";
import { CALIBRATION_METHODS } from "../constants/CalibrationMethods";
import Link from "next/link";

export default function Page() {
  return (
    <LayoutPage title="Configuración / Patrones de certificación" subTitle="Seleccione un metodo de calibración" rollBack>
      <div className="grid grid-cols-5 gap-8 pt-6">
        {
          CALIBRATION_METHODS.map((method, index) => (
            <Link key={index} href={`/dashboard/settings/patterns/${method.value}`} className="p-4 bg-white shadow-lg text-center rounded-lg font-semibold hover:bg-[#0199d4] hover:text-white transition-all">
              <span>{method.label}</span>
            </Link>
          ))
        }
      </div>
    </LayoutPage>
  )
}