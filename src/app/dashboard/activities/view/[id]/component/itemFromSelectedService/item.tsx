import { ActionItem } from "./actions"
import { EquipmentQuoteRequest } from "../../interface"
import { IP_01 } from "../../interface/p_01"
import { Card, CardContent } from "@/components/ui/card"
import { TestTube } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/formatDate"

interface Props {
  service: IP_01
  selectedService: EquipmentQuoteRequest | null
  activityId: number
  handleDeleteEquipment: (id: number, stackId: number) => void
}

export const ItemSelectedService = ({ service, selectedService, activityId, handleDeleteEquipment }: Props) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TestTube className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{service?.equipment_information?.device ?? service?.equipment_information?.calibration_object}</h3>
                <Badge variant="outline" className="text-xs">
                  {service?.equipment_information?.code}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Certificado: {service?.certificate_code || 'No generado'}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-400">
                  Próxima calibración: {service?.description_pattern?.next_calibration ? formatDate(service?.description_pattern?.next_calibration) : 'No definida'}
                </span>
                <span className="text-xs text-gray-400">Ubicación: {service?.calibration_location}</span>
              </div>
            </div>
          </div>
          <ActionItem
            equipment={service}
            key={service.id}
            calibration_method={
              selectedService?.calibration_method?.split(
                ' ',
              )[0] || ''
            }
            activityID={activityId}
            stackId={selectedService?.method_id || 0}
            onDelete={handleDeleteEquipment}
            selectedService={selectedService}
          />
        </div>

      </CardContent>
    </Card>
  )
}