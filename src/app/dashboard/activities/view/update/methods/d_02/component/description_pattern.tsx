import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/d_02'
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
  const url = `methods/ni-mcit-d-02/description-pattern/`

  const [patterns, setPatterns] = useState<string[]>(values.descriptionPattern || [])

  const handlePatternChange = (index: number, value: string) => {
    const updatedPatterns = [...patterns]
    updatedPatterns[index] = value
    setPatterns(updatedPatterns)
    handleInputChange({ ...values, descriptionPattern: updatedPatterns })
  }

  const handleAddPattern = () => {
    const updatedPatterns = [...patterns, '']
    setPatterns(updatedPatterns)
    handleInputChange({ ...values, descriptionPattern: updatedPatterns })
  }
  return (
    <div className="flex flex-col space-y-4">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Patrón utilizado</th>
        </tr>
      </thead>
      <tbody>
        {patterns?.map((pattern, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">
              <input
                className="w-full p-1 border rounded"
                type="text"
                value={pattern}
                onChange={(e) => handlePatternChange(index, e.target.value)}
                placeholder="Ingrese el patrón"
              />
            </td>
          </tr>
        ))}
        <tr>
          <td className="border px-4 py-2">
            <button onClick={handleAddPattern}>Agregar patrón</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <AlertDialogModal
        title="Guardar modificaciones"
        description="¿Estás seguro de guardar las modificaciones?"
        onConfirm={() =>
          handleSaveInformation(
            { ...values, descriptionPattern: patterns },
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