export interface IV_01 {
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
  nominal_range: number
  scale_division: number
  unit: string
  model: any
  code: string
  resolution: number
  balance: string
  thermometer: string
  volumetric_container: string
  neck_diameter: string
  material: string
}

export interface IEnvironmentalConditions {
  id: number
  points: Point[]
}

export interface Point {
  humidity: Humidity
  presion_pa: PresionPa
  temperature: Temperature
  point_number: number
}

export interface Humidity {
  final: number
  initial: number
  resolution: number
}

export interface PresionPa {
  final: number
  initial: number
  resolution: number
}

export interface Temperature {
  final: number
  initial: number
  resolution: number
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
  calibrations: Calibration[]
  point_number: number
}

export interface Calibration {
  pattern_dough: PatternDough
  water_temperature: number
}

export interface PatternDough {
  full: number
  empty: number
}
