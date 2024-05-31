import { LayoutPage } from '@/components/LayoutPage'
import { StatisticsActivity } from './certificates/records/components/statistics'
import { QuoteFluctuationStatistic } from './_component/quoteFluctuationStatistic'
export default function Page() {
  return (
    <LayoutPage title="Panel de control">
      <StatisticsActivity />
      <QuoteFluctuationStatistic />
    </LayoutPage>
  )
}
