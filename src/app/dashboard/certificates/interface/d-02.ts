export interface ID_02 {
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
}

// **************************

export interface ICertificate_D_02 {
  pattern: string
  email: string
  equipment_information: EquipmentInformation
  calibration_results: CalibrationResults
  environmental_conditions: EnvironmentalConditions
  description_pattern: DescriptionPattern
  used_patterns: UsedPatterns
  creditable: boolean
  observations: string
}

export interface EquipmentInformation {
  certificate_code: string
  calibration_date: string
  issue_date: string
  calibration_object: string
  brand: string
  series: string
  model: string
  measurement_range: string
  resolution: string
  identification_code: string
  applicant: string
  address: string
  calibration_location: string
}

export interface CalibrationResults {
  calibration_accuracy_tests: CalibrationAccuracyTest[]
}

export interface CalibrationAccuracyTest {
  nominal_value: number
  actual_length: number
  current_reading: number
  deviation: number
  expanded_uncertainty: number
}

export interface EnvironmentalConditions {
  temperature: string
  humidity: string
  stabilization: string
  time: string
}

export interface DescriptionPattern {
  id: number
  pattern: string
  observation: any
  creditable: boolean
}

export interface UsedPatterns {
  pressure_pattern: PressurePattern[]
}

export interface PressurePattern {
  id: number
  method: string
  equipment: string
  code: string
  certificate: string
  traceability: string
  next_calibration: string
  created_at: string
}
