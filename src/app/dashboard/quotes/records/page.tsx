import { LayoutPage } from '@/components/LayoutPage'
import { RegisterQuoteList } from './component/RegisterList'
import { Content } from '@/components/Content'

export default function Page() {
  return (
    <LayoutPage title="Cotizaciones / registros">
      <Content title="Listado" colorTitle="purple">
        <RegisterQuoteList />
      </Content>
    </LayoutPage>
  )
}
