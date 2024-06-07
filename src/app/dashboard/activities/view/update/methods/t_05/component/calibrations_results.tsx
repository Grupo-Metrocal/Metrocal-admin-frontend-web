import { ICalibrationResults } from '../../../../[id]/interface/t_05'
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
  const url = `methods/ni-mcit-t-05/calibration-results/`
  const [data, setData] = useState(calibrationResults)

  const handleEdit = (
    field: string,
    value: number | string,
    temperature: number | string,
    cycleNumber: number,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prev) => {
      const results = prev.results.map((result) => {
        if (result.temperature === temperature) {
          const calibrations = result.calibrations.map((calibration) => {
            if (calibration.point_number === cycleNumber) {
              if (field === 'initial') {
                calibration.initial = value as number
              } else if (field === 'final') {
                calibration.final = value as number
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

  const handleChangeTemperature = (
    value: number | string,
    temperature: number | string,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prev) => {
      const results = prev.results.map((result) => {
        if (result.temperature === temperature) {
          return { ...result, temperature: value as number }
        }
        return result
      })
      return { ...prev, results }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th rowSpan={2} className="border border-gray-400 p-2 bg-gray-200">
              Temperatura
            </th>

            {data?.results[0]?.calibrations?.map((result) => {
              return (
                <th
                  colSpan={2}
                  className="border border-gray-400 p-2 bg-gray-200"
                  key={result.point_number}
                >
                  Punto{' '}
                  {result.point_number === -1 ? '1 Final' : result.point_number}
                </th>
              )
            })}
          </tr>
          <tr>
            {data?.results[0]?.calibrations?.map((result) => {
              return (
                <React.Fragment key={result.point_number}>
                  <th className="border border-gray-400 p-2 bg-gray-200">
                    Inicial
                  </th>
                  <th className="border border-gray-400 p-2 bg-gray-200">
                    Final
                  </th>
                </React.Fragment>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((result) => {
            return (
              <tr key={result?.temperature}>
                <td className="border border-gray-400 p-2 text-center">
                  <input
                    type="text"
                    value={result.temperature}
                    className="w-[80px] text-center"
                    onChange={(e) => {
                      handleChangeTemperature(
                        e.target.value,
                        result.temperature,
                      )
                    }}
                  />
                </td>

                {result?.calibrations.map((calibration) => {
                  return (
                    <>
                      <td className="border border-gray-400 p-2 text-center">
                        <input
                          type="text"
                          value={calibration?.initial}
                          className="w-[60px] text-center"
                          onChange={(e) =>
                            handleEdit(
                              'initial',
                              e.target.value,
                              result.temperature,
                              calibration.point_number,
                            )
                          }
                        />
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        <input
                          type="text"
                          value={calibration?.final}
                          className="w-[60px] text-center"
                          onChange={(e) =>
                            handleEdit(
                              'final',
                              e.target.value,
                              result.temperature,
                              calibration.point_number,
                            )
                          }
                        />
                      </td>
                    </>
                  )
                })}
              </tr>
            )
          })}
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
