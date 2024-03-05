import './page.scss'
import { LayoutPage } from '@/components/LayoutPage'
import certificateIcon from '@/assets/icons/certificate_icon.svg'
import statsIcon from '@/assets/icons/stats.svg'
import activitiesPendingIcon from '@/assets/icons/certificate_pending_icon.svg'
import { StatisticsCard } from '../../../components/StatisticsCard'

import { Content } from '@/components/Content'
import { formatPrice } from '@/utils/formatPrice'

export default function Page() {
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

      <Content title="Certificados" colorTitle="yellow" className="mt-4">
        <div></div>
      </Content>
    </LayoutPage>
  )
}
