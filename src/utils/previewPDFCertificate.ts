import { toast } from 'sonner'
import { fetchData } from './fetch'

export const handlePreviewPDFCertificate = async ({
  method_name,
  method_id,
  activity_id,
  no,
}: {
  method_name: string
  method_id: number
  activity_id: number
  no: string
}): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    toast.loading('Cargando vista previa del certificado...', {
      description: 'Espere un momento por favor',
    })

    const blob = await fetchData({
      url: `methods/download-certificate-pdf/${activity_id}/${formatMethodName(
        method_name,
      )}/${method_id}`,
      method: 'GET',
      responseType: 'blob',
    })

    toast.dismiss()

    if (!blob || blob.type !== 'application/pdf') {
      throw new Error('La respuesta no es un PDF válido')
    }

    const url = window.URL.createObjectURL(blob)
    toast.success('Vista previa cargada correctamente')

    return { success: true, url }
  } catch (error: any) {
    toast.dismiss()
    console.error('Error:', error)
    toast.error(error.message || 'Error al cargar la vista previa del PDF')
    return { success: false, error: error.message }
  }
}

const formatMethodName = (methodName: string) =>
  methodName.replaceAll('-', '_').toLocaleUpperCase()
