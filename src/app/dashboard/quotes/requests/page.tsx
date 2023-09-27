import { LayoutPage } from '@/components/LayoutPage'
import { QuoteList } from './quoteList'
export default function Page() {
  return (
    <LayoutPage title="Cotizaciones / solicitudes">
      <QuoteList />
    </LayoutPage>
  )
}
