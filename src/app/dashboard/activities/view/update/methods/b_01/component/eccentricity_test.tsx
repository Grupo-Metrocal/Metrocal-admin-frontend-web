import { useState } from 'react'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { IEccentricityTest } from '../../../../[id]/interface/b_01'

export const EccentricityTest = ({
  eccentricityTest,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    data: IEccentricityTest,
    url: string,
    useActivityID?: boolean,
  ) => void
  eccentricityTest: IEccentricityTest
}) => {
  
  const defaultEccentricityTest: IEccentricityTest = {
    pointNumber: 0,
    eccentricity_test: [
      {
        indicationIL: 0,
        noLoadInfdication: 0,
      },
    ],
  }

  const effectiveEccentricityTest = eccentricityTest || defaultEccentricityTest

  const url = `methods/ni-mcit-b-01/eccentricity-test/`
  const [data, setData] = useState({
    ...effectiveEccentricityTest,
    eccentricity_test: Array.isArray(
      effectiveEccentricityTest.eccentricity_test,
    )
      ? effectiveEccentricityTest.eccentricity_test
      : [],
  })

  const handleInputChange = (
    newValue: number | string,
    field: string,
    index: number,
  ) => {
    setData((prevData) => ({
      ...prevData,
      eccentricity_test: prevData.eccentricity_test.map((item, idx) => {
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
      eccentricity_test: [
        ...prevData.eccentricity_test,
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
          {' '}
          {Array.isArray(data?.eccentricity_test)
            ? data?.eccentricity_test?.map((test, index) => (
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
              ))
            : null}
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
