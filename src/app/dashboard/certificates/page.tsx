'use client'
import './page.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { getCookie } from 'cookies-next'
import { IPendingActivities } from './interface/pendingActivities'
import { Content } from '@/components/Content'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Spinner } from '@/components/Spinner'
import { ItemPendingCertify } from './components/itemPendingCertify'
import { SelectedPendingCertify } from './components/selectedPendingCertify'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { emmitCertificationsToClient } from '@/utils/functions'
import { emmitCertificate } from '@/utils/functions'
import { Backdrop } from '@/components/Backdrop'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { CertificatePdfPreview } from './components/certificatePdfPreview'
import { handleGeneratePDFCertificate, handleDownloadExcelCertificate } from '@/utils/downloadPDFCertificate'

const getData = async () => {
  return await fetchData({
    url: 'activities/done',
    method: 'GET',
    headers: {
      Autorization: `Bearer ${getCookie('token')}`,
    },
  })
}

const approveCertificate = async (method_name: string, method_id: number) => {
  return await fetchData({
    url: 'methods/review-method',
    method: 'POST',
    body: {
      method_name: method_name.replaceAll('-', '_'),
      method_id,
      token: getCookie('token'),
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export default function Page() {
  const [pendingActivities, setPendingActivities] = useState<
    IPendingActivities[]
  >([])
  const [loading, setLoading] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<IPendingActivities>()

  const [loadingCalibration, setLoadingCalibration] = useState<boolean>(false)
  const [loadingEmmitCertificate, setLoadingEmmitCertificate] =
    useState<boolean>(false)
  const [certificate, setCertificate] = useState<any>({})
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null)
  const [certificateNo, setCertificateNo] = useState<string>('')
  const { values: search, handleInputChange } = useForm({
    search: '',
  })

  const reviewCertificate = async () => {
    toast.loading('Aprobando certificado')

    const response = await approveCertificate(
      certificate.renderer_method,
      certificate.renderer_method_id,
    )

    toast.dismiss()

    if (response.success) {
      toast.success('Certificado aprobado')
    } else {
      toast.error('Error al aprobar el certificado')
    }
  }

  const reviewAndEmmitCertificate = async () => {
    await reviewCertificate()

    toast.loading('Enviando certificado...', {
      duration: 50000
    })

    const response = await emmitCertificate(certificate.renderer_method, selectedActivity?.id as number, certificate.renderer_method_id)
    toast.dismiss()

    if (response.success) {
      toast.success('Se han enviado el certificados')
    } else {
      toast.error('Hubo un error al enviar el certificados')
    }
  }

  const handleEmmitCertificateToClient = async (activityID: number) => {
    if (activityID === 0) {
      return toast.error('No se ha seleccionado ninguna actividad')
    }
    setLoadingEmmitCertificate(true)

    const response = await emmitCertificationsToClient(activityID)

    toast.dismiss()
    setLoadingEmmitCertificate(false)

    if (response.success) {
      toast.success('Hemos enviado todos los certificados generados al cliente')
    } else {
      toast.error('Error al enviar los certificados al cliente', {
        description:
          'si el error persiste contacte al administrador del sistema',
      })
    }
  }

  useEffect(() => {
    getData()
      .then((data) => {
        if (data.success) {
          setPendingActivities(data.data.activities)
          setSelectedActivity(data.data.activities[0])
        } else {
          toast.error('Error al cargar los datos')
        }
      })
      .catch((error) => {
        toast.error('Error al cargar los datos')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredActivities = useMemo(() => {
    return pendingActivities.filter((activity) =>
      activity.quoteRequest.no
        .includes(search.search),
    )
  }, [pendingActivities, search.search])

  return (
    <LayoutPage
      title=""
    >
      {loadingEmmitCertificate && (
        <Backdrop
          title="Enviando todos los CERTIFICADOS, por favor espere..."
          message="Esto puede tardar unos minutos, dependiendo de la cantidad de certificados aprobados."
        />
      )}
      <Content title=''>
        <div className="pending-certificate">
          <div className="w-[600px]">
            <div className='mb-8'>
              <div className="relative w-full">
                <CInput
                  placeholder="Buscar por No. de Cotización"
                  name='search'
                  value={search.search}
                  onChange={handleInputChange}
                />
              </div>
              {/* <h3 className="text-sm font-medium text-gray-500 mb-3">Certificados Pendientes</h3> */}
            </div>
            <div className="space-y-2 overflow-auto max-h-[800px] p-4 border-gray-200 border rounded-lg">
              {loading ? (
                <div className="flex mt-4 justify-center">
                  <Spinner />
                </div>
              ) : filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <ItemPendingCertify
                    key={activity.id}
                    activity={activity}
                    onClick={() => setSelectedActivity(activity)}
                    selectedActivity={selectedActivity as IPendingActivities}
                  />
                ))
              ) : (
                <p className="text-center mt-4 text-gray-500">
                  No hay actividades pendientes para certificar
                </p>
              )}
            </div>
          </div>
          <div className="pending-certificate__details border rounded-lg shadow-md p-4 bg-white">
            <SelectedPendingCertify
              selectedActivity={selectedActivity as IPendingActivities}
              loading={loading}
              setLoadingCalibration={setLoadingCalibration}
              setCertificate={setCertificate}
              loadingCalibration={loadingCalibration}
              handleEmmitCertificateToClient={handleEmmitCertificateToClient}
              isLoadingEmmitCertificate={loadingEmmitCertificate}
              setPdfPreviewUrl={setPdfPreviewUrl}
              setCertificateNo={setCertificateNo}
            />
          </div>
        </div>
      </Content >

      <Content
        title=""
        colorTitle="green"
        className="mt-4 w-full"
      >
        {loadingCalibration ? (
          <div className="flex mt-4 justify-center">
            <Spinner />
          </div>
        ) : pdfPreviewUrl ? (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <CertificatePdfPreview
              pdfUrl={pdfPreviewUrl}
              certificateNo={certificateNo}
              onClose={() => {
                setPdfPreviewUrl(null)
                setCertificateNo('')
                setCertificate({})
              }}
              onDownload={() => {
                if (certificate?.renderer_method && certificate?.renderer_method_id && selectedActivity?.id) {
                  handleGeneratePDFCertificate({
                    method_name: certificate.renderer_method,
                    method_id: certificate.renderer_method_id,
                    activity_id: selectedActivity.id,
                    no: certificateNo,
                  })
                }
              }}
              onDownloadExcel={() => {
                if (certificate?.renderer_method && certificate?.renderer_method_id && selectedActivity?.id) {
                  handleDownloadExcelCertificate({
                    method_name: certificate.renderer_method,
                    method_id: certificate.renderer_method_id,
                    activity_id: selectedActivity.id,
                    no: certificateNo,
                  })
                }
              }}
              onApprove={reviewCertificate}
              onApproveAndSend={reviewAndEmmitCertificate}
            />
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-500">
            No hay certificado para mostrar. Seleccione un equipo y haga clic en &quot;Ver Certificado&quot; para cargar la vista previa.
          </p>
        )}
      </Content>
    </LayoutPage >
  )
}
