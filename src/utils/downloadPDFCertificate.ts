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

  fetchData({
    url: `methods/download-certificate-pdf/${activity_id}/${formatMethodName(
      method_name,
    )}/${method_id}`,
    method: 'GET',
    responseType: 'blob',
  })
    .then((blob) => {
      if (!blob || blob.type !== 'application/pdf') {
        throw new Error('La respuesta no es un PDF válido')
      }

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `certificado-${no}.pdf`
      link.click()
      toast.success('PDF generado correctamente')
    })
    .catch((error) => {
      console.error('Error:', error)
      toast.error(error.message || 'Error al generar el PDF')
    })
}

const formatMethodName = (methodName: string) =>
  methodName.replaceAll('-', '_').toLocaleUpperCase()
