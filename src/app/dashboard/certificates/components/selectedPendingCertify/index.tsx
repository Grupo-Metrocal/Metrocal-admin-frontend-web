import './index.scss'
import {
  IPendingActivities,
  Equipmentquoterequest,
} from '../../interface/pendingActivities'
import { Spinner } from '@/components/Spinner'
import { formatPrice } from '@/utils/formatPrice'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { IP_01 } from '../../interface/p-01'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabServices } from './TabServices'
import { TabDetails } from './TabDetails'
import { TabEquipments } from './TabEquipment'
import { approveCertificate } from '@/utils/functions'
import { handlePreviewPDFCertificate } from '@/utils/previewPDFCertificate'

const getMethods = async (id: number) => {
  return await fetchData({
    url: `methods/get-stack/${id}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

const getCertificate = async ({
  methodType,
  activityID,
  methodID,
}: {
  methodType: string
  activityID: number
  methodID: number
}) => {
  return await fetchData({
    url: `methods/${methodType}/certificates/activity/${activityID}/method/${methodID}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

interface IProps {
  loading: boolean
  selectedActivity: IPendingActivities
  setLoadingCalibration: (loading: boolean) => void
  setCertificate: (certificate: any) => void
  loadingCalibration: boolean
  handleEmmitCertificateToClient: (id: number) => void
  isLoadingEmmitCertificate: boolean
  setPdfPreviewUrl: (url: string | null) => void
  setCertificateNo: (no: string) => void
}

export const SelectedPendingCertify = ({
  selectedActivity,
  loading,
  setLoadingCalibration,
  loadingCalibration: loadingCalibration,
  setCertificate,
  handleEmmitCertificateToClient,
  setPdfPreviewUrl,
  setCertificateNo
}: IProps) => {
  const [selectedService, setSelectedService] = useState<Equipmentquoterequest>(
    {} as Equipmentquoterequest,
  )
  const [equipments, setEquipments] = useState<any[]>([])

  const [calibrationSelected, setCalibrationSelected] = useState<IP_01>(
    {} as IP_01,
  )

  const certCount = Array.isArray(selectedActivity?.quoteRequest?.equipment_quote_request)
    ? selectedActivity.quoteRequest.equipment_quote_request.reduce((acc, item) => acc + (item.count || 0), 0)
    : 0

  const handleSelectedService = async (service: Equipmentquoterequest) => {
    setSelectedService(service)

    const methods = await getMethods(service.method_id)

    if (methods.success) {
      setEquipments(methods.data,
      )
    }
  }

  const handleApproveEquipment = async (method_name: string, method_id: number) => {
    const response = await approveCertificate(method_name.split(' ')[0], method_id)

    if (response.success) {
      setEquipments((prev) =>
        prev?.map((method: IP_01) =>
          method.id === method_id
            ? { ...method, review_state: true }
            : method
        )
      );
    } else {
      toast.error('Hubo un error al aprobar el certificado')
    }
  }

  const handleGenerateCertificate = async (equipment: IP_01) => {
    if (!equipment.id) {
      toast('Porfavor selecciona un equipo para generar el certificado')
      return
    }

    setLoadingCalibration(true)

    toast.loading('Cargando certificado...', {
      description: 'Esto puede tardar unos segundos',
    })

    const certificate = await getCertificate({
      methodType: selectedService.calibration_method
        .split(' ')[0]
        .toLocaleLowerCase(),
      activityID: selectedActivity.id,
      methodID: equipment.id,
    })

    toast.dismiss()
    setLoadingCalibration(false)

    if (certificate.success) {
      setCertificate({
        ...certificate.data,
        renderer_method: selectedService.calibration_method.split(' ')[0],
        renderer_method_id: equipment.id,
      })
      toast.success('Certificado cargado con éxito')
    } else {
      toast.error('Error al cargar el certificado', {
        description: certificate.details || '',
      })
      setCertificate({})
    }
  }

  const handlePreviewCertificate = async (equipment: IP_01) => {
    if (!equipment.id) {
      toast('Porfavor selecciona un equipo para ver el certificado')
      return
    }

    setLoadingCalibration(true)

    const result = await handlePreviewPDFCertificate({
      method_name: selectedService.calibration_method.split(' ')[0],
      method_id: equipment.id,
      activity_id: selectedActivity.id,
      no: equipment.certificate_code ?? '',
    })

    setLoadingCalibration(false)

    if (result.success && result.url) {
      setPdfPreviewUrl(result.url)
      setCertificateNo(equipment.certificate_code ?? '')
      setCertificate({
        renderer_method: selectedService.calibration_method.split(' ')[0],
        renderer_method_id: equipment.id,
      })
    } else {
      setPdfPreviewUrl(null)
      setCertificateNo('')
    }
  }

  const handleGeneratePDFCertificates = async () => {
    toast.loading('Generando certificados...', {
      description: 'Esto puede tardar unos segundos, porfavor espera',
    })

    const resopnse = await fetchData({
      url: `activities/${selectedActivity.id}/certificates/generate-pdf`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    if (resopnse.success) {
      toast.success('Se han generado y enviado los certificados', {
        description:
          'cliente: ' + selectedActivity.quoteRequest.client.company_name,
      })
    } else {
      toast.error('Error al generar los certificados', {
        description: resopnse.details || '',
      })
    }
  }

  useEffect(() => {
    if (selectedActivity) {
      handleSelectedService(
        selectedActivity.quoteRequest.equipment_quote_request[0],
      )
    }
  }, [selectedActivity])

  return loading ? (
    <div className="pending-certificate__selected flex justify-center ">
      <Spinner />
    </div>
  ) : (
    <div>
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className=''>
            <h2 className="text-2xl font-bold text-gray-900">{selectedActivity.quoteRequest.client.company_name}</h2>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-500">{selectedActivity.quoteRequest.no}</span>
              {selectedActivity.quoteRequest.price && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="font-medium">C$ {formatPrice(selectedActivity.quoteRequest.price)}</span>
                </div>
              )}
              <span className="text-sm text-gray-500">
                {certCount} Equipos a certificar
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/activities/view/${selectedActivity?.id}`} className='text-[#09f] p-1 bg-white rounded flex items-center'
              target='_blank'
            >
              <Button variant="outline" size="sm" className='text-black'>
                <Edit className="h-4 w-4 mr-2" />
                Modificar resultados
              </Button>
            </Link>
            <AlertDialogModal
              onConfirm={() => handleEmmitCertificateToClient(selectedActivity.id)}
              title="Antes de enviar todos los certificados, verifique los datos"
              description="Una vez enviados, los registros generados se eliminarán."
              nameButton="ENVIAR CERTIFICADOS"
            />
          </div>
        </div>
      </div>

      <div className='py-6'>
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className='bg-gray-50 p-2'>
            <TabsTrigger value="details" className='data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-semibold'>Detalles</TabsTrigger>
            <TabsTrigger value="services" className='data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-semibold'>Servicios</TabsTrigger>
            <TabsTrigger value="equipment" className='data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-semibold'>Equipos</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <TabDetails selectedActivity={selectedActivity} />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <TabServices selectedActivity={selectedActivity} handleSelectedService={handleSelectedService} selectedService={selectedService} />
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <TabEquipments
              selectedActivity={selectedActivity}
              selectedService={selectedService}
              equipments={equipments}
              calibrationSelected={calibrationSelected}
              handleGenerateCertificate={handleGenerateCertificate}
              loadingCalibration={loadingCalibration}
              handleApproveEquipment={handleApproveEquipment}
              handlePreviewCertificate={handlePreviewCertificate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}
