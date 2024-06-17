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

export interface ICertificate_V_01 {
  calibration_results: CalibrationResults
  masas: Masas
  equipment_information: EquipmentInformation
  environmental_conditions: EnvironmentalConditions
  client_email: string
  observations: string
  creditable: boolean
}

export interface CalibrationResults {
  nominal_volume: string[]
  conventional_volume: [string, boolean, boolean, boolean, boolean, boolean]
  desviation: [string, number, number, number, number, number]
  uncertainty: [string, boolean, boolean, boolean, boolean, boolean]
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
