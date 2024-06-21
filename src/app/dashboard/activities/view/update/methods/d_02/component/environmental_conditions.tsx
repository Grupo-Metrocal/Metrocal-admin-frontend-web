import { AlertDialogModal } from '@/components/AlertDialogModal'
import { IEnvironmentalConditions } from '../../../../[id]/interface/d_02'
import { toast } from 'sonner'
import { useState } from 'react'

export const EnvironmentalConditions = ({
  environmentalConditions,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IEnvironmentalConditions,
    url: string,
    useActivityID?: boolean,
  ) => void
  environmentalConditions: IEnvironmentalConditions
}) => {
  const url = `methods/ni-mcit-d-02/environmental-conditions/`
  const [data, setData] = useState(environmentalConditions)

  const handleEdit = (key: string, field: string, value: number | string) => {
    setData((prev) => {
      const safePrev = prev ?? {
        cycles: {
          ta: { initial: 0, end: 0 },
          hr: { initial: 0, end: 0 },
        },
        equipment_used: '',
        time: { hours: 0, minute: 0 },
        stabilization_site: '',
      }

      const updatedCycles = { ...safePrev.cycles }
      if (field === 'ta') {
        if (key === 'initial') {
          updatedCycles.ta.initial = value as number
        } else if (key === 'end') {
          updatedCycles.ta.end = value as number
        }
      } else if (field === 'hr') {
        if (key === 'initial') {
          updatedCycles.hr.initial = value as number
        } else if (key === 'end') {
          updatedCycles.hr.end = value as number
        }
      }

      return { ...prev, cycles: updatedCycles }
    })
  }

  const handleFieldChange = (field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTimeChange = (key: 'hours' | 'minute', value: number) => {
    if (
      (key === 'hours' && (value < 0 || value > 23)) ||
      (key === 'minute' && (value < 0 || value > 59))
    ) {
      toast.dismiss()
      toast.error(
        `Valor inválido para ${key}: ${value}. ${
          key === 'hours'
            ? 'Las horas deben estar entre 0 y 23.'
            : 'Los minutos deben estar entre 0 y 59.'
        }`,
      )
      return
    }
    setData((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        [key]: value,
      },
    }))
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Ciclos</th>
            <th className="border px-4 py-2">T. A. (ºC) Inicial</th>
            <th className="border px-4 py-2">T. A. (ºC) Final</th>
            <th className="border px-4 py-2">H R (%) Inicial</th>
            <th className="border px-4 py-2">H R (%) Final</th>
            <th className="border px-4 py-2">Equipo utilizado</th>
            <th className="border px-4 py-2">Tiempo (Horas)</th>
            <th className="border px-4 py-2">Tiempo (Minutos)</th>
            <th className="border px-4 py-2">Sitio de estabilización</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data?.cycles.ta.initial ?? 0}
                onChange={(e) =>
                  handleEdit('initial', 'ta', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data?.cycles.ta.end ?? 0}
                onChange={(e) =>
                  handleEdit('end', 'ta', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data?.cycles.hr.initial ?? 0}
                onChange={(e) =>
                  handleEdit('initial', 'hr', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data?.cycles.hr.end ?? 0}
                onChange={(e) =>
                  handleEdit('end', 'hr', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="text"
                value={data?.equipment_used ?? 0}
                onChange={(e) =>
                  handleFieldChange('equipment_used', e.target.value)
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data?.time?.hours ?? 0}
                onChange={(e) =>
                  handleTimeChange('hours', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                value={data?.time?.minute ?? 0}
                onChange={(e) =>
                  handleTimeChange('minute', Number(e.target.value))
                }
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="text"
                value={data?.stabilization_site}
                onChange={(e) =>
                  handleFieldChange('stabilization_site', e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(data, url)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
