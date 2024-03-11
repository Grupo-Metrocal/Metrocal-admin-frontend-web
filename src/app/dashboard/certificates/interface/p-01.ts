export interface IP_01 {
  id: number
  calibration_location: string
  status: string
  created_at: string
  updated_at: string
  equipment_information: EquipmentInformation
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

export interface ICertificate_P_01 {
  equipment_information: EquipmentInformation
  calibration_results: CalibrationResults
  environmental_conditions: EnvironmentalConditions
  descriptionPattern: descriptionPattern
}

export interface EquipmentInformation {
  service_code: string
  certificate_issue_date: string
  calibration_date: string
  object_calibrated: string
  manufacturer: string
  no_series: string
  model: string
  measurement_range: string
  resolution: number
  code: string
  applicant: string
  address: string
  calibration_location: any
}

export interface CalibrationResults {
  result: Result
  result_unid_system: ResultUnidSystem
}

export interface Result {
  reference_pressure: string[]
  equipment_indication: string[]
  correction: string[]
  uncertainty: string[]
}

export interface ResultUnidSystem {
  reference_pressure: string[]
  equipment_indication: string[]
  correction: string[]
  uncertainty: string[]
}

export interface EnvironmentalConditions {
  atmospheric_pressure: string
  temperature: string
  humidity: string
}

export interface descriptionPattern {
  pattern: string
  observation: string
}
