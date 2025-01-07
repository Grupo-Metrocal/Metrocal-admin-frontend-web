export interface IT_05 {
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
  measurement_range: string
  temperature_min: number
  temperature_max: number
  unit: string
  model: string
  code: string
  type_thermometer: string
  resolution: number
  no_points: number
  no_readings: number
}

export interface IEnvironmentalConditions {
  id: number
  points: Point[]
}

export interface Point {
  humidity: Humidity
  temperature: Temperature
  point_number: number
}

export interface Humidity {
  final: number
  initial: number
}

export interface Temperature {
  final: number
  initial: number
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
  temperature: number
  calibrations: Calibration[]
  point_number: number
}

export interface Calibration {
  final: number
  initial: number
}
