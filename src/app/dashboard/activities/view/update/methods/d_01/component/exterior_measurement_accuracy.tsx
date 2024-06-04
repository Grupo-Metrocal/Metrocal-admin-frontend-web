import { useState } from 'react'
import { IExterior_measurement_accuracy } from '../../../../[id]/interface/d_01'

export const ExteriorMeasurementAccuracy = ({
  exteriorMeasurementAccuracy,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IExterior_measurement_accuracy,
    url: string,
    useActivityID?: boolean,
  ) => void
  exteriorMeasurementAccuracy: IExterior_measurement_accuracy
}) => {
  const url = `methods/ni-mcit-d-01/exterior-measurement-accuracy/`
  const [data, setData] = useState(exteriorMeasurementAccuracy)

  const optionDatosPatrones = [
    'BP - 0, 5',
'BP - 1',
'BP - 1.5',
'BP - 2',
'BP - 2.5',
'BP - 3',
'BP - 3.5',
'BP - 4',
'BP - 4.5',
'BP - 5',
'BP - 5.5',
'BP - 6',
'BP - 6.5',
'BP - 7',
'BP - 7.5',
'BP - 8',
'BP - 8.5',
'BP - 9',
'BP - 9.5',
'BP - 10',
'BP - 20',
'BP - 30',
'BP - 40',
'BP - 50',
'BP - 60',
'BP - 70',
'BP - 80',
'BP - 90',
'BP - 100',
'0',
  ]

 const handleInputChange = (e, point, type, key) => {
    const newData = { ...data };
    newData[point][type][key] = e.target.value;
    setData(newData);
  };

  const handleSave = () => {
    handleSaveInformation(data, url);
  };

 return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Point Numbers</th>
              <th>Type</th>
              <th>x1</th>
              <th>x2</th>
              <th>x3</th>
              <th>x4</th>
              <th>x5</th>
            </tr>
          </thead>
          <tbody>
            {data.map((measurement, index) => (
              <>
                <tr key={`exterior-${index}`}>
                  <td rowSpan="2">{measurement.point_number.join(", ")}</td>
                  <td>Exterior</td>
                  {Object.keys(measurement.verification_lengths.Exterior).map(key => (
                    <td key={key}>
                      <input
                        type="text"
                        value={measurement.verification_lengths.Exterior[key]}
                        onChange={(e) => handleInputChange(e, index, 'Exterior', key)}
                      />
                    </td>
                  ))}
                </tr>
                <tr key={`interior-${index}`}>
                  <td>Interior</td>
                  {Object.keys(measurement.verification_lengths.Interior).map(key => (
                    <td key={key}>
                      <input
                        type="text"
                        value={measurement.verification_lengths.Interior[key]}
                        onChange={(e) => handleInputChange(e, index, 'Interior', key)}
                      />
                    </td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </div>
  );
};
}