import { LayoutPage } from '@/components/LayoutPage'
import { StatisticsActivity } from './certificates/records/components/statistics'
export default function Page() {
  return (
    <LayoutPage title="Panel de control">
      <StatisticsActivity />
    </LayoutPage>
  )
}
