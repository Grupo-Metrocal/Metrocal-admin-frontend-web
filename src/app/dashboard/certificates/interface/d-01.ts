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

export interface EnvironmentalConditions {
  id: number
  cicles: string[]
  equipment_used: string
  time: string
  stabilization_site: string
}

export interface DescriptionPattern {
  id: number
  description_pattern: string[]
}

export interface exterior_measurement_accuracy {
  id: number
  measure: string[]
}

export interface interior_parallelism_measurement {
  id: number
  measure: string[]
}

export interface instrument_zero_check {
  id: number
  nominal_value: string
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
}

export interface pre_installation_comment {
  id: number
  comment: string
}

export interface certificateData {
  certificado_result: string[]
}
