import React, { useState } from 'react'
import { IInstrumentzerocheck } from '../../../../[id]/interface/d_02'
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
  const url = `methods/ni-mcit-d-02/instrument-zero-check/`
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
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Valor nominal</th>
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
          <tr>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="text"
                value={data?.nominal_value}
                onChange={handleNominalValueChange}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x1 ?? 0}
                onChange={(e) => handleInputChange(e, 'x1')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x2 ?? 0}
                onChange={(e) => handleInputChange(e, 'x2')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x3 ?? 0}
                onChange={(e) => handleInputChange(e, 'x3')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x4 ?? 0}
                onChange={(e) => handleInputChange(e, 'x4')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x5 ?? 0}
                onChange={(e) => handleInputChange(e, 'x5')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x6 ?? 0}
                onChange={(e) => handleInputChange(e, 'x6')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x7 ?? 0}
                onChange={(e) => handleInputChange(e, 'x7')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x8 ?? 0}
                onChange={(e) => handleInputChange(e, 'x8')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x9 ?? 0}
                onChange={(e) => handleInputChange(e, 'x9')}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="number"
                step="1"
                value={data.x10 ?? 0}
                onChange={(e) => handleInputChange(e, 'x10')}
              />
            </td>
          </tr>
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
