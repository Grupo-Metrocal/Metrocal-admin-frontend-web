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
  calibration_result: CalibrationResult
  environmental_conditions: EnvironmentalConditions
  creditable: boolean
  descriptionPattern: DescriptionPattern[]
  observations: string
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
  code: string
  applicant: string
  address: string
  calibration_location: string
}

export interface CalibrationResult {
  nominal_value: string[]
  current_length: string[]
  current_reading: string[]
  deviation: string[]
  uncertainty: string[]
}

export interface EnvironmentalConditions {
  temperature: string
  humidity: string
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
