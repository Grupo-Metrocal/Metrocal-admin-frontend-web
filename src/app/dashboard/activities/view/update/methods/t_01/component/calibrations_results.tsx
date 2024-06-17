import { ICalibrationResults } from '../../../../[id]/interface/t_01'
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
  const url = `methods/ni-mcit-t-01/calibration-results/`
  const [data, setData] = useState(calibrationResults)

  const handleEdit = (
    section: any,
    field: any,
    value: any,
    rowIndex: any,
    cellIndex: any,
  ) => {
    if (isNaN(value)) {
      return
    }

    setData((prev) => {
      const updatedData = { ...prev }
      updatedData.results[rowIndex].indication_linear[cellIndex][field] = value
      return updatedData
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 border p-4">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="header-row">
              <th colSpan={10} className="p-2">
                Linealidad
              </th>
            </tr>
            <tr className="subheader-row">
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación termómetro
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación termómetro
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Indicación termómetro
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((result, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {result?.indication_linear?.map((key, cellIndex) => {
                    return (
                      <>
                        <td className="border border-gray-400 p-2">
                          <input
                            className="w-full text-center"
                            type="text"
                            value={key.patron}
                            onChange={(e) =>
                              handleEdit(
                                'indication_linear',
                                'patron',
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        </td>
                        <td className="border border-gray-400 p-2">
                          <input
                            className="w-full text-center"
                            type="text"
                            value={key.thermometer}
                            onChange={(e) =>
                              handleEdit(
                                'indication_linear',
                                'thermometer',
                                e.target.value,
                                rowIndex,
                                cellIndex,
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
      </div>

      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => {
            handleSaveInformation(data, url)
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
