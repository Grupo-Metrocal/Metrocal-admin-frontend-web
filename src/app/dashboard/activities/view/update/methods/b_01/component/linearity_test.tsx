import { useState } from 'react'
import { ILinearityTest } from '../../../../[id]/interface/b_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const LinearityTest = ({
  linearityTest,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: ILinearityTest,
    url: string,
    useActivityID?: boolean,
  ) => void
  linearityTest: ILinearityTest
}) => {
  const url = `methods/ni-mcit-b-01/linearity-test/`

  const defaultLinearityTest: ILinearityTest = {
    linearity_test: [
      {
        point: 0,
        indicationIL: 0,
        noLoadInfdication: 0,
        pointsComposition: [],
      },
    ],
  }
  const [data, setData] = useState<ILinearityTest>(
    linearityTest || defaultLinearityTest,
  )

  const handleInputChange = (
    newValue: number | string | string[],
    field: string,
    index: number,
  ) => {
    setData((prevData: ILinearityTest) => ({
      ...prevData,
      linearity_test: prevData.linearity_test.map((item, idx) => {
        if (idx === index) {
          return { ...item, [field]: newValue }
        }
        return item
      }),
    }))
  }

  const handleAddRow = () => {
    setData((prevData) => ({
      ...prevData,
      linearity_test: [
        ...(Array.isArray(prevData.linearity_test) ? prevData.linearity_test : []),
        {
          point: 0,
          indicationIL: 0,
          noLoadInfdication: 0,
          pointsComposition: [],
        },
      ],
    }))
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Punto</th>
            <th className="border px-4 py-2">Composición de puntos</th>
            <th className="border px-4 py-2">Indicación IL</th>
            <th className="border px-4 py-2">Sin indicación de carga</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.linearity_test)
            ? data.linearity_test.map((test, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">
                    <input
                      className="w-full p-1 border rounded"
                      type="text"
                      value={test.point}
                      onChange={(e) =>
                        handleInputChange(e.target.value, 'point', index)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full p-1 border rounded"
                      type="text"
                      value={test.pointsComposition.join(', ')}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value.split(', '),
                          'pointsComposition',
                          index,
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full p-1 border rounded"
                      type="text"
                      value={test.indicationIL}
                      onChange={(e) =>
                        handleInputChange(e.target.value, 'indicationIL', index)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full p-1 border rounded"
                      type="text"
                      value={test.noLoadInfdication}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
                          'noLoadInfdication',
                          index,
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Agregar Fila
      </button>
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
  )
}
