import { useState } from 'react'
import { IRepeatabilityTest } from '../../../../[id]/interface/b_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const RepeatabilityTest = ({
  repeatabilityTest,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    data: IRepeatabilityTest,
    url: string,
    useActivityID?: boolean,
  ) => void
  repeatabilityTest: IRepeatabilityTest
}) => {
  const url = `methods/ni-mcit-b-01/repeatability-test/`
  const [data, setData] = useState({
    ...repeatabilityTest,
  })

  const handleInputChange = (
    newValue: number | string,
    field: string,
    index: number,
  ) => {
    setData((prevData) => ({
      ...prevData,
      repeatability_test: prevData.repeatability_test.map((item, idx) => {
        if (idx === index) {
          return { ...item, [field]: newValue }
        }
        return item
      }),
    }))
  }

  const handleAddPoint = () => {
    setData((prevData) => ({
      ...prevData,
      pointNumber: prevData.pointNumber + 1,
      repeatability_test: [
        ...prevData.repeatability_test,
        {
          indicationIL: 0,
          noLoadInfdication: 0,
        },
      ],
    }))
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Indicación IL</th>
            <th className="border px-4 py-2">Sin indicación de carga</th>
          </tr>
        </thead>
        <tbody>
          {data.repeatability_test.map((test, index) => (
            <tr key={index} className="text-center">
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
          ))}
        </tbody>
      </table>
      <button onClick={handleAddPoint}>Agregar punto</button>
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
  )
}
