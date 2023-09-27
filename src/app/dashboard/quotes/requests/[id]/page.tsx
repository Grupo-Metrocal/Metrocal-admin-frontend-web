import { LayoutPage } from '@/components/LayoutPage'

interface IRoot {
  params: {
    id: string
  }
}

export default function Page({ params }: IRoot) {
  const id = params.id

  return <LayoutPage title="Cotizaciones / solicitudes ">hola {id}</LayoutPage>
}
