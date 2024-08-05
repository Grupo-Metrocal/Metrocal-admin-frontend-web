export interface IM_01 {
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
  calibration_object: string
  maker: string
  model: string
  code: string
  maximum_capacity: number
}

export interface IEnvironmentalConditions {
  id: number
  points: Point[]
}

export interface Point {
  presion: Presion
  humidity: Humidity
  temperature: Temperature
  point_number: number
}

export interface Presion {
  final: number
  initial: number
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
  observation: string
  creditable: boolean
}

export interface ICalibrationResults {
  id: number
  results: Result[]
}

export interface Result {
  code: string
  mass: string
  balance: string
  patterns: string[]
  thermometer: string
  calibrations: Calibrations
  nominal_mass: number
  point_number: number
  accuracy_class: string
  calibrated_material: string
}

export interface Calibrations {
  l1: number[]
  l2: number[]
  l3: number[]
  l4: number[]
}
