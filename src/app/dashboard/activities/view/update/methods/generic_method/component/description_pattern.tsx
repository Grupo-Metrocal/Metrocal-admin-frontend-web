import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/generic_method'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { usePattern } from '@/app/dashboard/settings/patterns/[calibration_method]/_hooks/usePattern'
import { formatMethodName } from '@/utils/formatMethodName'
import { CButton } from '@/components/CButton'
import { useState } from 'react'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'

export const DescriptionPattern = ({
  description_pattern,
  handleSaveInformation,
  equipment_id
}: {
  handleSaveInformation: (
    values: IDescriptionPattern,
    url: string,
    useActivityID?: boolean,
  ) => void
  description_pattern: IDescriptionPattern
  equipment_id: number
}) => {
  const { values, handleInputChange, handleSelectChange, setValues } = useForm({ ...description_pattern })
  const { patterns } = usePattern()

  const url = `methods/generic-method/description-pattern/${equipment_id}/`

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, checked } = e.target

    handleInputChange({ name, value: checked })
  }

  const addPattern = (newPattern: string) => {
    if (!newPattern) return toast('Seleecione un patron')

    setValues((prevData: IDescriptionPattern) => {
      if (prevData.patterns?.includes(newPattern)) {
        toast('El patron ya existe')
        return prevData;
      }

      return {
        ...prevData,
        patterns: prevData.patterns ? [...prevData.patterns, newPattern] : [newPattern],
      };
    });
  };

  const removePattern = (index: number) => {
    setValues((prevData: IDescriptionPattern) => ({
      ...prevData,
      patterns: prevData.patterns.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CInput
          label="Observaciones"
          name="observation"
          value={values.observation}
          onChange={handleInputChange}
        />

        <div className="my-4 w-fit">
          <label
            htmlFor="creditable"
            className="text-sm flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              name="creditable"
              id="creditable"
              checked={values.creditable}
              onChange={handleCheckedChange}
              className="mr-2 text-blue-500 form-checkbox focus:ring-blue-500 h-4 w-4"
            />
            ¿Equipo acreditado?
          </label>
        </div>

        <CInput
          label="Fecha de siguiente calibración"
          name="next_calibration"
          value={values.next_calibration}
          onChange={handleInputChange}
          type='date'
        />

        <CInput
          label="Fecha de calibración"
          name="calibration_date"
          value={values.calibration_date}
          onChange={handleInputChange}
          type='date'
        />

        {/* <div className="flex flex-col gap-[1em]">
          <label htmlFor="pattern" className="text-xs font-semibold ">
            Patrón utilizado
          </label>
          <select
            name="pattern"
            id="pattern"
            defaultValue={values?.pattern}
            value={values?.pattern}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            {patterns?.map((pattern, patternIndex) => (
              pattern.method !== 'all' && <option key={patternIndex} disabled={!pattern.status} value={pattern.code}>
                <span>{pattern.code} - {pattern.type} {' -> '} <span className='text-gray-200'>{formatMethodName({ method: pattern.method as any })}</span></span>
              </option>
            ))}
          </select>
        </div> */}

        <div className="my-4 w-full flex flex-col gap-4">
          <div className='flex flex-col  gap-4'>
            <span>Agregar patron utilizado</span>
            <div className='flex justify-between w-full'>
              <select name="pattern"
                className="border border-gray-300 rounded-md p-2 h-fit"
                onChange={handleSelectChange} defaultValue={values.pattern} value={values.pattern}
              >
                {patterns?.map((pattern, patternIndex) => (
                  <option key={patternIndex} disabled={!pattern.status} value={pattern.code}>
                    <span>{pattern.code} - {pattern.type} {' -> '} <span className='text-gray-200'>{formatMethodName({ method: pattern.method as any })}</span></span>
                  </option>
                ))}

                <option value="" disabled selected>Selecciones un patron</option>
              </select>
              <CButton onClick={() => addPattern(values.pattern)}>+ Agregar</CButton>

            </div>
          </div>
          {
            values?.patterns || values?.patterns?.length < 1 ? values?.patterns?.map((item: string, itemIndex: number) => {
              return (
                <div key={item} className='flex justify-between'>
                  <span>{item}</span>
                  <button type="button" className='mr-[40%]' onClick={() => removePattern(itemIndex)}>
                    <Trash width={18} />
                  </button>
                </div>
              )
            }) :
              <span className='bg-gray-100 p-4 block'>No se han agregado patrones</span>
          }
        </div>

      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(values, url, true)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
