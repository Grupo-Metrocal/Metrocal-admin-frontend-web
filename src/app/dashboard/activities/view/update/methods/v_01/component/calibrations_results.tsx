import { ICalibrationResults } from '../../../../[id]/interface/v_01'
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
  const url = `methods/ni-mcit-v-01/calibration-results/`
  const [data, setData] = useState(calibrationResults)

  const handleEdit = (
    field: string,
    value: number | string,
    cycleNumber: number,
    calibrationIndex: number,
  ) => {
    const numericValue = Number(value)
    if (isNaN(numericValue)) {
      return
    }

    setData((prev) => {
      const results = prev.results?.map((result) => {
        if (result.point_number === cycleNumber) {
          if (field === 'nominal_value') {
            return {
              ...result,
              nominal_value: Number(value)
            }
          }
          const calibrations = result.calibrations.map((calibration, index) => {
            if (index === calibrationIndex) {

              if (field === 'pattern_dough.full') {
                return {
                  ...calibration,
                  pattern_dough: {
                    ...calibration.pattern_dough,
                    full: numericValue,
                  },
                }
              } else if (field === 'pattern_dough.empty') {
                return {
                  ...calibration,
                  pattern_dough: {
                    ...calibration.pattern_dough,
                    empty: numericValue,
                  },
                }
              } else if (field === 'water_temperature') {
                return {
                  ...calibration,
                  water_temperature: numericValue,
                }
              }
            }
            return calibration
          })
          return { ...result, calibrations }
        }
        return result
      })
      return { ...prev, results }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 gap-4">
        {data?.results?.map((result, index) => {
          return (
            <>
              <span className="border border-gray-400 p-2 w-full block text-center">
                Punto {result.point_number}
              </span>
              <div>
                <label htmlFor="">Valor nominal</label>
                <input
                  type="number"
                  className="w-full border-2 p-2 text-start rounded"
                  placeholder='Ingrese el valor'
                  value={result.nominal_value}
                  onChange={(e) =>
                    handleEdit(
                      'nominal_value',
                      e.target.value,
                      result.point_number,
                      index
                    )
                  }
                />
              </div>

              <table
                className="min-w-full border-collapse border border-gray-400"
                key={index}
              >
                <thead>

                  <tr>
                    <th
                      rowSpan={2}
                      className="border border-gray-400 p-2 bg-gray-200"
                    >
                      Numero de mediciones
                    </th>

                    <th
                      colSpan={2}
                      className="border border-gray-400 p-2 bg-gray-200"
                    >
                      Masa del patrón
                    </th>

                    <th className="border border-gray-400 p-2 bg-gray-200">
                      Densidad del agua
                    </th>
                  </tr>

                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-200">
                      Lleno
                    </th>
                    <th className="border border-gray-400 p-2 bg-gray-200">
                      Vacio
                    </th>
                    <th className="border border-gray-400 p-2 bg-gray-200">
                      Agua
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {result.calibrations.map((calibration, calibrationIndex) => {
                    return (
                      <tr key={calibrationIndex}>
                        <td className="border border-gray-400 p-2 text-center">
                          {calibrationIndex + 1}
                        </td>
                        <td className="border border-gray-400 p-2">
                          <input
                            type="number"
                            className="w-full text-center"
                            value={calibration.pattern_dough.full}
                            onChange={(e) =>
                              handleEdit(
                                'pattern_dough.full',
                                e.target.value,
                                result.point_number,
                                calibrationIndex,
                              )
                            }
                          />
                        </td>
                        <td className="border border-gray-400 p-2">
                          <input
                            type="number"
                            className="w-full text-center"
                            value={calibration.pattern_dough.empty}
                            onChange={(e) =>
                              handleEdit(
                                'pattern_dough.empty',
                                e.target.value,
                                result.point_number,
                                calibrationIndex,
                              )
                            }
                          />
                        </td>
                        <td className="border border-gray-400 p-2">
                          <input
                            type="number"
                            className="w-full text-center"
                            value={calibration.water_temperature}
                            onChange={(e) =>
                              handleEdit(
                                'water_temperature',
                                e.target.value,
                                result.point_number,
                                calibrationIndex,
                              )
                            }
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody >
              </table>
            </>
          )
        })
        }
      </div >

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
