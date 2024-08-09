import { useState } from 'react'
import { IAccuracyTest } from '../../../../[id]/interface/d_02'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const AccuracyTest = ({
  accuracyTest,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IAccuracyTest,
    url: string,
    useActivityID?: boolean,
  ) => void
  accuracyTest: IAccuracyTest
}) => {
  const url = `methods/ni-mcit-d-02/accuracy-test/`
  const [data, setData] = useState<IAccuracyTest>({
    ...(accuracyTest || {
      measureD02: [
        {
          nominal_value: [],
          varification_lengths: {
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
            x6: 0,
            x7: 0,
            x8: 0,
            x9: 0,
            x10: 0,
          },
        },

      ]
    }),
  })

  type VerificationLengthKeys =
    | 'x1'
    | 'x2'
    | 'x3'
    | 'x4'
    | 'x5'
    | 'x6'
    | 'x7'
    | 'x8'
    | 'x9'
    | 'x10'

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    key: VerificationLengthKeys,
  ) => {
    const newData = { ...data }
    newData.measureD02[idx].varification_lengths[key] = parseFloat(
      e.target.value,
    )
    setData(newData)
  }

  const handleNominalValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const newData = { ...data }
    newData.measureD02[idx].nominal_value = e.target.value.split(',')
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
            <th className="border px-4 py-2">x6</th>
            <th className="border px-4 py-2">x7</th>
            <th className="border px-4 py-2">x8</th>
            <th className="border px-4 py-2">x9</th>
            <th className="border px-4 py-2">x10</th>
          </tr>
        </thead>
        <tbody>
          {data?.measureD02?.map((measurement, idx) => (
            <tr className="text-center" key={idx}>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="text"
                  value={measurement.nominal_value.join(',')}
                  onChange={(e) => handleNominalValueChange(e, idx)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x1}
                  onChange={(e) => handleInputChange(e, idx, 'x1')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x2}
                  onChange={(e) => handleInputChange(e, idx, 'x2')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x3}
                  onChange={(e) => handleInputChange(e, idx, 'x3')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x4}
                  onChange={(e) => handleInputChange(e, idx, 'x4')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x5}
                  onChange={(e) => handleInputChange(e, idx, 'x5')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x6}
                  onChange={(e) => handleInputChange(e, idx, 'x6')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x7}
                  onChange={(e) => handleInputChange(e, idx, 'x7')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x8}
                  onChange={(e) => handleInputChange(e, idx, 'x8')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x9}
                  onChange={(e) => handleInputChange(e, idx, 'x9')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={measurement.varification_lengths.x10}
                  onChange={(e) => handleInputChange(e, idx, 'x10')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
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
    </div>
  )
}
