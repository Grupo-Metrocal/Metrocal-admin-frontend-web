'use client'
import { useState } from 'react'
import { IExterior_measurement_accuracy } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

interface IExteriorMeasurementAccuracyProps {
  handleSaveInformation: (
    values: IExterior_measurement_accuracy,
    url: string,
    useActivityID?: boolean,
  ) => void
  exteriorMeasurementAccuracy: IExterior_measurement_accuracy
}

export const ExteriorMeasurementAccuracy = ({
  exteriorMeasurementAccuracy,
  handleSaveInformation,
}: IExteriorMeasurementAccuracyProps) => {
  const url = `methods/ni-mcit-d-01/exterior-measurement-accuracy/`
  const [data, setData] = useState<IExterior_measurement_accuracy>({
    ...exteriorMeasurementAccuracy,
  })


  type VerificationLengthKeys = 'x1' | 'x2' | 'x3' | 'x4' | 'x5';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    key: VerificationLengthKeys,
  ) => {
    const newData = { ...data }
    newData.measure[idx].verification_lengths[key] = parseFloat(e.target.value)
    setData(newData)
  }

  const handleNominalValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const newData = { ...data }
    newData.measure[idx].nominal_patron_value = e.target.value.split(',')
    setData(newData)
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nominal Patron Value</th>
            <th className="border px-4 py-2">x1</th>
            <th className="border px-4 py-2">x2</th>
            <th className="border px-4 py-2">x3</th>
            <th className="border px-4 py-2">x4</th>
            <th className="border px-4 py-2">x5</th>
          </tr>
        </thead>
        <tbody>
          {data.measure.map((measurement, idx) => (
            <tr className="text-center" key={idx}>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="text"
                  value={measurement.nominal_patron_value.join(',')}
                  onChange={(e) => handleNominalValueChange(e, idx)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.verification_lengths.x1}
                  onChange={(e) => handleInputChange(e, idx, 'x1')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.verification_lengths.x2}
                  onChange={(e) => handleInputChange(e, idx, 'x2')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.verification_lengths.x3}
                  onChange={(e) => handleInputChange(e, idx, 'x3')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.verification_lengths.x4}
                  onChange={(e) => handleInputChange(e, idx, 'x4')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.verification_lengths.x5}
                  onChange={(e) => handleInputChange(e, idx, 'x5')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertDialogModal
        title="Guardar modificaciones"
        description="¿Estás seguro de guardar las modificaciones?"
        onConfirm={() => handleSaveInformation(data, url, true)}
        nameButton="Guardar modificaciones"
        buttonStyle={{
          margin: '1em 0',
        }}
      />
    </div>
  )
}
