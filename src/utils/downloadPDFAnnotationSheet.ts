import { toast } from 'sonner'
import { fetchData } from './fetch'

export const handleGeneratePDFAnnotationSheet = async ({
  idActivity,
  idMethod,
  stackId,
  calibrationMethod,
  fileName,
}: {
  idActivity: number
  idMethod: number
  stackId: number
  calibrationMethod?: string
  fileName?: string
}) => {
  toast.loading('Generando PDF de anotación...', {
    description: 'Espere un momento por favor',
    duration: 10000,
  })

  const methodName = calibrationMethod?.toUpperCase().replaceAll('_', '-')

  try {
    const response = await fetchData({
      url: `methods/generate-annotation-sheet/${methodName}/${idActivity}/${idMethod}/${stackId}`,
      method: 'GET',
      responseType: 'blob',
    })

    toast.dismiss()

    if (response) {
      const blob = new Blob([response], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)

      const defaultFileName = `Anotación de resultados - ${methodName}-${idActivity}-${idMethod}.pdf`

      link.download = fileName || defaultFileName
      link.click()
      toast.success('Anotación de resultados generada correctamente')
    } else {
      toast.error('Error al generar la anotación de resultados')
    }
  } catch (error) {
    toast.dismiss()
    console.error('Error al generar PDF de anotación:', error)
    toast.error('Error al generar la anotación de resultados')
  }
}
