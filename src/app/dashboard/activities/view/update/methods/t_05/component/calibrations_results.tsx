import { Calibration, ICalibrationResults, Result } from '../../../../[id]/interface/t_05'
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
    field: 'temperature' | 'initial' | 'final',
    value: number | string,
    row: number | string,
    point_number: number,
  ) => {
    if (isNaN(value as number)) {
      return
    }

    setData((prevState) => {
      const newResult = prevState.results.map((result) => {
        if (field === 'temperature') {
          if (result?.point_number === point_number) {
            result.temperature = value as number
          }
        }

        if (field === 'initial') {
          if (result?.point_number === point_number) {
            result.calibrations.map((calibration, index) => {
              if (row === index) {
                calibration.initial = value as number
              }

              return calibration
            })
          }
        }

        if (field === 'final') {
          if (result?.point_number === point_number) {
            result.calibrations.map((calibration, index) => {
              if (row === index) {
                calibration.final = value as number
              }

              return calibration
            })
          }
        }

        return result
      })

      return { ...prevState, results: newResult }
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="min-w-full p-4 bg-gray-50 rounded-lg">
        <header className="flex gap-4 mb-4">
          <section className="flex items-center justify-center border border-gray-300 bg-white p-3 w-[150px] rounded-md shadow-sm">
            <span className="text-center font-semibold text-gray-800">
              Temperatura
            </span>
          </section>

          <section className="flex gap-6 w-full overflow-x-auto">
            {data.results.map((result: Result) => (
              <div
                className="flex flex-col w-full max-w-[140px] p-2 border border-gray-300 bg-white rounded-md shadow-sm"
                key={result?.point_number}
              >
                <span className="text-center font-semibold text-gray-700 mb-2">
                  Punto {result?.point_number === -1 ? '1 final' : result?.point_number}
                </span>
                <div className="flex justify-between items-center gap-2">
                  <span className="border border-gray-300 w-full text-center py-1 bg-gray-100 rounded-md">
                    Lp
                  </span>
                  <span className="border border-gray-300 w-full text-center py-1 bg-gray-100 rounded-md">
                    Libc
                  </span>
                </div>
              </div>
            ))}
          </section>
        </header>

        <section className="flex w-full gap-4">
          <div className="flex flex-col w-[150px] gap-2">
            {data.results.map((result) => (
              <input
                className="p-2 text-center w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                type="number"
                value={result.temperature}
                key={result?.point_number}
                onChange={(e) => handleEdit('temperature', e.currentTarget.value, '', result?.point_number)}
              />
            ))}
          </div>

          <div className="flex w-full gap-6 overflow-x-auto">
            {data.results.map((result) => (
              <div
                className="flex flex-col w-full max-w-[140px] gap-2"
                key={result?.point_number}
              >
                {result.calibrations.map((calibration: Calibration, index: number) => (
                  <div
                    className="w-full flex justify-between gap-2"
                    key={index}
                  >
                    <input
                      className="border border-gray-300 w-full text-center p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                      type="number"
                      value={calibration.initial}
                      onChange={(e) => handleEdit('initial', e.currentTarget.value, index, result?.point_number)}

                    />
                    <input
                      className="border border-gray-300 w-full text-center p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                      type="number"
                      value={calibration.final}
                      onChange={(e) => handleEdit('final', e.currentTarget.value, index, result?.point_number)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
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

