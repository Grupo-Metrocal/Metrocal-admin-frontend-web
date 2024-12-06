import { toast } from 'sonner'
import { fetchData } from './fetch'

export const handleGeneratePDFQuote = async ({
  id,
  no,
  company_name,
}: {
  id: number
  no: string
  company_name: string
}) => {
  toast.loading('Generando PDF...', {
    description: 'Espere un momento por favor',
  })
  const response = await fetchData({
    url: `quotes/request/pdf/${id}`,
    method: 'GET',
    responseType: 'blob',
  })

  if (response) {
    const blob = new Blob([response], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${no}_${company_name}.pdf`
    link.click()
    toast.success('PDF generado correctamente')
  } else {
    toast.error('Error al generar el PDF')
  }
}

export const handleGeneratePDFServiceOrder = async ({
  id,
  no,
  company_name,
}: {
  id: number
  no: string
  company_name: string
}) => {
  toast.loading('Generando PDF...', {
    description: 'Espere un momento por favor',
  })
  const response = await fetchData({
    url: `activities/service-order/pdf/${id}`,
    method: 'GET',
    responseType: 'blob',
  })

  if (response) {
    const blob = new Blob([response], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `Order de servicio - ${no}_${company_name}.pdf`
    link.click()
    toast.success('PDF generado correctamente')
  } else {
    toast.error('Error al generar el PDF')
  }
}
