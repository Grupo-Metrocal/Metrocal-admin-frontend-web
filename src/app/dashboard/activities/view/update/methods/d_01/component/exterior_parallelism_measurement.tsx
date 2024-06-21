'use client'
import React, { useState } from 'react'
import { IExteriorParallelismMeasurement } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const ExteriorParallelismMeasurement = ({
  exteriorParallelismMeasurement,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IExteriorParallelismMeasurement,
    url: string,
    useActivityID?: boolean,
  ) => void
  exteriorParallelismMeasurement: IExteriorParallelismMeasurement
}) => {
  const url = `methods/ni-mcit-d-01/exterior-parallelism-measurement/`
  const [data, setData] = useState<IExteriorParallelismMeasurement>({
    ...exteriorParallelismMeasurement || {measurements:[
      {
        point_number: [],
        verification_lengths: {
          Exterior: {
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
          },
          Interior: {
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
          },
        },
      },
    
    ]},
  })

  interface IMedition {
    x1: number
    x2: number
    x3: number
    x4: number
    x5: number
  }

  interface IPlaces {
    Exterior: IMedition
    Interior: IMedition
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof IMedition,
    place: keyof IPlaces,
  ) => {
    const newData = [...data.measurements]
    newData[index].verification_lengths[place][key] = parseFloat(e.target.value)
    setData({ ...data, measurements: newData })
  }

  const handlePointNumberChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newData = [...data.measurements]
    newData[index].point_number = e.target.value.split(',').map(num => num.trim())
    setData({ ...data, measurements: newData })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Numero de punto</th>
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
          {data.measurements?.map((measurement, index) => (
            <tr className="text-center" key={index}>
              <td className="border px-4 py-2">
                <textarea
                  className="w-full p-1 border text-center rounded"
                  value={measurement.point_number.join(', ')}
                  onChange={(e) => handlePointNumberChange(e, index)}
                />
              </td>
              {['x1', 'x2', 'x3', 'x4', 'x5'].map((key) => (
                <td className="border px-4 py-2" key={`${key}-exterior`}>
                  <input
                    className="w-full p-1 border text-center rounded"
                    type="number"
                    step="0.001"
                    value={
                      measurement.verification_lengths.Exterior[
                        key as keyof IMedition
                      ]
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        key as keyof IMedition,
                        'Exterior',
                      )
                    }
                  />
                </td>
              ))}
              {['x1', 'x2', 'x3', 'x4', 'x5'].map((key) => (
                <td className="border px-4 py-2" key={`${key}-interior`}>
                  <input
                    className="w-full p-1 border text-center rounded"
                    type="number"
                    step="0.001"
                    value={
                      measurement.verification_lengths.Interior[
                        key as keyof IMedition
                      ]
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        key as keyof IMedition,
                        'Interior',
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
