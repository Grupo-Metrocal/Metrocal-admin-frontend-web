import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useState } from 'react'

export const DescriptionPattern = ({
  description_pattern,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IDescriptionPattern,
    url: string,
    useActivityID?: boolean,
  ) => void
  description_pattern: IDescriptionPattern
}) => {
  const { values, handleInputChange } = useForm({ ...description_pattern })
  const url = `methods/ni-mcit-d-01/description-pattern/`

  const [patterns, setPatterns] = useState<string[]>(values.descriptionPatterns || [])

  const handlePatternChange = (index: number, value: string) => {
    const updatedPatterns = [...patterns]
    updatedPatterns[index] = value
    setPatterns(updatedPatterns)
    handleInputChange({ ...values, descriptionPatterns: updatedPatterns })
  }

  const handleAddPattern = () => {
    const updatedPatterns = [...patterns, '']
    setPatterns(updatedPatterns)
    handleInputChange({ ...values, descriptionPatterns: updatedPatterns })
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="w-full table-auto">
        <thead>
          {/* <tr className="bg-gray-200">
            <th className="border px-4 py-2">Patrón utilizado</th>
          </tr> */}
        </thead>
        <tbody>
          {patterns?.map((pattern, index) => (
            <tr key={index}>
              {/* <td className="border px-4 py-2">
                <input
                  className="w-full p-1 border rounded"
                  type="text"
                  value={pattern}
                  onChange={(e) => handlePatternChange(index, e.target.value)}
                  placeholder="Ingrese el patrón"
                />
              </td> */}

              <div className="flex flex-col gap-[1em]">
                <label htmlFor="unit" className="text-xs font-semibold ">
                  Patrón utilizado
                </label>
                <select
                  name="pattern"
                  id="pattern"
                  defaultValue={values.pattern}
                  value={pattern}
                  onChange={(e) => handlePatternChange(index, e.target.value)}
                  placeholder="Ingrese el patrón"
                  className="border border-gray-300 rounded-md p-2 h-fit"
                >
                  <option value="NI-MCPD-02">NI-MCPD-02</option>
                  <option value="NI-MCPD-03">NI-MCPD-03</option>
                </select>
              </div>
            </tr>
          ))}
          {/* <tr>
            <td className="border px-4 py-2">
              <button onClick={handleAddPattern}>Agregar patrón</button>
            </td>
          </tr> */}
        </tbody>
      </table>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() =>
            handleSaveInformation(
              { ...values, descriptionPatterns: patterns },
              url,
              false,
            )
          }
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
