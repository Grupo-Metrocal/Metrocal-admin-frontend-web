export interface IM_01 {
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
  certification_code: string
  service_code: string
  certificate_issue_date: string
  calibration_date: string
  device: string
  maker: string
  maximum_capacity: string
  applicant: string
  address: string
  calibration_location: string
}

// **************************

export interface ICertificate_M_01 {
  calibration_results: CalibrationResults
  masas: Masas
  equipment_information: EquipmentInformation
  environmental_conditions: EnvironmentalConditions
  client_email: string
  observations: string
  creditable: boolean
}

export interface CalibrationResults {
  items: number[]
  serieCode: any[]
  nominal_value: number[]
  nominal_units: string[]
  conventional_value: number[]
  conventional_units: string[]
  conventional_indication: any[]
  conventional_value_2: any[]
  conventional_units_2: string[]
  uncertainty_value: number[]
  uncertainty_units: string[]
}

export interface Masas {
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
  nominal_range: number
  scale_division: number
  code: string
  applicant: string
  address: string
  calibration_location: string
}

export interface EnvironmentalConditions {
  temperature: string
  humidity: string
  presion: string
}
