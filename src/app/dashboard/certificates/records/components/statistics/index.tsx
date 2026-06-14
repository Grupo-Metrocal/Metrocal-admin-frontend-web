'use client'
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
import { Award } from 'lucide-react'
import './index.scss'

const getStatistics = async () =>
  fetchData({
    url: 'activities/certified-activities/statistics',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

export const StatisticsActivity = () => {
  const [statistics, setStatistics] = useState<IStatistics>({} as IStatistics)

  useEffect(() => {
    getStatistics()
      .then((data) => {
        if (data.success) setStatistics(data.data)
        else toast.error('No se pudieron cargar las estadísticas')
      })
      .catch(() => toast.error('No se pudieron cargar las estadísticas'))
  }, [])

  return (
    <div className="certrec__overview">
      <div className="certrec__overview-header">
        <div className="certrec__overview-icon">
          <Award size={15} />
        </div>
        <div>
          <h2 className="certrec__overview-title">Vista general de certificados</h2>
          <p className="certrec__overview-sub">Estadísticas del mes actual</p>
        </div>
      </div>
      <div className="certrec__stats">
        {StatisticsCard({
          title: 'Certificados',
          headerIcon: certificateIcon,
          statsValue: statistics.certificates?.comparePreviousMonth,
          typeIconStats: statistics.certificates?.comparePreviousMonth >= 0 ? 'increase' : 'decrease',
          contentValue: statistics.certificates?.currentMonth.toLocaleString(),
        })}
        {StatisticsCard({
          title: 'Ingresos',
          headerIcon: statsIcon,
          statsValue: statistics.income?.comparePreviousMonth || 0,
          typeIconStats: statistics.income?.comparePreviousMonth >= 0 ? 'increase' : 'decrease',
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
  )
}
