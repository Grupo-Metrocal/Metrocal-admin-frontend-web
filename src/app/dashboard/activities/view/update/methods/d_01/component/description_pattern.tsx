import { useForm } from '@/hooks/useForm'
import { IDescriptionPattern } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useEffect, useState } from 'react'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { Trash2 } from 'lucide-react'
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
  const { values, handleInputChange } = useForm({ ...description_pattern })

  const url = `methods/ni-mcit-d-01/description-pattern/`

  const [selectedPateerns, setSelectedPatterns] = useState<string[]>(values.descriptionPatterns || []);
  const { patterns } = usePattern('NI-MCIT-D-01')

  const handleChangePattern = (pattern: string, index: number) => {
    setSelectedPatterns((prevPatterns) =>
      prevPatterns.map((item, i) => {
        if (i === index) {
          return pattern;
        }
        return item;
      })
    );
  };

  const addEmptyPattern = () => {
    setSelectedPatterns((prevPatterns) => [...prevPatterns, '']);
  };

  const removePattern = (index: number) => {
    setSelectedPatterns((prevPatterns) => prevPatterns.filter((_, i) => i !== index));
  };


  useEffect(() => {
    handleInputChange({ name: 'descriptionPatterns', value: selectedPateerns })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPateerns])

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className='flex flex-col gap-4'>
            <span>Patrones seleccionados</span>
            <div>
              {
                selectedPateerns.length > 0 ? selectedPateerns.map((patten, index) => {
                  return (
                    <div className="flex gap-4" key={index}>
                      <select
                        name="pattern"
                        id="pattern"
                        defaultValue={patten}
                        value={patten}
                        onChange={e => {
                          handleChangePattern(e.currentTarget.value, index)
                        }}
                        className="border border-gray-300 rounded-md p-2 h-fit"
                      >
                        <option value="" disabled selected>Seleccione un patrón</option>
                        {patterns?.map((pattern, patternIndex) => (
                          <option key={patternIndex} disabled={!pattern.status || selectedPateerns.includes(pattern.code)} value={pattern.code}>
                            {pattern.code} - {pattern.type}
                          </option>
                        ))}
                      </select>
                      <Trash2 className='text-red-400 cursor-pointer' width={20}
                        onClick={() => removePattern(index)}
                      />
                    </div>
                  )
                })
                  : <span className='py-4 text-gray-400'>
                    No se han seleccionado patrones
                  </span>
              }
            </div>
            <div>
              <CButton onClick={addEmptyPattern} style={{
                background: 'white',
                color: '#333'
              }}
                disabled={selectedPateerns.length >= 3}
              >
                Agregar patron
              </CButton>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() =>
            handleSaveInformation(
              { ...values, descriptionPatterns: selectedPateerns },
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
