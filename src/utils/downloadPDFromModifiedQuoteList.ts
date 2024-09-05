import { toast } from 'sonner'
import { fetchData } from './fetch'

export const handleGeneratePDFromModifiedQuoteList = async ({
  id,
  no,
  company_name,
  index,
}: {
  id: number
  no: string
  company_name: string
  index: number
}) => {
  toast.loading('Generando PDF...', {
    description: 'Espere un momento por favor',
  })
  const response = await fetchData({
    url: `quotes/request/pdf/${id}/${index}`,
    method: 'GET',
    responseType: 'blob',
  })

  toast.dismiss()

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
