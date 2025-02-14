import { useState, useEffect } from 'react'
import { fetchData } from '@/utils/fetch'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'

export interface Engine {
  id: number
  calibration_method: string
  alternative_path: string
  default_path: string
  pattern: string
  file_name: string
  updated_at: string
}

export function useExcelEngine(calibration_method: string) {
  const [engines, setEngines] = useState<Engine[]>([])

  useEffect(() => {
    if (calibration_method) {
      getEngines()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calibration_method])

  const getEngines = async () => {
    toast.loading('Cargando patrones...')
    const response = await fetchData({
      url: `engines/calibration_method/${calibration_method}`,
      method: 'GET',
    })

    toast.dismiss()

    if (response.success) {
      setEngines(response.data)
    } else {
      toast.error('Hubo un error al cargar la información')
    }
  }

  const deleteEngine = async (id: number, file_name: string) => {
    toast.loading('Eliminando motor...')

    const response = await fetchData({
      url: `engines/delete/engineId/${id}/file_name/${file_name}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
    toast.dismiss()

    if (response.success) {
      toast.success('Motor eliminado')
    } else {
      toast.error('Hubo un error al eliminar el motor')
    }
  }

  return {
    engines,
    deleteEngine,
  }
}
