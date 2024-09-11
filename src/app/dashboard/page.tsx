import { LayoutPage } from '@/components/LayoutPage'
import { QuoteFluctuationStatistic } from './_component/quoteFluctuationStatistic'
import { QuotationsDetails } from './_component/quotationDetails'
export default function Page() {
  return (
    <LayoutPage title="Panel de control"
    >
      <div className='flex flex-col gap-4'>
        <QuotationsDetails />
        <QuoteFluctuationStatistic />
      </div>
    </LayoutPage>
  )
}
