'use client'
import React, { useState } from 'react'
import { IInterior_parallelism_measurement } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const InteriorParallelismMeasurement = ({
  interiorParallelismMeasurement,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IInterior_parallelism_measurement,
    url: string,
    useActivityID?: boolean,
  ) => void
  interiorParallelismMeasurement: IInterior_parallelism_measurement
}) => {
  const url = `methods/ni-mcit-d-01/interior-parallelism-measurement/`
  const [data, setData] = useState({
    ...(interiorParallelismMeasurement || { measurementsd01: [
      {
        nominal_patron: '',
        verification_lengths: {
          Exteriors: {
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
          },
          Interiors: {
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
          },
        },
      },
    ] }),
  })

  const handleNominalPatronChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newData = [...data.measurementsd01]
    newData[index].nominal_patron = e.target.value
    setData({ ...data, measurementsd01: newData })
  }

  interface IMeditions {
    x1: number
    x2: number
    x3: number
    x4: number
    x5: number
  }

  interface IPlaces {
    Exteriors: IMeditions
    Interiors: IMeditions
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof IMeditions,
    place: keyof IPlaces,
  ) => {
    const newData = [...data.measurementsd01]
    newData[index].verification_lengths[place][key] = parseFloat(e.target.value)
    setData({ ...data, measurementsd01: newData })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nominal Patron</th>
            <th className="border px-4 py-2">Exterior x1</th>
            <th className="border px-4 py-2">Exterior x2</th>
            <th className="border px-4 py-2">Exterior x3</th>
            <th className="border px-4 py-2">Exterior x4</th>
            <th className="border px-4 py-2">Exterior x5</th>
            <th className="border px-4 py-2">Interior x1</th>
            <th className="border px-4 py-2">Interior x2</th>
            <th className="border px-4 py-2">Interior x3</th>
            <th className="border px-4 py-2">Interior x4</th>
            <th className="border px-4 py-2">Interior x5</th>
          </tr>
        </thead>
        <tbody>
          {data?.measurementsd01?.map((measurement, index) => (
            <tr className="text-center" key={index}>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border text-center rounded"
                  type="text"
                  value={measurement.nominal_patron}
                  onChange={(e) => handleNominalPatronChange(e, index)}
                />
              </td>
              {['x1', 'x2', 'x3', 'x4', 'x5'].map((key) => (
                <td className="border px-4 py-2" key={key}>
                  <input
                    className="w-full p-1 border text-center rounded"
                    type="number"
                    step="0.001"
                    value={
                      measurement.verification_lengths.Exteriors[
                        key as keyof IMeditions
                      ]
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        key as keyof IMeditions,
                        'Exteriors',
                      )
                    }
                  />
                </td>
              ))}
              {['x1', 'x2', 'x3', 'x4', 'x5'].map((key) => (
                <td className="border px-4 py-2" key={key}>
                  <input
                    className="w-full p-1 border text-center rounded"
                    type="number"
                    step="0.001"
                    value={
                      measurement.verification_lengths.Interiors[
                        key as keyof IMeditions
                      ]
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        key as keyof IMeditions,
                        'Interiors',
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(data, url, false)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
