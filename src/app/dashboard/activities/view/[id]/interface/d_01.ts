export interface ID_01 {
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
  description_pattern: IDescriptionPattern
  exterior_measurement_accuracy: IExterior_measurement_accuracy
  exterior_parallelism_measurement: IExteriorParallelismMeasurement
  interior_parallelism_measurement: IInterior_parallelism_measurement
  instrument_zero_check: IInstrumentzerocheck
  pre_installation_comment: IPreinstallationcomment
  certificate_data: ICertificateData

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
  id: number;
  cycles: ICycles;
  equipment_used: string;
  time: ITime;
  stabilization_site: string;
}

export interface ICycles {
  hr: IHr;
  ta: ITa;
}

export interface ITa {
  end: number;
  initial: number;
}

export interface IHr {
  end: number;
  initial: number;
}

export interface ITime {
  hours: number;
  minute: number;
}


export interface IDescriptionPattern {
  id: number
  descriptionPatterns: string[]
}

///IExterior_measurement_accuracy
export interface IExterior_measurement_accuracy {
  id: number
  measure: IMeasures[]
}

interface IMeasures {
  nominal_patron_value: string[]
  verification_lengths: IMeditions
}

interface IMeditions {
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
}


//IExteriorParallelismMeasurement
export interface IExteriorParallelismMeasurement {
  id: number
  measurements: IMeasurement[]
}

interface IMeasurement {
  point_number: string[]
  verification_lengths: IPlace
}

interface IPlace {
  Exterior: IMedition
  Interior: IMedition
}

interface IMedition {
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
}


//IInterior_parallelism_measurement
export interface IInterior_parallelism_measurement {
  id: number
  measurementsd01: IMeasurements[]
}

interface IMeasurements {
  nominal_patron: string
  verification_lengths: IPlaces
}

interface IPlaces {
  Exteriors: IMeditions
  Interiors: IMeditions
}

interface IMeditions {
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
}



//IInstrument_zero_check
export interface IInstrumentzerocheck {
  id: number
  nominal_value: number
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
}

//IPre_installation_comment
export interface IPreinstallationcomment {
  id: number
  comment: string
  accredited : boolean
}

//ICertificateData
export interface ICertificateData {
  certificado_result: string[]
}
