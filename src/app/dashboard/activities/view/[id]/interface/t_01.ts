export interface IT_01 {
  id: number
  calibration_location: string
  report_status: boolean
  report_messages: any[]
  status: string
  certificate_id: string
  certificate_code: string
  certificate_url: string
  review_state: boolean
  review_user_id: number
  created_at: string
  updated_at: string
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  description_pattern: IDescriptionPattern
  calibration_results: ICalibrationResults
}

export interface IEquipmentInformation {
  id: number
  device: string
  maker: string
  serial_number: string
  range_min: number
  range_max: number
  unit: string
  model: string
  code: string
  resolution: number
  probe_type: string
}

export interface IEnvironmentalConditions {
  id: number
  environment: Environment | any
}

export interface Environment {
  ta: Ta
  hpa: Hpa
}

export interface Ta {
  hrp: Hrp
  tac: Tac
  equipment: string
}

export interface Hrp {
  final: number
  initial: number
}

export interface Tac {
  final: number
  initial: number
}

export interface Hpa {
  pa: Pa
  equipment: string
  stabilization_time: number
}

export interface Pa {
  final: number
  initial: number
}

export interface IDescriptionPattern {
  id: number
  pattern: string
  observation: string
  creditable: boolean
  show_table_international_system_units: boolean
}

export interface ICalibrationResults {
  id: number
  results: Result[]
}

export interface Result {
  indication_linear: IndicationLinear[] | any[]
}

export interface IndicationLinear {
  patron: number
  thermometer: number
}
