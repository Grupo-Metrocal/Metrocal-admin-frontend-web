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

  return (
    <div className="flex flex-col space-y-4">
      <table>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patrón 1
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipo 1
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patrón 2
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipo 2
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patrón 3
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipo 3
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.medition?.map((medition, index) => (
            <tr key={index}>
              <td>
                <input
                  style={{ textAlign: 'center' }}
                  type="number"
                  value={medition.patron1 ?? 0}
                  onChange={(e) => {
                    const newMedition = [...data.medition]
                    newMedition[index].patron1 = Number(e.target.value)
                    setData({ ...data, medition: newMedition })
                  }}
                />
              </td>
              <td>
                <input
                  style={{ textAlign: 'center' }}
                  type="number"
                  value={medition.equiopo1 ?? 0}
                  onChange={(e) => {
                    const newMedition = [...data.medition]
                    newMedition[index].equiopo1 = Number(e.target.value)
                    setData({ ...data, medition: newMedition })
                  }}
                />
              </td>

              <td>
                <input
                  style={{ textAlign: 'center' }}
                  type="number"
                  value={medition.patron2 ?? 0}
                  onChange={(e) => {
                    const newMedition = [...data.medition]
                    newMedition[index].patron2 = Number(e.target.value)
                    setData({ ...data, medition: newMedition })
                  }}
                />
              </td>
              <td>
                <input
                  style={{ textAlign: 'center' }}
                  type="number"
                  value={medition.equiopo2 ?? 0}
                  onChange={(e) => {
                    const newMedition = [...data.medition]
                    newMedition[index].equiopo2 = Number(e.target.value)
                    setData({ ...data, medition: newMedition })
                  }}
                />
              </td>
              <td>
                <input
                  style={{ textAlign: 'center' }}
                  type="number"
                  value={medition.patron3 ?? 0}
                  onChange={(e) => {
                    const newMedition = [...data.medition]
                    newMedition[index].patron3 = Number(e.target.value)
                    setData({ ...data, medition: newMedition })
                  }}
                />
              </td>
              <td>
                <input
                  style={{ textAlign: 'center' }}
                  type="number"
                  value={medition.equiopo3 ?? 0}
                  onChange={(e) => {
                    const newMedition = [...data.medition]
                    newMedition[index].equiopo3 = Number(e.target.value)
                    setData({ ...data, medition: newMedition })
                  }}
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
          onConfirm={() => handleSaveInformation(data, url)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
