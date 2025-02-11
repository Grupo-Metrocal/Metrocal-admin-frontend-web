import { usePattern } from '@/app/dashboard/settings/patterns/[calibration_method]/_hooks/usePattern'
import { IEnvironmentalConditions } from '../../../../[id]/interface/t_05'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useEffect, useState } from 'react'

export const EnvironmentalConditions = ({
  environmentalConditions,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IEnvironmentalConditions,
    url: string,
    useActivityID?: boolean,
  ) => void
  environmentalConditions: IEnvironmentalConditions
}) => {
  const url = `methods/ni-mcit-t-05/environmental-conditions/`
  const [data, setData] = useState(environmentalConditions)

  const { patterns } = usePattern('all')

  const handleEdit = (
    field: string,
    value: number | string,
    cycleNumber: number,
  ) => {
    setData((prev: any) => {
      if (field === 'pattern') {
        return { ...prev, pattern: value };
      }
    })

    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(parsedValue)) {
      return;
    }

    setData((prev: any) => {
      const points = prev.points?.map((point: any) => {
        if (point.point_number === cycleNumber) {
          const [key, subKey] = field.split('.');
          if (key && subKey && point[key]) {
            return {
              ...point,
              [key]: {
                ...point[key],
                [subKey]: parsedValue,
              },
            };
          }
        }
        return point;
      });

      return { ...prev, points };
    });
  };


  useEffect(() => {
    console.log({ data })
  }, [data])


  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col gap-4 py-5">
        <label htmlFor="pattern" className="text-xs font-semibold">
          Patrón utilizado
        </label>
        <select
          name="pattern"
          id="pattern"
          value={data.pattern}
          onChange={(e) => handleEdit('pattern', e.target.value, 0)}
          className="border border-gray-300 rounded-md p-2"
          aria-label="Seleccione el patrón utilizado"
        >
          {patterns?.map((pattern, patternIndex) => (
            <option key={patternIndex} disabled={!pattern.status}>
              {pattern.code}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Punto calibrados</th>
            <th className="border px-4 py-2">Temperatura (ºC) Inicial</th>
            <th className="border px-4 py-2">Temperatura (ºC) Final</th>
            <th className="border px-4 py-2">Humedad (%) Inicial</th>
            <th className="border px-4 py-2">Humedad (%) Final</th>
            {/* <th className="border px-4 py-2">Equipo utilizado</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.points?.map((point) => (
            <tr key={point.point_number} className="text-center">
              <td className="border px-4 py-2">
                Punto{' '}
                {point.point_number === -1 ? '1 final' : point.point_number}
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px] text-center"
                  type="text"
                  value={point.temperature.initial}
                  onChange={(e) =>
                    handleEdit(
                      'temperature.initial',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px] text-center"
                  type="text"
                  value={point.temperature.final}
                  onChange={(e) =>
                    handleEdit(
                      'temperature.final',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px] text-center"
                  type="text"
                  value={point.humidity.initial}
                  onChange={(e) =>
                    handleEdit(
                      'humidity.initial',
                      e.target.value,
                      point.point_number,
                    )
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="w-[80px] text-center"
                  type="text"
                  value={point.humidity.final}
                  onChange={(e) =>
                    handleEdit(
                      'humidity.final',
                      e.target.value,
                      point.point_number,
                    )
                  }
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
