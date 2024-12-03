import { useState } from 'react'
import { IResultMedition } from '../../../../[id]/interface/generic_method'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const ResultMedition = ({
  result_medition,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IResultMedition,
    url: string,
    useActivityID?: boolean,
  ) => void
  result_medition: IResultMedition
}) => {
  const url = `methods/generic-method/results-medition/`
  const [data, setData] = useState(result_medition)

  const handleEdit = (
    section: any,
    field: any,
    value: any,
    rowIndex: any,
    cellIndex: any,
  ) => {
    if (isNaN(value)) {
      return
    }

    setData((prev) => {
      const updatedData = { ...prev }
      updatedData.meditions[rowIndex].medition[cellIndex][field] = value
      return updatedData
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 border p-4">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="header-row">
              <th colSpan={10} className="p-2">
                Resultados de mediciones
              </th>
            </tr>
            <tr className="subheader-row">
              <th className="border border-gray-400 p-2 bg-gray-200">
                Patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Equipo
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Equipo
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Patrón
              </th>
              <th className="border border-gray-400 p-2 bg-gray-200">
                Equipo
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.meditions?.map((result, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {result?.medition?.map((key, cellIndex) => {
                    return (
                      <>
                        <td className="border border-gray-400 p-2">
                          <input
                            className="w-full text-center"
                            type="text"
                            value={key.patron}
                            onChange={(e) =>
                              handleEdit(
                                'medition',
                                'patron',
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        </td>
                        <td className="border border-gray-400 p-2">
                          <input
                            className="w-full text-center"
                            type="text"
                            value={key.equipment}
                            onChange={(e) =>
                              handleEdit(
                                'medition',
                                'equipment',
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        </td>
                      </>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => {
            handleSaveInformation(data, url)
          }}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
