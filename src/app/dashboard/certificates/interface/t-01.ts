export interface IT_01 {
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

export interface ICertificate_T_01 {
  pattern: string
  email: string
  show_table_international_system_units: boolean
  equipment_information: EquipmentInformation
  calibration_results: CalibrationResults
  environment_method_used: EnvironmentMethodUsed
  calibration_method_used: CalibrationMethodUsed
  creditable: boolean
  description_pattern: DescriptionPattern
  environmental_conditions: EnvironmentalConditions
  observations: string
}

export interface EquipmentInformation {
  certification_code: string
  service_code: string
  certificate_issue_date: string
  calibration_date: string
  object_calibrated: string
  maker: string
  serial_number: string
  model: string
  measurement_range: string
  resolution: number
  code: string
  unit: string
  applicant: string
  address: string
  calibration_location: string
}

export interface CalibrationResults {
  result: Result
  result_unid_system: ResultUnidSystem
}

export interface Result {
  temperatureReference: string[]
  thermometerIndication: string[]
  correction: string[]
  expandedUncertaintyK2: string[]
}

export interface ResultUnidSystem {
  temperatureReference: any[]
  thermometerIndication: any[]
  correction: any[]
  expandedUncertaintyK2: any[]
}

export interface EnvironmentMethodUsed {
  id: number
  method: string
  equipment: string
  code: string
  certificate: string
  traceability: string
  pattern_range: string
  next_calibration: string
  created_at: string
}

export interface CalibrationMethodUsed {
  id: number
  method: string
  equipment: string
  code: string
  certificate: string
  traceability: string
  pattern_range: string
  next_calibration: string
  created_at: string
}

export interface DescriptionPattern {
  id: number
  pattern: string
  observation: string
  creditable: boolean
  show_table_international_system_units: boolean
}

export interface EnvironmentalConditions {
  temperature: string
  humidity: string
}
