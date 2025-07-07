import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Data } from "../../interface"
import { formatPrice } from "@/utils/formatPrice"
import { formatDate } from "@/utils/formatDate"

interface Props {
  data: Data
}

export default function QuoteInformation({ data }: Props) {
  return (
    <Card className='bg-white'>
      <CardHeader>
        <CardTitle className="text-lg">Información de la Cotización</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className='font-semibold'>
          <label className="text-xs font-medium text-gray-500">Código</label>
          <p className="text-sm text-gray-900">{data?.quote_request?.no}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Precio Total</label>
          <p className="text-sm text-gray-900">{`C$ ${formatPrice(data?.quote_request.price)}`}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Creado</label>
          <p className="text-sm text-gray-900">{formatDate(data?.created_at || '')}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Última actualización</label>
          <p className="text-sm text-gray-900">{formatDate(data?.updated_at)}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Aprobado por</label>
          <p className="text-sm text-gray-900">{data?.quote_request?.approved_by?.username ?? 'No asignado'}</p>
        </div>
      </CardContent>
    </Card>
  )
}