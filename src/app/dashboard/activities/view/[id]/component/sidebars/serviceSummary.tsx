import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Data, EquipmentQuoteRequest } from "../../interface"
import { formatPrice } from "@/utils/formatPrice"
import { formatDate } from "@/utils/formatDate"
import { Badge } from "@/components/ui/badge"
import { IP_01 } from "../../interface/p_01"

interface Props {
  data: Data
  selectedService: EquipmentQuoteRequest
  stackServices: any
}

export default function ServiceSummnary({ data, selectedService, stackServices }: Props) {
  return (
    <Card className='bg-white'>
      <CardHeader>
        <CardTitle className="text-lg">Resumen del Servicio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{selectedService?.count}</div>
            <p className="text-sm text-gray-500">Total de equipos</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Certificados</span>
              <Badge className="bg-green-100 text-green-800">
                {stackServices.filter((e: IP_01) => !e.certificate_code).length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pendientes</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                {stackServices.filter((e: IP_01) => !!e.certificate_code).length}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}