export interface IP_01 {
  id: number
  calibration_location: any
  status: string
  report_status: boolean
  report_messages: string[]
  ceritificate_code: string
  ceritificate_id: string
  created_at: string
  updated_at: string
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  calibration_results: ICalibrationResults
  description_pattern: IDescriptionPattern
}

export interface IEquipmentInformation {
  id: number
  device: string
  maker: string
  serial_number: string
  measurement_range: string
  accuracy_class: string
  unit: string
  range_min: number
  range_max: number
  model: string
  code: string
  height_difference: number
  resolution: number
  scale: number
}

export interface IEnvironmentalConditions {
  id: number
  cycles: Cycle[]
}

export interface Cycle {
  ta: Ta
  hPa: HPa
  cycle_number: number
}

export interface Ta {
  hrp: Hrp
  tac: Tac
  equipement: string
}

export interface Hrp {
  final: number
  initial: number
}

export interface Tac {
  final: number
  initial: number
}

export interface HPa {
  pa: Pa
  equipement: string
}

export interface Pa {
  final: number
  initial: number
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
  downward: Downward
}

export interface Upward {
  pattern: number
  equipment: number
}

export interface Downward {
  pattern: number
  equipment: number
}

export interface IDescriptionPattern {
  id: number
  pattern: string
  observation: string
  creditable: boolean
  show_table_international_system_units: boolean
  next_calibration: string
}
