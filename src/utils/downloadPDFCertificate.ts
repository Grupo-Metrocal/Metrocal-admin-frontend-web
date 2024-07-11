import { toast } from 'sonner'
import { fetchData } from './fetch'

export const handleGeneratePDFCertificate = async ({
  method_name,
  method_id,
  activity_id,
  no,
}: {
  method_name: string
  method_id: number
  activity_id: number
  no: string
}) => {
  toast.loading('Generando Certificado...', {
    description: 'Espere un momento por favor',
  })

  const response = await fetchData({
    url: `methods/download-certificate-pdf/${activity_id}/${method_name}/${method_id}`,
    method: 'GET',
    responseType: 'blob',
  })

  if (response) {
    const blob = new Blob([response], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `certificado-${no}.pdf`
    link.click()
    toast.success('PDF generado correctamente')
  } else {
    toast.error('Error al generar el PDF')
  }
}
