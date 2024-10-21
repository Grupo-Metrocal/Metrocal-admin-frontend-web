export interface IB_01 {
  id: number
  status: string
  created_at: string
  updated_at: string
  certificate_code?: string
  certificate_url?: string
  certificate_id?: string
  review_state?: boolean
  review_user_id?: number
  report_status?: boolean
  equipment_information: IEquipmentInformation
  environmental_conditions: IEnvironmentalConditions
  linearity_test: ILinearityTest
  eccentricity_test: IEccentricityTest
  repeatability_test: IRepeatabilityTest
  description_pattern: IDescriptionPattern
}

export interface IEquipmentInformation {
  id: number
  device: string
  maker: string
  serial_number: string
  range_min: number
  range_max: number
  resolution: string
  unit: string
  model: string
  code: string
}

export interface IEnvironmentalConditions {
  id: number
  cycles: ICycles
  equipment_used: string
  time: ITime
  stabilization_site: string
}

export interface ICycles {
  hr: IHr
  ta: ITa
  hPa: IHPa
}

export interface ITa {
  end: number
  initial: number
}

export interface IHr {
  end: number
  initial: number
}

export interface IHPa {
  end: number
  initial: number
}

export interface ITime {
  hours: number
  minute: number
}

export interface ILinearityTest {
  linearity_test: ILinearityPoint[]
}

interface ILinearityPoint {
  point: number
  pointsComposition: string[]
  indicationIL: number
  noLoadInfdication: number
}

export interface IEccentricityTest {
  pointNumber: number
  eccentricity_test: IEccentricityPoint[]
}

interface IEccentricityPoint {
  indicationIL: number
  noLoadInfdication: number
}

export interface IRepeatabilityTest {
  pointNumber: number
  repeatability_test: IRepeatabilityPoint[]
}

interface IRepeatabilityPoint {
  indicationIL: number
  noLoadInfdication: number
}

export interface IDescriptionPattern {
  creditable: string
  observation: string
  show_additional_table: 'lb' | 'kg'
  next_calibration: string
}
