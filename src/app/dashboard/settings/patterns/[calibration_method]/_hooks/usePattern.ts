import { useState, useEffect } from 'react'
import { fetchData } from '@/utils/fetch'
import { toast } from 'sonner'

export interface Pattern {
  id: number
  method: string
  equipment: string
  code: string
  certificate: string
  traceability: string
  pattern_range: string
  next_calibration: string
  brand: string
  status: boolean
}

export function usePattern(calibration_method?: string) {
  const [patterns, setPatterns] = useState<Pattern[]>([])

  useEffect(() => {
    getPatterns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calibration_method])

  const getPatterns = async () => {
    toast.loading('Cargando patrones...')
    const response = await fetchData({
      url: calibration_method
        ? `patterns/calibration_method/${calibration_method}`
        : 'patterns',
      method: 'GET',
    })

    toast.dismiss()

    if (response.success) {
      setPatterns(response.data)
    } else {
      toast.error('Hubo un error al cargar la información')
    }
  }

  const updatePattern = async (id: number, pattern: Pattern) => {
    toast.loading('Actualizando información...')

    const response = await fetchData({
      url: `patterns/update`,
      method: 'POST',
      body: pattern,
    })

    toast.dismiss()

    if (response.success) {
      setPatterns((prevPatterns) =>
        prevPatterns.map((p) => (p.id === id ? { ...p, ...pattern } : p)),
      )
      toast.success('Información Actualizada')
    } else {
      toast.error('Hubo un error al actualizar la información')
    }
  }

  const createPattern = async (newPattern: Omit<Pattern, 'id'>) => {
    toast.loading('Creando patron...')

    const response = await fetchData({
      url: `patterns`,
      method: 'POST',
      body: newPattern,
    })

    toast.dismiss()

    if (response.success) {
      setPatterns([...patterns, response.data])
      toast.success('Pattern created')
    } else {
      toast.error('Hubo un error al crear el patron', {
        description: 'Verifique la información',
      })
    }
  }

  const deletePattern = async (id: number) => {
    toast.loading('Eliminando patron...')

    const response = await fetchData({
      url: `patterns/pattern_id/${id}`,
      method: 'DELETE',
    })
    toast.dismiss()

    if (response.success) {
      setPatterns(patterns.filter((p) => p.id !== id))
      toast.success('Patron eliminado')
    } else {
      toast.error('Hubo un error al eleiminar el patron')
    }
  }

  const updatePatternStatus = async (id: number) => {
    toast.loading('Actualizando estado...')

    const response = await fetchData({
      url: `patterns/update-status/pattern_id/${id}`,
      method: 'GET',
    })

    toast.dismiss()

    if (response.success) {
      setPatterns((prevPatterns) =>
        prevPatterns.map((p) =>
          p.id === id ? { ...p, status: !p.status } : p,
        ),
      )
      toast.success('Estatus actualizado')
    } else {
      toast.error('Hubo un error al eleiminar el patron')
    }
  }

  return {
    patterns,
    updatePattern,
    createPattern,
    deletePattern,
    updatePatternStatus,
  }
}
