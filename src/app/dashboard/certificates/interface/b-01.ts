export interface IB_01 {
  id: number
  status: string
  created_at: string
  updated_at: string
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
  resolution: string
  model: string
  code: string
  length: string
  acredited: boolean
}

// **************************

export interface ICertificate_B_01 {
  pattern: string
  email: string
  optionsCMCOnCertificate: string
  equipment_information: EquipmentInformation
  calibration_results: CalibrationResults
  environmental_conditions: EnvironmentalConditions
  description_pattern: DescriptionPattern[]
  creditable: boolean
  used_pattern: UsedPattern
  observations: string
  show_additional_table: string
}

export interface EquipmentInformation {
  certification_code: string
  service_code: string
  certificate_issue_date: string
  calibration_date: string
  next_calibration_date: string
  object_calibrated: string
  maker: string
  serial_number: string
  model: string
  measurement_range: string
  resolution: string
  identification_code: string
  applicant: string
  address: string
  calibration_location: string
  code: string
}

export interface CalibrationResults {
  result_test: ResultTest
  result_test_extra: ResultTestExtra
}

export interface ResultTest {
  reference_mass: string[]
  equipment_indication: string[]
  error: string[]
  uncertainty: string[]
  repeatability: string[]
  maximum_eccentricity: string[]
}

export interface ResultTestExtra {
  reference_mass: string[]
  equipment_indication: string[]
  error: string[]
  uncertainty: string[]
  repeatability: string[]
  maximum_eccentricity: string[]
}

export interface EnvironmentalConditions {
  temperature: string
  atmospheric_pressure: string
  humidity: string
  stabilzation: string
  time: string
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

export interface UsedPattern {
  id: number
  observation: string
  creditable: boolean
  show_additional_table: string
  next_calibration: string
}
