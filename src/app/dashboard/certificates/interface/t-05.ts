export interface IT_05 {
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

export interface ICertificate_T_05 {
  calibration_results: CalibrationResults
  digitalThermometer: DigitalThermometer
  oilBath: OilBath
  equipment_information: EquipmentInformation
  environmental_conditions: EnvironmentalConditions
  description_pattern: DescriptionPattern[]
  creditable: boolean
  client_email: string
  observations: string
}

export interface CalibrationResults {
  reference_temperature: string[]
  thermometer_indication: string[]
  correction: string[]
  uncertainty: string[]
}

export interface DigitalThermometer {
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

export interface OilBath {
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

export interface EquipmentInformation {
  certification_code: string
  service_code: string
  certificate_issue_date: string
  calibration_date: string
  device: string
  maker: string
  serial_number: string
  measurement_range: string
  model: string
  code: string
  applicant: string
  address: string
  calibration_location: string
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
