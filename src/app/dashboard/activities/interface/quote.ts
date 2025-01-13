export interface IQuote {
  id: number
  status: string
  general_discount: number
  tax: number
  price: number
  no: string
  rejected_comment: any
  rejected_options: any
  extras: number
  created_at: string
  updated_at: any
  equipment_quote_request: EquipmentQuoteRequest[]
  client: Client
  activity: Activity
  currency_type: 'NIO' | 'USD'
  change_currency_type: 'NIO' | 'USD'
  alt_client_email: string
  alt_client_requested_by: string
  alt_client_phone: string
}

export interface EquipmentQuoteRequest {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: string
  calibration_method: string
  additional_remarks: string
  discount: number
  status: string
  comment: string
  price: number
  total: number
  method_id: number
  review_status: string
}

export interface Client {
  id: number
  company_name: string
  phone: string
  address: string
  no_ruc: string
  email: string
  requested_by: string
  created_at: string
}

export interface Activity {
  id: number
  status: string
  progress: number
  created_at: string
  updated_at: string
  responsable: number
  client_signature: string
  work_areas: string[]
  comments_insitu: string[]
  reviewed: boolean
  reviewed_user_id: string
  is_certificate: boolean
  start_time: string
  end_time: string
  finish_date: string
  service_order: ServiceOrder[]
}

export interface ServiceOrder {
  id: number
  equipments_ids: number[]
  start_time: string
  end_time: string
  finish_date: string
  created_at: string
  updated_at?: string
}
