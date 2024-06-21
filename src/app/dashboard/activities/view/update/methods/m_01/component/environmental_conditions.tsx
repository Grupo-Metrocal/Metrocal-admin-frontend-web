import { IEnvironmentalConditions } from '../../../../[id]/interface/m_01'
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
  const url = `methods/ni-mcit-m-01/environmental-conditions/`
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
          } else if (field === 'presion.initial') {
            point.presion.initial = value as number
          } else if (field === 'presion.final') {
            point.presion.final = value as number
          }
        }
        return point
      })
      return { ...prev, points }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 gap-4">
        {data?.points?.map((point, index) => {
          return (
            <table key={index}>
              <thead>
                <tr className="bg-gray-200">
                  <th>Punto {point.point_number}</th>
                  <th className="border px-4 py-2">Iniciales</th>
                  <th className="border px-4 py-2">Finales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    <p>Temperatura ºC</p>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full text-center"
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
                      type="number"
                      className="w-full text-center"
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

                </tr>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    <p>Humedad Relativa %</p>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full text-center"
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
                      type="number"
                      className="w-full text-center"
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

                <tr>
                  <td className="border px-4 py-2 text-center">
                    <p>Presión hPa</p>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full text-center"
                      value={point.presion.initial}
                      onChange={(e) =>
                        handleEdit(
                          'presion.initial',
                          e.target.value,
                          point.point_number,
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full text-center"
                      value={point.presion.final}
                      onChange={(e) =>
                        handleEdit(
                          'presion.final',
                          e.target.value,
                          point.point_number,
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )
        })}
      </div>

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
