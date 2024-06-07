import { IEnvironmentalConditions } from '../../../../[id]/interface/t_05'
import { AlertDialogModal } from '@/components/AlertDialogModal'
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
  const url = `methods/ni-mcit-t-05/environmental-conditions/`
  const [data, setData] = useState(environmentalConditions)

  const handleEdit = (
    field: string,
    value: number | string,
    cycleNumber: number,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prev) => {
      const points = prev.points?.map((point) => {
        if (point.point_number === cycleNumber) {
          if (field === 'temperature.initial') {
            point.temperature.initial = value as number
          } else if (field === 'temperature.final') {
            point.temperature.final = value as number
          } else if (field === 'humidity.initial') {
            point.humidity.initial = value as number
          } else if (field === 'humidity.final') {
            point.humidity.final = value as number
          }
        }
        return point
      })
      return { ...prev, points }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Punto calibrados</th>
            <th className="border px-4 py-2">Temperatura (ºC) Inicial</th>
            <th className="border px-4 py-2">Temperatura (ºC) Final</th>
            <th className="border px-4 py-2">Humedad (%) Inicial</th>
            <th className="border px-4 py-2">Humedad (%) Final</th>
            {/* <th className="border px-4 py-2">Equipo utilizado</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.points?.map((point) => (
            <tr key={point.point_number} className="text-center">
              <td className="border px-4 py-2">
                Punto{' '}
                {point.point_number === -1 ? '1 final' : point.point_number}
              </td>
              <td className="border px-4 py-2">
                <input
                  className="text-center"
                  type="text"
                  value={point.temperature.initial}
                  onChange={(e) =>
                    handleEdit(
                      'temperature.initial',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className=" text-center"
                  type="text"
                  value={point.temperature.final}
                  onChange={(e) =>
                    handleEdit(
                      'temperature.final',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className=" text-center"
                  type="text"
                  value={point.humidity.initial}
                  onChange={(e) =>
                    handleEdit(
                      'humidity.initial',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className=" text-center"
                  type="text"
                  value={point.humidity.final}
                  onChange={(e) =>
                    handleEdit(
                      'humidity.final',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
            </tr>
          ))}
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
