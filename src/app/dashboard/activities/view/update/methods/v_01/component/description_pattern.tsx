import { IDescriptionPattern } from '../../../../[id]/interface/v_01'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { CButton } from '@/components/CButton'
import { ChangeEvent, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { usePattern } from '@/app/dashboard/settings/patterns/[calibration_method]/_hooks/usePattern'

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
  const url = `methods/ni-mcit-v-01/description-pattern/`
  const { values, handleSelectChange } = useForm({ pattern: '' })
  const { patterns } = usePattern('NI-MCIT-V-01')

  const [data, setData] = useState<IDescriptionPattern>(
    description_pattern,
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const addPattern = (newPattern: string) => {
    if (!newPattern) return toast('Seleecione un patron')

    setData((prevData) => {
      if (prevData?.patterns?.includes(newPattern)) {
        toast('El patron ya existe')
        return prevData;
      }

      return {
        ...prevData,
        patterns: prevData?.patterns ? [...prevData.patterns, newPattern] : [newPattern],
      };
    });
  };


  const removePattern = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      patterns: prevData.patterns.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* <AutocompleteInput
          requiredLabel
          value={values.pattern}
          label="Patrón utilizado"
          name="pattern"
          onChange={handleInputChange}
          required
          placeholder="seleccione su patrón utilizado"
          list={[
            { id: 1, name: 'NI-MCPVE-16' },
            { id: 2, name: 'NI-MCPVE-01' },
          ]}
          keyList="pattern"
        /> */}
        <CInput
          label="Observaciones"
          name="observation"
          value={data?.observation}
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
              checked={data?.creditable}
              onChange={handleInputChange}
              className="mr-2 text-blue-500 form-checkbox focus:ring-blue-500 h-4 w-4"
            />
            ¿Equipo acreditado?
          </label>
        </div>

        <CInput
          label="Fecha de siguiente calibración"
          name="next_calibration"
          value={data?.next_calibration}
          onChange={handleInputChange}
          type='date'
        />

        <CInput
          label="Fecha de calibración"
          name="calibration_date"
          value={data?.calibration_date}
          onChange={handleInputChange}
          type='date'
        />

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
                    {pattern.code} - {pattern.type}
                  </option>
                ))}

                <option value="" disabled selected>Selecciones un patron</option>
              </select>
              <CButton onClick={() => addPattern(values.pattern)}>+ Agregar</CButton>

            </div>
          </div>
          {
            data?.patterns || data?.patterns?.length < 1 ? data?.patterns?.map((item, itemIndex) => {
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
          onConfirm={() => handleSaveInformation(data, url, true)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />


      </div>
    </div>
  )
}
