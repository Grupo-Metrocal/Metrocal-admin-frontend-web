import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Equipmentquoterequest, IPendingActivities } from "../../interface/pendingActivities"
import { IP_01 } from "../../interface/p-01"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Edit, FileText } from "lucide-react"
import { Label } from "@/components/ui/label"
import { formatDate } from "@/utils/formatDate"

interface Props {
  selectedActivity: IPendingActivities
  selectedService: Equipmentquoterequest
  methodsStackSelected: any
  calibrationSelected: IP_01
  handleGenerateCertificate: (item: IP_01) => void
  loadingCalibration: boolean
}

export const TabEquipments = ({ selectedActivity, selectedService, methodsStackSelected, calibrationSelected, handleGenerateCertificate, loadingCalibration }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Equipos del Servicio Calibrados</CardTitle>
        <p className="text-sm text-gray-500">
          {selectedService
            ? `Servicio: ${selectedService?.name} seleccionado`
            : "Selecciona un servicio en la pestaña 'Servicios' para ver sus equipos"}
        </p>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-auto">
        {selectedService ? (
          <div className="space-y-4">
            {methodsStackSelected?.methods
              .map((item: IP_01) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${item.review_state ? "bg-green-500" : "bg-yellow-500"}`}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.equipment_information?.device ?? item.equipment_information?.calibration_object}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={item.review_state ? "default" : "secondary"}
                            className={
                              item.review_state
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {item.review_state ? "Aprobado" : "Pendiente de Aprobación"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link target="_blank" href={`/dashboard/activities/view/update/${item.id}/${selectedService?.calibration_method?.split(' ')[0]}/${selectedActivity?.id}?increase=false`}
                        className='text-[#09f]'>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modificar
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleGenerateCertificate(item)}
                        disabled={loadingCalibration}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Generar Certificado
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-xs font-medium text-gray-500">Código:</Label>
                      <p className="font-medium">{item.equipment_information?.code ?? 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-500">Certificado:</Label>
                      <p className="font-medium">{item.certificate_code ?? 'Sin certificado'}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-500">Fecha Calibración:</Label>
                      <p className="font-medium">{formatDate(item.method_end_date_finished ?? '') || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-500">Próxima Calibración:</Label>
                      <p className={`font-medium ${!item.description_pattern.next_calibration ? "text-yellow-600" : ""}`}>
                        {item.description_pattern.next_calibration ? formatDate(item.description_pattern.next_calibration) : "No especificada"}
                      </p>
                    </div>
                  </div>

                  {!item.review_state && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Este equipo requiere aprobación.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Selecciona un servicio para ver sus equipos asociados</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}