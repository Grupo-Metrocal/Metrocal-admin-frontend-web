import { toast } from 'sonner'
import { fetchData } from './fetch'

export const downloadInternExcelEngine = async ({
  path,
  name,
}: {
  path: string
  name: string
}) => {
  toast.loading('Buscando archivo...', {
    description: 'Espere un momento por favor',
  })
  const response = await fetchData({
    url: `engines/download_intern_excel_engine/path/${path.replaceAll(
      '/',
      '%2F',
    )}`,
    method: 'GET',
    responseType: 'blob',
  })

  toast.dismiss()

  if (response) {
    const blob = new Blob([response], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${name}.xlsx`
    link.click()
    toast.success('Excel descargado correctamente')
  } else {
    toast.error('Error al generar el PDF')
  }
}

export const downloadAlternativeExcelEngine = async ({
  path_name,
}: {
  path_name: string
}) => {
  toast.loading('Buscando archivo...', {
    description: 'Espere un momento por favor',
  })
  const response = await fetchData({
    url: `engines/download/${path_name}`,
    method: 'GET',
    responseType: 'blob',
  })

  toast.dismiss()

  if (response) {
    const blob = new Blob([response], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = path_name
    link.click()
    toast.success('Excel descargado correctamente')
  } else {
    toast.error('Error al generar el PDF')
  }
}
