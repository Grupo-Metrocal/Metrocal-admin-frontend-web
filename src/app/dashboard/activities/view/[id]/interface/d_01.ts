export interface ID_01 {
  id: number
  status: string
  created_at: string
  updated_at: string
  equipment_information: IEquipmentInformation
  certificate_code?: string
  certificate_url?: string
  review_state?: boolean
  review_user_id?: number
}

export interface IEquipmentInformation {
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

export interface IEnvironmentalConditions {
  id: number
  cycles: Cycles
  equipment_used: string
  time: string
  stabilization_site: string
}

export interface Cycles {
  map(arg0: (cycles: any) => void): unknown
  ta: Ta
  hr: Hr
}

export interface Ta {
  final: number
  initial: number
}

export interface Hr {
  final: number
  initial: number
}

export interface IDescriptionPattern {
  id: number
  description_pattern: string[]
}

export interface IExterior_measurement_accuracy {
  id: number
  measure: string[]
}

export interface interior_parallelism_measurement {
  id: number
  measure: string[]
}

export interface IInstrument_zero_check {
  id: number
  nominal_value: string[]
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
}

export interface IPre_installation_comment {
  id: number
  comment: string
}

export interface ICertificateData {
  certificado_result: string[]
}
