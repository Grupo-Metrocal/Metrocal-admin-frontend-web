import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { RegisterQuoteList } from './component/RegisterList'
import { Content } from '@/components/Content'
import { RecentQuotes } from './component/RecentQuotes'
import { RecentActivities } from './component/RecentActivities'

export default function Page() {
  return (
    <LayoutPage title="Cotizaciones / registros" className="quotes-records">
      <div className="quotes-records">
        <div className="quotes-records__recent">
          <RecentActivities />
          <RecentQuotes />
        </div>

        <Content title="Listado" colorTitle="purple">
          <RegisterQuoteList />
        </Content>
      </div>
    </LayoutPage>
  )
}
