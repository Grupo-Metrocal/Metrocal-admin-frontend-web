import { ICalibrationResults } from '../../../../[id]/interface/p_01'
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
  const url = `methods/ni-mcit-p-01/calibration-results/`
  const [data, setData] = useState(calibrationResults)

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

  return (
    <div className="flex flex-col space-y-4">
      {data?.results.map((result) => (
        <div
          key={result.cicle_number}
          className="flex flex-col space-y-4 border p-4"
        >
          <h2 className="text-xl font-bold">Ciclo {result.cicle_number}</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">Ascendente</h3>
              <div className="grid grid-cols-2 border p-2 text-center">
                <span className="">Patron</span>
                <span className="">Equipo</span>
              </div>

              {result.calibration_factor.map((factor, index) => (
                <div
                  key={index}
                  className="flex flex-col-2 gap-2 justify-center"
                >
                  <div className="flex">
                    <input
                      className="w-24 h-8 border rounded-md px-2"
                      type="text"
                      value={factor.upward.pattern}
                      onChange={(e) =>
                        handleEdit(
                          'pattern',
                          'pattern',
                          e.target.value,
                          result.cicle_number,
                          'upward',
                          index,
                        )
                      }
                    />
                  </div>
                  <div className="flex">
                    <input
                      className="w-24 h-8 border rounded-md px-2"
                      type="text"
                      value={factor.upward.equipment}
                      onChange={(e) =>
                        handleEdit(
                          'equipment',
                          'equipment',
                          e.target.value,
                          result.cicle_number,
                          'upward',
                          index,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">Descendente</h3>
              <div className="grid grid-cols-2 border p-2 text-center">
                <span>Patron</span>
                <span>Equipo</span>
              </div>
              {result.calibration_factor.map((factor, index) => (
                <div
                  key={index}
                  className="flex flex-col-2 gap-2 justify-center"
                >
                  <div className="flex">
                    <input
                      className="w-24 h-8 border rounded-md px-2"
                      type="text"
                      value={factor.downward.pattern}
                      onChange={(e) =>
                        handleEdit(
                          'pattern',
                          'pattern',
                          e.target.value,
                          result.cicle_number,
                          'downward',
                          index,
                        )
                      }
                    />
                  </div>
                  <div className="flex">
                    <input
                      className="w-24 h-8 border rounded-md`
                    px-2"
                      type="text"
                      value={factor.downward.equipment}
                      onChange={(e) =>
                        handleEdit(
                          'equipment',
                          'equipment',
                          e.target.value,
                          result.cicle_number,
                          'downward',
                          index,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

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
