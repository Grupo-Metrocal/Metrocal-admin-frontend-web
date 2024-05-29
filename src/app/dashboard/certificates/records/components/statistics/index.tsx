'use client'
import { Content } from '@/components/Content'
import { StatisticsCard } from '@/components/StatisticsCard'
import certificateIcon from '@/assets/icons/certificate_icon.svg'
import statsIcon from '@/assets/icons/stats.svg'
import activitiesPendingIcon from '@/assets/icons/certificate_pending_icon.svg'
import { formatPrice } from '@/utils/formatPrice'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { IStatistics } from '../../../interface/pendingActivities'
import './index.scss'

const getStatistics = async () => {
  return await fetchData({
    url: 'activities/certified-activities/statistics',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export const StatisticsActivity = () => {
  const [statistics, setStatistics] = useState<IStatistics>({} as IStatistics)

  useEffect(() => {
    getStatistics()
      .then((data) => {
        if (data.success) {
          setStatistics(data.data)
        } else {
          setStatistics({} as IStatistics)
          toast.error('No se pudieron cargar las estadísticas')
        }
      })
      .catch(() => {
        setStatistics({} as IStatistics)
        toast.error('No se pudieron cargar las estadísticas')
      })
  }, [])

  return (
    <Content
      title="Vista general de certificados"
      colorTitle="purple"
      style={{ paddingBottom: '2.2em' }}
    >
      <div className="certificate-overview">
        <div className="certificate-stats">
          {StatisticsCard({
            title: 'Certificados',
            headerIcon: certificateIcon,
            statsValue: statistics.certificates?.comparePreviousMonth,
            typeIconStats:
              statistics.certificates?.comparePreviousMonth >= 0
                ? 'increase'
                : 'decrease',
            contentValue:
              statistics.certificates?.currentMonth.toLocaleString(),
          })}

          {StatisticsCard({
            title: 'Ingresos',
            headerIcon: statsIcon,
            statsValue: statistics.income?.comparePreviousMonth || 0,
            typeIconStats:
              statistics.income?.comparePreviousMonth >= 0
                ? 'increase'
                : 'decrease',
            contentValue: formatPrice(statistics.income?.currentMonth),
            backgroundHeaderIcon: '#c9b1fd',
          })}
          {StatisticsCard({
            title: 'Certificados pendientes',
            contentValue: statistics?.pendingCertification?.toLocaleString(),
            className: 'activities',
            headerIcon: activitiesPendingIcon,
            backgroundHeaderIcon: '#f5e7f9',
          })}
        </div>
      </div>
    </Content>
  )
}
