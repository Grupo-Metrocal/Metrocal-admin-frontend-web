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
  calibration_results: CalibrationResults
  environmental_conditions: EnvironmentalConditions
  description_pattern: string[]
  used_patterns: UsedPatterns
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
  resolution: string
  identification_code: string
  applicant: string
  address: string
  calibration_location: string
}

export interface CalibrationPoint {
  C: number
  G: number
  K: number
  O: number
  S: number
  W: number
}

export interface MeasurementFace {
  position: boolean
  H: string
  L?: string
  E?: number
}

export interface MeasurementFaceInterior {
  position: boolean
  T: string
  W?: string
  Z?: number
}

export interface Current_reading {
  interior_point: number
  exterior_point: number
}

export interface CalibrationResults {
  calibration_points: CalibrationPoint[]
  exterior_measurement_faces: MeasurementFace[]
  interior_measurement_faces: MeasurementFaceInterior[]
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
