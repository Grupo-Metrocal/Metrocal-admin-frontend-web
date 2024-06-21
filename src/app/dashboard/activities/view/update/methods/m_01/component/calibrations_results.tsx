import { Result } from '@/app/dashboard/certificates/interface/p-01'
import { ICalibrationResults, Calibrations } from '../../../../[id]/interface/m_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { CInput } from '@/components/CInput'
import React, { useState } from 'react'

export const CalibrationsResults = ({
  calibrationResults,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: ICalibrationResults,
    url: string,
    useActivityID?: boolean,
  ) => void
  calibrationResults: ICalibrationResults
}) => {
  const url = `methods/ni-mcit-m-01/calibration-results/`
  const [data, setData] = useState(calibrationResults)

  const handleEdit = (index: number, field: any, value: any, subField?: number | any) => {

    setData(prevData => {
      const newResults: any[] = [...prevData.results];

      if (field === 'l1' || field === 'l2' || field === 'l3' || field === 'l4') {
        if (typeof subField === 'number') {
          newResults[index].calibrations[field][subField] = value;
        }
      }

      if (typeof subField === 'number') {
        if (Array.isArray(newResults[index][field])) {
          (newResults[index][field] as any)[subField] = value;

        }
      } else if (subField) {
        if (typeof newResults[index][field] === 'object') {
          (newResults[index][field] as any)[subField] = value;
        }
      } else {
        (newResults[index][field] as any) = value;
      }

      return { ...prevData, results: newResults };
    });
  };

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-4 gap-4'>
        {data?.results?.map((result, index) => (
          <div key={index} className='flex flex-col space-y-4 gap-4 p-4'>
            <div className='border bg-gray-400 p-2 text-center'>
              Punto {result?.point_number}
            </div>

            <div className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div className='flex flex-col gap-4'>
                  <span>Patrones utilizados</span>

                  <div className='flex flex-col gap-2'>
                    {result?.patterns?.map((pattern, patternIndex) => (
                      <div className="flex flex-col gap-[1em]" key={patternIndex}>
                        <select
                          name={`pattern-${patternIndex}`}
                          value={pattern}
                          className="border border-gray-300 rounded-md p-2 h-fit"
                          onChange={(e) =>
                            handleEdit(index, 'patterns', e.target.value, patternIndex)
                          }
                        >
                          {PATTERNSM01.map((patternOption, optionIndex) => (
                            <option key={optionIndex} value={patternOption}>{patternOption}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <span>Masa</span>
                  <select
                    name="mass"
                    value={result.mass}
                    className="border border-gray-300 rounded-md p-2 h-fit"
                    onChange={(e) => {
                      handleEdit(index, 'mass', e.target.value, null)

                    }}
                  >
                    {PATTERNSM01.map((patternOption, optionIndex) => (
                      <option key={optionIndex} value={patternOption}>{patternOption}</option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col gap-4'>
                  <span>Clase de exactitud</span>
                  <select
                    name="accuracy_class"
                    value={result.accuracy_class}
                    className="border border-gray-300 rounded-md p-2 h-fit"
                    onChange={(e) => handleEdit(index, 'accuracy_class', e.target.value, null)}
                  >
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                    <option value="M3">M3</option>
                  </select>
                </div>

                <div className='flex flex-col gap-4'>
                  <span>Serie / Código</span>
                  <CInput
                    name='code'
                    value={result.code}
                    onChange={(e) => handleEdit(index, 'code', e.value, null)}
                    input_style={{
                      marginTop: '-.6em',
                    }}
                    type='text'
                  />
                </div>

                <div className='flex flex-col gap-4'>
                  <span>Masa nominal del calibrando</span>
                  <CInput
                    name='nominal_mass'
                    value={result.nominal_mass.toString()}
                    onChange={(e) => handleEdit(index, 'nominal_mass', parseFloat(e.value), null)}
                    type='number'
                    input_style={{
                      marginTop: '-.6em',
                    }}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-4 mt-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className="flex flex-col gap-[1em]" key={index}>
                    <span>Material del calibrando</span>
                    <select
                      name="calibrated_material"
                      value={result.calibrated_material}
                      className="border border-gray-300 rounded-md p-2 h-fit"
                      onChange={(e) => handleEdit(index, 'calibrated_material', e.target.value, null)}
                    >
                      <option value="Platino">Platino</option>
                      <option value="Aleación de Níquel">Aleación de Níquel</option>
                      <option value="Bronce">Bronce</option>
                      <option value="Acero Inoxidable">Acero Inoxidable</option>
                      <option value="Acero Carbón">Acero Carbón</option>
                      <option value="Hierro">Hierro</option>
                      <option value="Hierro fund. (blanco)">Hierro fund. (blanco)</option>
                      <option value="Hierro fundido (gris)">Hierro fundido (gris)</option>
                      <option value="Aluminio">Aluminio</option>
                      <option value="Plomo">Plomo</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <span>Balanza</span>
                    <select
                      name="balance"
                      value={result.balance}
                      className="border border-gray-300 rounded-md p-2 h-fit"
                      onChange={(e) => handleEdit(index, 'balance', e.target.value, null)}
                    >
                      <option value="N/A">N/A</option>
                      <option value="Precisa Gravimetrics ES Swiss Made">Precisa Gravimetrics ES Swiss Made</option>
                      <option value="Cobos Precision, S. L.">Cobos Precision, S. L.</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <span>Termómetro</span>
                    <select
                      name="thermometer"
                      value={result.thermometer}
                      className="border border-gray-300 rounded-md p-2 h-fit"
                      onChange={(e) => handleEdit(index, 'thermometer', e.target.value, null)}
                    >
                      <option value="Fluke 971">Fluke 971</option>
                      <option value="Testo 608-H1">Testo 608-H1</option>
                      <option value="Extech">Extech</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <table className='min-w-full border-collapse border border-gray-400'>
              <thead>
                <tr>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L1 (mcp)</th>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L2 (mcx)</th>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L3 (mcx+ms)</th>
                  <th className='border border-gray-400 p-2 bg-gray-200'>L4 (mcp+ms)</th>
                </tr>
              </thead>
              <tbody>
                {result?.calibrations?.l1?.map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className='border border-gray-400 p-2 text-center'>
                      <input
                        type="number"
                        className="w-full text-center"
                        value={result.calibrations.l1[rowIndex]}
                        onChange={(e) => handleEdit(index, 'l1', parseFloat(e.target.value), rowIndex)}
                      />
                    </td>
                    <td className='border border-gray-400 p-2 text-center'>
                      <input
                        type="number"
                        className="w-full text-center"
                        value={result.calibrations.l2[rowIndex]}
                        onChange={(e) => handleEdit(index, 'l2', parseFloat(e.target.value), rowIndex)}

                      />
                    </td>
                    <td className='border border-gray-400 p-2 text-center'>
                      <input
                        type="number"
                        className="w-full text-center"
                        value={result.calibrations.l3[rowIndex]}
                        onChange={(e) => handleEdit(index, 'l3', parseFloat(e.target.value), rowIndex)}
                      />
                    </td>
                    <td className='border border-gray-400 p-2 text-center'>
                      <input
                        type="number"
                        className="w-full text-center"
                        value={result.calibrations.l4[rowIndex]}
                        onChange={(e) => handleEdit(index, 'l4', parseFloat(e.target.value), rowIndex)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div>
        <AlertDialogModal
          title='Guardar modificaciones'
          description='¿Estás seguro de guardar las modificaciones?'
          onConfirm={() => handleSaveInformation(data, url)}
          nameButton='Guardar modificaciones'
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}

export const PATTERNSM01 = [
  'NI-MCPM-JM-02 (20mg)',
  'NI-MCPM-JM-02 (50mg)',
  'NI-MCPM-JM-02 (100mg)',
  'NI-MCPM-JM-02 (200mg)',
  'NI-MCPM-JM-02 (500mg)',
  'NI-MCPM-JM-03 (1g ZA57A)',
  'NI-MCPM-JM-02 (2g)',
  'NI-MCPM-JM-03 (2g ZZ47L)',
  'NI-MCPM-JM-03 (2g ZZ84J)',
  'NI-MCPM-JM-02 (5g)',
  'NI-MCPM-JM-03 (5g ZZ32G)',
  'NI-MCPM-JM-02 (10g)',
  'NI-MCPM-JM-03 (10g ZZ64K)',
  'NI-MCPM-JM-02 (20g)',
  'NI-MCPM-JM-02 (20"g)',
  'NI-MCPM-JM-03 (20g ZZ52L)',
  'NI-MCPM-JM-03 (20g ZZ53L)',
  'NI-MCPM-JM-02 (50g)',
  'NI-MCPM-JM-03 (50g ZZ83J)',
  'NI-MCPM-JM-03 (100g ZZ51L)',
  'NI-MCPM-JM-02 (200g)',
  'NI-MCPM-JM-02 (200"g)',
  'NI-MCPM-JM-03 (200g ZZ18M)',
  'NI-MCPM-JM-03 (200g ZZ19M)',
  'NI-MCPM-JM-02 (500g)',
  'NI-MCPM-JM-03 (500g ZZ60E)',
  'NI-MCPM-1-01 (1 000g)',
  'NI-MCPM-JM-02 (1 000g)',
  'NI-MCPM-JM-03 (1 000g ZZ69G)',
  'NI-MCPM-2-01 (2 000g)',
  'NI-MCPM-JM-02 (2 000g)',
  'NI-MCPM-JM-02 (2 000"g)',
  'NI-MCPM-JM-03 (2 000g ZZ94E)',
  'NI-MCPM-JM-03 (2 000g ZZ97E)',
  'NI-MCPM-5-01 (5 000g)',
  'NI-MCPM-JM-02 (5 000g)',
  'NI-MCPM-JM-03 (5 000g ZZ19C)',
  'NI-MCPM-10-01 (10kg)',
  'NI-MCPM-10-02 (10kg)',
  'NI-MCPM-20-01 (20kg)',
  'NI-MCPM-20-10 (20kg)',
  'NI-MCPM-20-11 (20kg)',
  'NI-MCPM-20-12 (20kg)',
  'NI-MCPM-20-13 (20kg)',
  'NI-MCPM-20-14 (20kg)',
  'NI-MCPM-20-15 (20kg)',
  'NI-MCPM-20-16 (20kg)',
  'NI-MCPM-20-17 (20kg)',
  'NI-MCPM-20-18 (20kg)',
  'NI-MCPM-20-19 (20kg)',
  'NI-MCPM-20-20 (20kg)',
  'NI-MCPM-20-21 (20kg)',
  'NI-MCPM-20-22 (20kg)',
  'NI-MCPM-20-23 (20kg)',
  'NI-MCPM-20-24 (20kg)',
  'NI-MCPM-20-25 (20kg)',
  'NI-MCPM-20-26 (20kg)',
  'NI-MCPM-20-27 (20kg)',
  'NI-MCPM-20-28 (20kg)',
  'NI-MCPM-20-29 (20kg)',
  'NI-MCPM-20-30 (20kg)',
  'NI-MCPM-20-31 (20kg)',
  'NI-MCPM-20-32 (20kg)',
  'NI-MCPM-20-33 (20kg)',
  'NI-MCPM-20-34 (20kg)',
  'NI-MCPM-20-35 (20kg)',
  'NI-MCPM-20-36 (20kg)',
  'NI-MCPM-20-37 (20kg)',
  'NI-MCPM-20-38 (20kg)',
  'NI-MCPM-20-39 (20kg)',
  'NI-MCPM-20-40 (20kg)',
  'NI-MCPM-20-41 (20kg)',
  'NI-MCPM-20-42 (20kg)',
  'NI-MCPM-20-43 (20kg)',
  'NI-MCPM-20-44 (20kg)',
  'NI-MCPM-20-45 (20kg)',
  'NI-MCPM-20-46 (20kg)',
  'NI-MCPM-20-47 (20kg)',
  'NI-MCPM-20-48 (20kg)',
  'NI-MCPM-20-49 (20kg)',
  'NI-MCPM-20-50 (20kg)',
  'NI-MCPM-20-51 (20kg)',
  'NI-MCPM-20-52 (20kg)',
  'NI-MCPM-20-53 (20kg)',
  'NI-MCPM-20-54 (20kg)',
  'NI-MCPM-20-55 (20kg)',
  'NI-MCPM-20-56 (20kg)',
  'NI-MCPM-20-57 (20kg)',
  'NI-MCPM-20-58 (20kg)',
  'NI-MCPM-20-59 (20kg)',
  'NI-MCPM-JM-04 (100g)',
  'NI-MCPM-JM-04 (50g)',
  'NI-MCPM-10-04 (10kg)',
  'NI-MCPM-20-02 (20kg)',
  'NI-MCPM-10-03 (10kg)',
  'NI-MCPM-JM-04 (500g)'
] 