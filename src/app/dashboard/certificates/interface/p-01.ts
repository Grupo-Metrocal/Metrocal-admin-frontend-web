export interface IP_01 {
  id: number
  calibration_location: string
  status: string
  created_at: string
  updated_at: string
  equipment_information: EquipmentInformation
  certificate_code?: string
  certificate_url?: string
  review_state?: boolean
  review_user_id?: number
}

export interface EquipmentInformation {
  calibration_object: string
  id: number
  device: string
  maker: string
  serial_number: string
  measurement_range: string
  accuracy_class: string
  unit: string
  model: string
  code: string
  height_difference: number
  resolution: number
  scale: number
}

// **************************

export interface ICertificate_P_01 {
  pattern: string
  email: string
  CMC: Cmc
  optionsCMCOnCertificate: string
  equipment_information: EquipmentInformation
  calibration_results: CalibrationResults
  environmental_conditions: EnvironmentalConditions
  used_pattern: UsedPattern
  description_pattern: DescriptionPattern[]
  creditable: boolean
  ta_eq_enviromental_conditions: string
  hPa_eq_enviromental_conditions: string
  observations: string
  show_table_international_system_units: any
}

export interface Cmc {
  cmcPoint: string[]
  cmcPref: number[]
  uncertaintyCMC: number[]
  cmc: number[]
  mincmc: number[]
}

export interface EquipmentInformation {
  certification_code: string
  service_code: string
  certificate_issue_date: string
  calibration_date: string
  next_calibration_date: string
  object_calibrated: string
  manufacturer: string
  no_series: string
  model: string
  measurement_range: string
  resolution: number
  code: string
  applicant: string
  address: string
  calibration_location: string
}

export interface CalibrationResults {
  result: Result
  result_unid_system: ResultUnidSystem
}

export interface Result {
  reference_pressure: string[]
  equipment_indication: string[]
  correction: string[]
  uncertainty: string[]
}

export interface ResultUnidSystem {
  reference_pressure: string[]
  equipment_indication: string[]
  correction: string[]
  uncertainty: [string, number, number, number, number, number]
}

export interface EnvironmentalConditions {
  atmospheric_pressure: string
  temperature: string
  humidity: string
}

export interface UsedPattern {
  id: number
  pattern: string
  observation: string
  creditable: boolean
  next_calibration: any
  show_table_international_system_units: any
}

export interface DescriptionPattern {
  id: number
  method: string
  equipment: string
  code: string
  certificate: string
  traceability: string
  pattern_range: string
  next_calibration: string
  brand: string
  created_at: string
}
