export interface GenericMethod {
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
  date: string
  device: string
  maker: string
  serial_number: string
  model: string
  measurement_range: string
  scale_interval: string
  code: string
  length: string
  estabilization_site: string
}

// *****************************

export interface ICertificate_Generic_Method {
  pattern: string
  email: string
  equipment_information: EquipmentInformation
  calibration_results: CalibrationResults
  environmental_conditions: EnvironmentalConditions
  description_pattern: string
  creditable: boolean
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
  scale_interval: string
  identification_code: string
  applicant: string
  address: string
  calibration_location: string
}

export interface Results {
  pattern_indication: number
  instrument_indication: number
  correction: number
  expanded_uncertainty: number
}

export interface CalibrationResults {
  results: Results[]
}

export interface EnvironmentalConditions {
  temperature: string
  humidity: string
  temperature2: string
  humidity2: string
}