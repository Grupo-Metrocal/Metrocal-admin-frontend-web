import { useState } from 'react'
import { ILinearityTest } from '../../../../[id]/interface/b_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { linearityOptions } from '../constans/linearityOptions'
import { usePattern } from '@/app/dashboard/settings/patterns/[calibration_method]/_hooks/usePattern'

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

  const [data, setData] = useState<ILinearityTest>(
    linearityTest,
  )

  const { patterns } = usePattern('NI-MCIT-B-01')

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

  const handleSelectChange = (
    newValue: string,
    index: number,
    itemIndex: number
  ) => {
    setData((prevData: ILinearityTest) => ({
      ...prevData,
      linearity_test: prevData.linearity_test.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            pointsComposition: item.pointsComposition.map((composition, i) =>
              i === itemIndex ? newValue : composition
            ),
          };
        }
        return item;
      }),
    }));
  };


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
                  {test.pointsComposition.map((item, itemIndex) => {
                    return (
                      <select
                        key={itemIndex}
                        className="flex flex-col"
                        value={item}
                        onChange={(e) =>
                          handleSelectChange(e.target.value, index, itemIndex)
                        }
                      >
                        {patterns?.map((pattern, patternIndex) => (
                          <option key={patternIndex} disabled={!pattern.status} value={pattern.code}>
                            {pattern.code} - {pattern.type}
                          </option>
                        ))}
                      </select>
                    );
                  })}
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
      {/* <button
        onClick={handleAddRow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Agregar Fila
      </button> */}
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

