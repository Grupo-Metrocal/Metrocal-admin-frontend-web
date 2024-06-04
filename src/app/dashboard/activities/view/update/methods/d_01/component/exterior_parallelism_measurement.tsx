import React, { useState } from 'react';

export const ExteriorMeasurementAccuracy = ({
  exteriorMeasurementAccuracy,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: any,
    url: string,
    useActivityID?: boolean,
  ) => void;
  exteriorMeasurementAccuracy: any;
}) => {
  const url = `methods/ni-mcit-d-01/exterior-measurement-measurement/`;
  const [data, setData] = useState(exteriorMeasurementAccuracy.measure);

  const handleInputChange = (e: any, index: any, key: any) => {
    const newData = [...data];
    newData[index].verification_lengths[key] = parseFloat(e.target.value);
    setData(newData);
  };

  const handleSave = () => {
    handleSaveInformation({ measure: data }, url);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Nominal Patron Value</th>
              <th>x1</th>
              <th>x2</th>
              <th>x3</th>
              <th>x4</th>
              <th>x5</th>
            </tr>
          </thead>
          <tbody>
            {data.map((measurement: any, index: any) => (
              <tr key={index}>
                <td>{measurement.nominal_patron_value.join(", ")}</td>
                {Object.keys(measurement.verification_lengths).map(key => (
                  <td key={key}>
                    <input
                      type="number"
                      step="0.001"
                      value={measurement.verification_lengths[key]}
                      onChange={(e) => handleInputChange(e, index, key)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};