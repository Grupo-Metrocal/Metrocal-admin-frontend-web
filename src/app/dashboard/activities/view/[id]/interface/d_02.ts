export interface ID_02 {
  id: number
  status: string
  created_at: string
  updated_at: string
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  description_pattern: IDescriptionPattern
  pre_installation_comment: IPreinstallationcomment
  instrument_zero_check: IInstrumentzerocheck
  accuracy_test: IAccuracyTest
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
  range_min: number
  range_max: number
  resolution: string
  model: string
  code: string
  length: string
}

export interface IEnvironmentalConditions {
  id: number
  cycles: ICycles
  equipment_used: string
  time: Time
  stabilization_site: string
}

export interface ICycles {
  ta: Ta
  hr: Hr
  cycle_number: number
}

export interface Ta {
  initial: number
  end: number
}

export interface Hr {
  initial: number
  end: number
}

export interface Time {
  hours: number
  minute: number
}

export interface IDescriptionPattern {
  id: number
  descriptionPattern: string[]
}

export interface IPreinstallationcomment {
  id: number
  comment: string
  accredited: boolean
}

export interface IInstrumentzerocheck {
  id: number
  nominal_value: number
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
  x6: number
  x7: number
  x8: number
  x9: number
  x10: number
}

export interface IAccuracyTest {
  measureD02: IMeasure_D02[]
}

export interface IMeasure_D02 {
  nominal_value: string[]
  varification_lengths: {
    x1: number
    x2: number
    x3: number
    x4: number
    x5: number
    x6: number
    x7: number
    x8: number
    x9: number
    x10: number
  }
}

export interface ICertificateData {
  certificado_result: string[]
}
