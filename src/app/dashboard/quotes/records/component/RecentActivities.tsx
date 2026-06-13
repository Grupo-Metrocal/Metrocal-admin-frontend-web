import { fetchData } from '@/utils/fetch'
import { formatDate } from '@/utils/formatDate'
import { getCookie } from '@/utils/auth'
import { formatPrice } from '@/utils/formatPrice'
import { Activity, Building2, DollarSign, User } from 'lucide-react'

const getData = async (lastActivities: number) => {
  return await fetchData({
    url: `activities/get-last-activities/${lastActivities}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export const RecentActivities = async () => {
  const response = await getData(6)
  const items: any[] = response?.data ?? []

  return (
    <div className="recent-act">
      <div className="recent-act__header">
        <div className="recent-act__header-icon">
          <Activity size={15} />
        </div>
        <div>
          <h3 className="recent-act__title">Actividades recientes</h3>
          <p className="recent-act__sub">Últimas cotizaciones procesadas</p>
        </div>
        {items.length > 0 && (
          <span className="recent-act__count">{items.length}</span>
        )}
      </div>

      <div className="recent-act__body">
        {items.length === 0 ? (
          <div className="recent-act__empty">
            <Activity size={24} />
            <p>Sin actividades recientes</p>
          </div>
        ) : (
          items.map((item: any) => (
            <div key={item.id} className="recent-act__item">
              <div className="recent-act__item-avatar">
                <Building2 size={14} />
              </div>
              <div className="recent-act__item-info">
                <span className="recent-act__item-company">{item.company_name}</span>
                <span className="recent-act__item-meta">
                  <User size={10} />
                  {item.approved_by}
                  <span className="recent-act__item-sep">·</span>
                  {formatDate(item.created_at)}
                </span>
              </div>
              <span className="recent-act__item-price">
                <DollarSign size={11} />
                {formatPrice(item.price)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
