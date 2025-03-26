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
import { TableT_03 } from './components/tableT_03'
import { TableT_05 } from './components/tableT_05'
import { TableV_01 } from './components/tableV_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { TableD_01 } from './components/tableD_01'
import { TableD_02 } from './components/tableD_02'
import { TableB_01 } from './components/tableB_01'
import { TableM_01 } from './components/tableM_01'
import { TableGenericMethod } from './components/table_generic-method'
import { emmitCertificationsToClient } from '@/utils/functions'
import { emmitCertificate } from '@/utils/functions'
import { Backdrop } from '@/components/Backdrop'

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
  'NI-MCIT-V-01': TableV_01,
  'NI-MCIT-T-03': TableT_03,
  'NI-MCIT-T-05': TableT_05,
  'NI-MCIT-D-01': TableD_01,
  'NI-MCIT-D-02': TableD_02,
  'NI-MCIT-B-01': TableB_01,
  'NI-MCIT-M-01': TableM_01,
  'GENERIC_METHOD': TableGenericMethod,
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

  const emmitCertificateToClient = async (activityID: number) => {
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

  const Renderer =
    RENDERER_METHOD[certificate.renderer_method as keyof typeof RENDERER_METHOD]

  return (
    <LayoutPage
      title="Certificados"
      Footer={() => (
        <div className="flex justify-end w-full gap-4 p-4 border-t bg-gray-100 shadow-md">
          {loadingEmmitCertificate && (
            <Backdrop
              title="Enviando todos los CERTIFICADOS, por favor espere..."
              message="Esto puede tardar unos minutos, dependiendo de la cantidad de certificados aprobados."
            />
          )}
          <AlertDialogModal
            onConfirm={() =>
              emmitCertificateToClient((selectedActivity?.id as number) || 0)
            }
            title="Antes de enviar todos los certificados, verifique los datos"
            description="Una vez enviados, los registros generados se eliminarán."
            nameButton="ENVIAR CERTIFICADOS"
            useButton
          />
        </div>
      )}
    >
      <Content title="Certificados pendientes" colorTitle="yellow" className="mt-4">
        <div className="pending-certificate">
          <div className="pending-certificate__table border rounded-lg shadow-md p-4 bg-white">
            <div className="pending-certificate__table__content overflow-auto max-h-[400px]">
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
          <div className="flex justify-center items-center h-full flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
            {Renderer ? (
              <Renderer
                certificate={certificate}
                method_name={certificate.renderer_method}
                id={certificate.renderer_method_id}
              />
            ) : (
              <p className="text-center mt-4 text-gray-500">
                Renderizador no encontrado para el método de calibración
              </p>
            )}

            <div className="w-full flex gap-6 justify-center">
              <AlertDialogModal
                onConfirm={reviewCertificate}
                title="Aprobar certificado"
                description="Antes de aprobar el certificado, verifique que los datos sean correctos."
                nameButton="Aprobar certificado"
                useButton
              />

              <AlertDialogModal
                onConfirm={reviewAndEmmitCertificate}
                title="Aprobar y Enviar Certificado"
                description="El certificado se aprobará y se enviará al correo del cliente. Verifique que los resultados sean correctos."
                nameButton="Aprobar y Enviar"
                useButton
                buttonStyle={{
                  backgroundColor: "#22c55e",
                }}
              />
            </div>
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-500">
            No hay certificado para mostrar. Seleccione un equipo y genere los resultados del certificado.
          </p>
        )}
      </Content>
    </LayoutPage>
  )
}
