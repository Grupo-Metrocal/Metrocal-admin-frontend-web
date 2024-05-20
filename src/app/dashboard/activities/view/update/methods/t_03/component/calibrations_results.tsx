import { ICalibrationResults } from '../../../../[id]/interface/t_03'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import React, { useState } from 'react'

export const CalibrationsResults = ({
  calibrationResults,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: ICalibrationResults,
    url: string,
    useActivityID?: boolean,
  ) => void
  calibrationResults: ICalibrationResults
}) => {
  const url = `methods/ni-mcit-t-03/calibration-results/`
  const [data, setData] = useState(calibrationResults)

  const cycles = data?.results

  const consolidatedData = []
  const maxLength = Math.max(
    ...cycles.map((cycle) => cycle.calibration_factor.length),
  )

  for (let i = 0; i < maxLength; i++) {
    const row = { pattern: null, cycle1: {}, cycle2: {} }
    cycles.forEach((cycle) => {
      const factor = cycle.calibration_factor[i]
      if (factor) {
        if (cycle.cicle_number === 1) {
          row.pattern = factor.pattern
          row.cycle1 = factor
        } else if (cycle.cicle_number === 2) {
          row.cycle2 = factor
        }
      }
    })
    consolidatedData.push(row)
  }

  const handleEdit = (
    key: string,
    field: string,
    value: number | string,
    cycleNumber: number,
    direction: 'upward' | 'downward',
    index: number,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prevData) => ({
      ...prevData,
      results: prevData.results.map((result) => {
        if (result.cicle_number === cycleNumber) {
          return {
            ...result,
            calibration_factor: result.calibration_factor.map((factor, i) => {
              if (i === index) {
                return {
                  ...factor,
                  [direction]: {
                    ...factor[direction],
                    [field]: value,
                  },
                }
              }
              return factor
            }),
          }
        }
        return result
      }),
    }))
  }

  const handlePatternEdit = (
    value: number | string,
    cycleNumber: number,
    index: number,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prevData) => ({
      ...prevData,
      results: prevData.results.map((result) => {
        if (result.cicle_number === cycleNumber) {
          return {
            ...result,
            calibration_factor: result.calibration_factor.map((factor, i) => {
              if (i === index) {
                return {
                  ...factor,
                  pattern: value,
                }
              }
              return factor
            }),
          }
        }
        return result
      }),
    }))
  }

  const handleConvertAllDataToNumber = () => {
    const newData = data.results.map((result) => {
      const newCalibrationFactor = result.calibration_factor.map((factor) => {
        return {
          ...factor,
          pattern: Number(factor.pattern),
          upward: {
            equipment: Number(factor.upward.equipment),
          },
          downward: {
            equipment: Number(factor.downward.equipment),
          },
        }
      })
      return {
        ...result,
        calibration_factor: newCalibrationFactor,
      }
    })

    console.log({ newData })

    return {
      ...data,
      results: newData,
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 border p-4">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-400 p-2 bg-gray-200"
              >
                Indicación
              </th>
              <th
                colSpan={2}
                className="border border-gray-400 p-2 bg-gray-200"
              >
                Ciclo 1
              </th>
              <th
                colSpan={2}
                className="border border-gray-400 p-2 bg-gray-200"
              >
                Ciclo 2
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Ascendente
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Descendente
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Ascendente
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Descendente
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 text-center">Patrón</td>
              {data?.results.map(() => {
                return (
                  <>
                    <td className="border border-gray-400 p-2 text-center">
                      Equipo
                    </td>
                    <td className="border border-gray-400 p-2 text-center">
                      Equipo
                    </td>
                  </>
                )
              })}
            </tr>

            {consolidatedData.map((row: any, i: number) => {
              return (
                <tr key={i}>
                  <td className="border border-gray-400 p-2 text-center">
                    <input
                      type="text"
                      value={row.pattern}
                      onChange={(e) => handlePatternEdit(e.target.value, 1, i)}
                      className="w-full text-center"
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <input
                      type="text"
                      value={row.cycle1.upward.equipment}
                      onChange={(e) =>
                        handleEdit(
                          'equipment',
                          'equipment',
                          e.target.value,
                          1,
                          'upward',
                          i,
                        )
                      }
                      className="w-full text-center"
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <input
                      type="text"
                      value={row.cycle1.downward.equipment}
                      onChange={(e) =>
                        handleEdit(
                          'equipment',
                          'equipment',
                          e.target.value,
                          1,
                          'downward',
                          i,
                        )
                      }
                      className="w-full text-center"
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <input
                      type="text"
                      value={row.cycle2.upward.equipment}
                      onChange={(e) =>
                        handleEdit(
                          'equipment',
                          'equipment',
                          e.target.value,
                          2,
                          'upward',
                          i,
                        )
                      }
                      className="w-full text-center"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="text"
                      value={row.cycle2.downward.equipment}
                      onChange={(e) =>
                        handleEdit(
                          'equipment',
                          'equipment',
                          e.target.value,
                          2,
                          'downward',
                          i,
                        )
                      }
                      className="w-full text-center"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => {
            handleSaveInformation(handleConvertAllDataToNumber(), url)
          }}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
