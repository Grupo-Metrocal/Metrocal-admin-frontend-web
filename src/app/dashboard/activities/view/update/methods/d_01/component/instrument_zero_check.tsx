import React, { useState } from 'react'
import { IInstrumentzerocheck } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const InstrumentZeroCheck = ({
  instrumentalZeroCheck,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IInstrumentzerocheck,
    url: string,
    useActivityID?: boolean,
  ) => void
  instrumentalZeroCheck: IInstrumentzerocheck
}) => {
  const url = `methods/ni-mcit-d-01/instrument-zero-check/`
  const [data, setData] = useState<IInstrumentzerocheck>({
    ...instrumentalZeroCheck,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Omit<IInstrumentzerocheck, 'id' | 'nominal_value'>,
  ) => {
    setData({ ...data, [key]: parseFloat(e.target.value) })
  }

  const handleNominalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, nominal_value: parseFloat(e.target.value) })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Valor nominal</th>
              <th className="border px-4 py-2">x1</th>
              <th className="border px-4 py-2">x2</th>
              <th className="border px-4 py-2">x3</th>
              <th className="border px-4 py-2">x4</th>
              <th className="border px-4 py-2">x5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="text"
                  value={data.nominal_value}
                  onChange={handleNominalValueChange}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={data.x1}
                  onChange={(e) => handleInputChange(e, 'x1')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={data.x2}
                  onChange={(e) => handleInputChange(e, 'x2')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={data.x3}
                  onChange={(e) => handleInputChange(e, 'x3')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={data.x4}
                  onChange={(e) => handleInputChange(e, 'x4')}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="number"
                  step="0.001"
                  value={data.x5}
                  onChange={(e) => handleInputChange(e, 'x5')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
