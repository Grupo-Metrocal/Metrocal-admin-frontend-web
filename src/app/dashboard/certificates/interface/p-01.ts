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
