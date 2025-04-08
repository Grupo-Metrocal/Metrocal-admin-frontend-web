export interface IGeneric_method {
  id: number
  status: string
  created_at: string
  updated_at: string
  certificate_code?: string
  certificate_url?: string
  review_state?: boolean
  review_user_id?: number
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  computer_data: IComputerData
  result_medition: IResultMedition
  certificate_data: ICertificateData
  description_pattern: IDescriptionPattern
}

export interface IEquipmentInformation {
  id: number
  device: string
  maker: string
  serial_number: string
  model: string
  range_min: number
  range_max: number
  scale_interval: number
  code: string
  estabilization_site: string
}

export interface IEnvironmentalConditions {
  id: number
  temperature: number
  hr: number
  equipment_used: string
}

export interface IComputerData {
  id: number
  unit_of_measurement: string
  scale_division: number
}

export interface IResultMedition {
  id: number
  meditions: IMedition[]
}

export interface IDescriptionPattern {
  observation?: string
  creditable?: boolean
  next_calibration: string
  calibration_date: string
  patterns: string[]
}

export interface IMedition {
  medition:
    | {
        patron: number
        equipment: number
      }[]
    | any[]
}

export interface ICertificateData {
  certificado_result: string[]
}
