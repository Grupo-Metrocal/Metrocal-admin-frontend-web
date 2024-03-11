'use client'
import './page.scss'
import { LayoutPage } from '@/components/LayoutPage'
import certificateIcon from '@/assets/icons/certificate_icon.svg'
import statsIcon from '@/assets/icons/stats.svg'
import activitiesPendingIcon from '@/assets/icons/certificate_pending_icon.svg'
import { StatisticsCard } from '../../../components/StatisticsCard'
import { getCookie } from 'cookies-next'
import { IPendingActivities } from './interface/pendingActivities'
import { Content } from '@/components/Content'
import { formatPrice } from '@/utils/formatPrice'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '@/components/Spinner'
import { ItemPendingCertify } from './components/itemPendingCertify'
import { SelectedPendingCertify } from './components/selectedPendingCertify'
import { TableP_01 } from './components/tableP_01'

const getData = async () => {
  return await fetchData({
    url: 'activities/done',
    method: 'GET',
    headers: {
      Autorization: `Bearer ${getCookie('token')}`,
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

  const [certificate, setCertificate] = useState<any>({})

  console.log('certificate', certificate)

  useEffect(() => {
    getData()
      .then((data) => {
        if (data.success) {
          setPendingActivities(data.data)
          setSelectedActivity(data.data[0])
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

  return (
    <LayoutPage title="Certificados">
      <Content
        title="Vista general"
        colorTitle="purple"
        style={{ paddingBottom: '2.2em' }}
      >
        <div className="certificate-overview">
          <div className="certificate-stats">
            {StatisticsCard({
              title: 'Certificados',
              headerIcon: certificateIcon,
              statsValue: 12.8,
              typeIconStats: 'increase',
              contentValue: '1,200',
            })}

            {StatisticsCard({
              title: 'Ingresos',
              headerIcon: statsIcon,
              statsValue: 12.8,
              typeIconStats: 'decrease',
              contentValue: formatPrice(7800),
              backgroundHeaderIcon: '#c9b1fd',
            })}
            {StatisticsCard({
              title: 'Certificados pendientes',
              contentValue: '1,200',
              className: 'activities',
              headerIcon: activitiesPendingIcon,
              backgroundHeaderIcon: '#f5e7f9',
            })}
          </div>
        </div>
      </Content>

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
            />
          </div>
        </div>
      </Content>

      <Content
        title="Generador de certificados"
        colorTitle="green"
        className="mt-4 w-full min-h-[200px]"
      >
        {loadingCalibration ? (
          <div className="flex mt-4 justify-center">
            <Spinner />
          </div>
        ) : certificate.equipment_information ? (
          <div className="flex justify-center items-center h-full">
            <TableP_01 certificate={certificate} />
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
