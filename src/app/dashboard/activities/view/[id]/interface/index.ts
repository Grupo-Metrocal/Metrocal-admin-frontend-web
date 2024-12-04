export interface Data {
  id: number
  status: string
  progress: number
  created_at: string
  updated_at: any
  responsable: number
  quote_request: QuoteRequest
  team_members: TeamMember[]
}

export interface QuoteRequest {
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
  client: Client
  equipment_quote_request: EquipmentQuoteRequest[]
  approved_by: ApprovedBy
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
  comment: any
  price: number
  total: number
  method_id: number
  review_status: string
  isResolved: boolean
  use_alternative_certificate_method: string
}

export interface ApprovedBy {
  id: number
  username: string
  password: string
  email: string
  created_at: string
  imageURL: any
  notification_token: any
}

export interface TeamMember {
  id: number
  username: string
  email: string
  imageURL: any
}
