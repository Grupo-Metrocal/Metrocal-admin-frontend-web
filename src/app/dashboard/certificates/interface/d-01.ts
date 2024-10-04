export interface ID_01 {
  id: number
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
  resolution: string
  model: string
  code: string
  length: string
}

// **************************

export interface ICertificate_D_01 {
  pattern: string
  email: string
  equipment_information: EquipmentInformation
  calibrations: Calibrations
  environmental_conditions: EnvironmentalConditions
  descriptionPattern: DescriptionPattern[]
  observations: string
  creditable: boolean
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

export interface Calibrations {
  calibration_result: CalibrationResult
  calibration_result_outside: CalibrationResultOutside
  calibration_result_inside: CalibrationResultInside
}

export interface CalibrationResult {
  calibration_point: [
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ]
  nominal_value: string[]
  value: string[]
  current_reading: string[]
  deviation: string[]
  uncertainty: [string, string, string, string, string, string, number, number]
}

export interface CalibrationResultOutside {
  nominal_value_outside: [
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ]
  current_reading_outside: string[]
  deviation_outside: string[]
}

export interface CalibrationResultInside {
  nominal_value_inside: string[]
  current_reading_inside: string[]
  deviation_inside: string[]
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
