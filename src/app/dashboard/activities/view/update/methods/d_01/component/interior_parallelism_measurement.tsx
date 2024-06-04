import React, { useState } from 'react'
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
  const url = `methods/ni-mcit-d-01/interior-parallelism-measurement/`
  const [data, setData] = useState(exteriorMeasurementAccuracy.measurementsd01)

  const handleInputChange = (e, index, type, key) => {
    const newData = [...data]
    newData[index].verification_lengths[type][key] = parseFloat(e.target.value)
    setData(newData)
  }

  const handleSave = () => {
    handleSaveInformation({ measurementsd01: data }, url)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Nominal Patron</th>
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
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan="2">{measurement.nominal_patron}</td>
                  <td>Exteriors</td>
                  {Object.keys(measurement.verification_lengths.Exteriors).map(
                    (key) => (
                      <td key={key}>
                        <input
                          type="number"
                          step="0.001"
                          value={
                            measurement.verification_lengths.Exteriors[key]
                          }
                          onChange={(e) =>
                            handleInputChange(e, index, 'Exteriors', key)
                          }
                        />
                      </td>
                    ),
                  )}
                </tr>
                <tr>
                  <td>Interiors</td>
                  {Object.keys(measurement.verification_lengths.Interiors).map(
                    (key) => (
                      <td key={key}>
                        <input
                          type="number"
                          step="0.001"
                          value={
                            measurement.verification_lengths.Interiors[key]
                          }
                          onChange={(e) =>
                            handleInputChange(e, index, 'Interiors', key)
                          }
                        />
                      </td>
                    ),
                  )}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  )
}
