import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { IPendingActivities, Equipmentquoterequest } from "../../interface/pendingActivities"
import { formatMethodName } from "@/utils/formatMethodName"

interface Props {
  selectedActivity: IPendingActivities
  handleSelectedService: (service: Equipmentquoterequest) => Promise<void>
  selectedService: Equipmentquoterequest
}

export const TabServices = ({ selectedActivity, handleSelectedService, selectedService }: Props) => {
  return (
    <Card >
      <CardHeader>
        <CardTitle className="text-lg">Servicios Realizados</CardTitle>
        <p className="text-sm text-gray-500">Selecciona un servicio para ver sus equipos asociados</p>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-auto">
        <div className="grid gap-4">
          {selectedActivity?.quoteRequest.equipment_quote_request.map(
            (item) =>
            (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedService.id === item.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:bg-gray-50"
                  }`}
                onClick={() => handleSelectedService(item)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${item.count > 0 ? "bg-green-500" : "bg-yellow-500"
                      }`}
                  />
                  <div>
                    <p className="font-bold text-base text-gray-900">{item.name ?? 'Este servicio requiere aprobacion de revisión'}</p>
                    <p className="text-sm text-gray-700">{item.calibration_method ? formatMethodName({ method: item.calibration_method?.split(' ')[0] as any }) : 'N/A'}</p>
                    <p className="text-sm text-gray-500">{item.type_service ?? 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.count ?? 0} Equipos
                  </Badge>
                  {item.calibration_method?.split(' ')[1] === 'Acreditado' && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Acreditado
                    </Badge>
                  )}
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}