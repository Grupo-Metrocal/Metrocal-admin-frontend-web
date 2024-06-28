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
}

export interface IEquipmentInformation {
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

export interface IEnvironmentalConditions {
  id: number
  temperature: number
  hr: number
  equipment_used: string
}

export interface IComputerData {
  id: number
  unit_of_measurement: string
  scale_unit: string
}

export interface IResultMedition {
  medition: IMeditionItem[]
}

interface IMeditionItem {
  patron1: number
  equiopo1: number
  patron2: number
  equiopo2: number
  patron3: number
  equiopo3: number
}

export interface ICertificateData {
  certificado_result: string[]
}
