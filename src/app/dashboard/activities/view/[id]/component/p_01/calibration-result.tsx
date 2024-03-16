import React from 'react'
import type {
  CalibrationFactor,
  ICalibrationResults,
} from '../../interface/p_01'

export const CalibrationResults = ({
  calibration_results,
}: {
  calibration_results: ICalibrationResults
}) => {
  return (
    <div className="calibration-results">
      {calibration_results?.results.map((result) => {
        return (
          <div
            key={result.cicle_number}
            className="flex flex-col gap-4 border p-4"
          >
            <div className="header">
              <div className="grid grid-cols gap-4 ">
                <span className="text-center font-semibold">
                  Ciclo {result.cicle_number}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 border p-2">
                <span>Ascendente</span>
                <span>Descendente</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4 border p-2">
                  <span>Patron</span>
                  <span>Equipo</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border p-2">
                  <span>Patron</span>
                  <span>Equipo</span>
                </div>
              </div>
            </div>
            <div className="body">
              {result.calibration_factor.map((calibration_factor, index) => {
                return (
                  <CalibrationRow
                    key={index}
                    calibration_factor={calibration_factor}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const CalibrationRow = ({
  calibration_factor,
}: {
  calibration_factor: CalibrationFactor
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="grid grid-cols-2 gap-4">
        <span>{calibration_factor.upward.pattern}</span>
        <span>{calibration_factor.upward.equipment}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <span>{calibration_factor.downward.pattern}</span>
        <span>{calibration_factor.downward.equipment}</span>
      </div>
    </div>
  )
}
/*
"results": [
  {
      "cicle_number": 1,
      "calibration_factor": [
          {
              "upward": {
                  "pattern": 16.5,
                  "equipment": 12.2
              },
              "downward": {
                  "pattern": 19.5,
                  "equipment": 13.2
              }
          },
          {
              "upward": {
                  "pattern": 14.2,
                  "equipment": 19.5
              },
              "downward": {
                  "pattern": 11,
                  "equipment": 13.2
              }
          }
      ]
  },
  {
      "cicle_number": 2,
      "calibration_factor": [
          {
              "upward": {
                  "pattern": 16.5,
                  "equipment": 12.2
              },
              "downward": {
                  "pattern": 19.5,
                  "equipment": 13.2
              }
          },
          {
              "upward": {
                  "pattern": 14.2,
                  "equipment": 19.5
              },
              "downward": {
                  "pattern": 11,
                  "equipment": 13.2
              }
          }
      ]
  },
  {
      "cicle_number": 3,
      "calibration_factor": [
          {
              "upward": {
                  "pattern": 16.5,
                  "equipment": 12.2
              },
              "downward": {
                  "pattern": 19.5,
                  "equipment": 13.2
              }
          },
          {
              "upward": {
                  "pattern": 14.2,
                  "equipment": 19.5
              },
              "downward": {
                  "pattern": 11,
                  "equipment": 13.2
              }
          }
      ]
  }
]
*/
