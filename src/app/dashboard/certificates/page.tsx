'use client'
import './page.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { getCookie } from 'cookies-next'
import { IPendingActivities } from './interface/pendingActivities'
import { Content } from '@/components/Content'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '@/components/Spinner'
import { ItemPendingCertify } from './components/itemPendingCertify'
import { SelectedPendingCertify } from './components/selectedPendingCertify'
import { TableP_01 } from './components/tableP_01'
import { TableT_01 } from './components/tableT_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

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

const RENDERER_METHOD = {
  'NI-MCIT-P-01': TableP_01,
  'NI-MCIT-T-01': TableT_01,
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

  const emmitCertificateToClient = async (activityID: number) => {
    if (activityID === 0) {
      return toast.error('No se ha seleccionado ninguna actividad')
    }
    setLoadingEmmitCertificate(true)
    toast.loading('Estamos enviando los certificados a los clientes', {
      description: 'tiempo estimado de 2 a 7 minutos',
    })

    const response = await fetchData({
      url: `methods/send-certifications-to-client/${activityID}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

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

  const Renderer =
    RENDERER_METHOD[certificate.renderer_method as keyof typeof RENDERER_METHOD]

  return (
    <LayoutPage
      title="Certificados"
      Footer={() => (
        <div className="flex justify-end w-full gap-4">
          <div className="">{loadingEmmitCertificate && <Spinner />}</div>
          <AlertDialogModal
            onConfirm={() =>
              emmitCertificateToClient((selectedActivity?.id as number) || 0)
            }
            title="Antes de enviar todos los certificados, debe verificar que los datos sean correctos"
            description="Una vez enviados los certificados se limpiaran los registros generados"
            nameButton="ENVIAR CERTIFICADOS"
            useButton
          />
        </div>
      )}
    >
      <Content
        title="Certificados pendientes"
        colorTitle="yellow"
        className="mt-4"
      >
        <div className="pending-certificate">
          <div className="pending-certificate__table">
            <header>
              <span>Responsable</span>
              <span>Detalles</span>
            </header>

            <div className="pending-certificate__table__content">
              {loading ? (
                <div className="flex mt-4 justify-center">
                  <Spinner />
                </div>
              ) : pendingActivities.length > 0 ? (
                pendingActivities.map((activity) => (
                  <ItemPendingCertify
                    key={activity.id}
                    activity={activity}
                    onClick={() => setSelectedActivity(activity)}
                    selectedActivity={selectedActivity as IPendingActivities}
                  />
                ))
              ) : (
                <p className="text-center mt-4">
                  No hay actividades pendientes para certificar
                </p>
              )}
            </div>
          </div>
          <div className="pending-certificate__details">
            <SelectedPendingCertify
              selectedActivity={selectedActivity as IPendingActivities}
              loading={loading}
              setLoadingCalibration={setLoadingCalibration}
              setCertificate={setCertificate}
              loadingCalibration={loadingCalibration}
            />
          </div>
        </div>
      </Content>

      <Content
        title="Información del certificado de calibración"
        colorTitle="green"
        className="mt-4 w-full min-h-[200px]"
      >
        {loadingCalibration ? (
          <div className="flex mt-4 justify-center">
            <Spinner />
          </div>
        ) : certificate?.renderer_method ? (
          <div className="flex justify-center items-center h-full flex-col gap-8">
            {Renderer ? (
              <>
                <Renderer certificate={certificate} />
              </>
            ) : (
              <p className="text-center mt-4">
                Renderizador no encontrado para el método de calibración
              </p>
            )}

            <div className="w-full mb-8">
              {
                <AlertDialogModal
                  onConfirm={() => reviewCertificate()}
                  title="Antes de aprobar el certificado, verifique que los datos sean correctos"
                  nameButton="Aprobar certificado"
                  useButton
                />
              }
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">
            No hay certificado para mostrar, porfavor seleccine un equipo y
            genere los resultados del certificado
          </p>
        )}
      </Content>
    </LayoutPage>
  )
}
