export interface IT_03 {
  id: number
  calibration_location: string
  report_status: boolean
  report_messages: any[]
  status: string
  certificate_id: string
  certificate_code: string
  certificate_url: string
  review_state: boolean
  review_user_id: any
  created_at: string
  updated_at: string
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  description_pattern: IDescriptionPattern
  calibration_results: ICalibrationResults
}

export interface IEquipmentInformation {
  id: number
  device: string
  maker: string
  serial_number: string
  measurement_range: any
  temperature_min: number
  temperature_max: number
  unit: string
  model: string
  code: string
  resolution: number
  sensor: string
}

export interface IEnvironmentalConditions {
  id: number
  temperature: number
  humidity: number
  pattern: string
}

export interface IDescriptionPattern {
  id: number
  pattern: string
  observation: string
  creditable: boolean
}

export interface ICalibrationResults {
  id: number
  results: Result[]
}

export interface Result {
  cicle_number: number
  calibration_factor: CalibrationFactor[]
}

export interface CalibrationFactor {
  upward: Upward
  pattern: number | any
  downward: Downward
}

export interface Upward {
  equipment: number
}

export interface Downward {
  equipment: number
}
